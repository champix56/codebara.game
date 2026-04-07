import * as FileSystem from 'expo-file-system/legacy'
import pako from 'pako'
import Tar from 'tar-js'
import { IFile } from '../interfaces/files';

export const ROOT = FileSystem.documentDirectory + 'cards/';

import { Buffer } from "buffer";

if (!global.Buffer) {
  global.Buffer = Buffer;
}

/**
 * Initialise le dossier racine
 */
export async function initFS(): Promise<void> {
  const info = await FileSystem.getInfoAsync(ROOT);
  if (!info.exists) {
    await FileSystem.makeDirectoryAsync(ROOT, { intermediates: true });
  }
}

export function getTarLoc(id: number): string {
  return `${ROOT}${id}.tar.gz`;
}

export function getDir(id: number): string {
  return `${ROOT}${id}/`;
}

export async function exists(id: number): Promise<boolean> {
  const info = await FileSystem.getInfoAsync(getDir(id));
  return info.exists;
}

/**
 * Sauvegarde l'archive tar.gz en base64
 */
export async function saveTar(
  id: number,
  base64: string
): Promise<string> {
  const path = getTarLoc(id);

  await FileSystem.writeAsStringAsync(path, base64, {
    encoding: FileSystem.EncodingType.Base64,
  });

  return path;
}

/**
 * Extraction complète en passant uniquement par des fichiers
 */
export async function extract(id: number, base64: string): Promise<string> {
  const dir = getDir(id);
  const gzPath = getTarLoc(id);
  const tarPath = `${ROOT}${id}.tar`;

  // 1. créer dossier cible
  await FileSystem.makeDirectoryAsync(dir, { intermediates: true });

  // 2. écrire le .tar.gz
  await FileSystem.writeAsStringAsync(gzPath, base64, {
    encoding: FileSystem.EncodingType.Base64,
  });

  try {
    // 3. lire le .gz depuis le disque
    const gzBase64 = await FileSystem.readAsStringAsync(gzPath, {
      encoding: FileSystem.EncodingType.Base64,
    });

    const gzBuffer = Uint8Array.from(atob(gzBase64), c => c.charCodeAt(0));

    // 4. gunzip
    const decompressed = pako.ungzip(gzBuffer);

    // 5. écrire le .tar temporaire
    await FileSystem.writeAsStringAsync(
      tarPath,
      Buffer.from(decompressed).toString('base64'),
      { encoding: FileSystem.EncodingType.Base64 }
    );

    // 6. lire le .tar
    const tarBase64 = await FileSystem.readAsStringAsync(tarPath, {
      encoding: FileSystem.EncodingType.Base64,
    });

    const tarBuffer = Uint8Array.from(atob(tarBase64), c => c.charCodeAt(0));

    // 7. extraction TAR
    const tar = new Tar();
    tar.extract(tarBuffer);

    await Promise.all(
      tar.files.map(async (file: any) => {
        const filePath = dir + file.name;

        await FileSystem.writeAsStringAsync(
          filePath,
          Buffer.from(file.buffer).toString('base64'),
          { encoding: FileSystem.EncodingType.Base64 }
        );
      })
    );

  } finally {
    // 8. nettoyage des fichiers temporaires
    await FileSystem.deleteAsync(gzPath, { idempotent: true });
    await FileSystem.deleteAsync(tarPath, { idempotent: true });
  }

  return dir;
}

/**
 * Supprime un dossier carte
 */
export async function deleteCard(id: number): Promise<void> {
  await FileSystem.deleteAsync(getDir(id), { idempotent: true });
}

/**
 * Supprime une archive
 */
export async function deleteArchiveCard(id: number): Promise<void> {
  await FileSystem.deleteAsync(getTarLoc(id), { idempotent: true });
}

/**
 * Liste récursive des fichiers
 */
export async function getFolderListFiles(path = ROOT) {
  const info = await FileSystem.getInfoAsync(path);

  if (!info.exists || !info.isDirectory) {
    return {
      loc: path,
      children: [],
    };
  }

  const entries = await FileSystem.readDirectoryAsync(path);

  const children: IFile[] = await Promise.all(
    entries.map(async (name) => {
      const childPath = path.endsWith('/')
        ? path + name
        : path + '/' + name;

      return getFolderListFiles(childPath);
    })
  );

  return {
    loc: path,
    children,
  };
}

/**
 * Supprime tout le contenu du ROOT (sans supprimer ROOT lui-même)
 */
export async function clearRoot(): Promise<void> {
  const root = FileSystem.documentDirectory;

  if (!root) {
    throw new Error("ROOT directory not available");
  }

  try {
    const items = await FileSystem.readDirectoryAsync(root);

    await Promise.all(
      items.map((item) => {
        const path = root + item;
        return FileSystem.deleteAsync(path, { idempotent: true });
      })
    );
  } catch (error) {
    console.error("Error clearing ROOT:", error);
    throw error;
  }
}