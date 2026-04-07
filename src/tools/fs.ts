import * as FileSystem from 'expo-file-system/legacy'
import JSZip from 'jszip'
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

export function getZipLoc(id: number): string {
  return `${ROOT}${id}.zip`;
}

export function getDir(id: number): string {
  return `${ROOT}${id}/`;
}

export async function exists(id: number): Promise<boolean> {
  const info = await FileSystem.getInfoAsync(getDir(id));
  return info.exists;
}

/**
 * Sauvegarde l'archive zip en base64
 */
export async function saveZip(
  id: number,
  base64: string
): Promise<string> {
  const path = getZipLoc(id);

  await FileSystem.writeAsStringAsync(path, base64, {
    encoding: FileSystem.EncodingType.Base64,
  });

  return path;
}

/**
 * Extraction ZIP
 */
export async function extract(id: number, base64: string): Promise<string> {
  const dir = getDir(id);
  const zipPath = getZipLoc(id);

  // 1. créer dossier cible
  await FileSystem.makeDirectoryAsync(dir, { intermediates: true });

  // 2. écrire le .zip
  await FileSystem.writeAsStringAsync(zipPath, base64, {
    encoding: FileSystem.EncodingType.Base64,
  });

  try {
    // 3. lire le zip depuis le disque
    const zipBase64 = await FileSystem.readAsStringAsync(zipPath, {
      encoding: FileSystem.EncodingType.Base64,
    });

    const zipBuffer = Uint8Array.from(atob(zipBase64), c => c.charCodeAt(0));

    // 4. charger le zip
    const zip = await JSZip.loadAsync(zipBuffer);

    // 5. extraction des fichiers
    const entries = Object.values(zip.files);

    await Promise.all(
      entries.map(async (entry) => {
        if (entry.dir) return;

        const filePath = dir + entry.name;

        // créer les dossiers intermédiaires
        const folderPath = filePath.substring(0, filePath.lastIndexOf('/'));
        if (folderPath) {
          await FileSystem.makeDirectoryAsync(folderPath, { intermediates: true });
        }

        const content = await entry.async('base64');

        await FileSystem.writeAsStringAsync(
          filePath,
          content,
          { encoding: FileSystem.EncodingType.Base64 }
        );
      })
    );

  } finally {
    // 6. nettoyage des fichiers temporaires
    await FileSystem.deleteAsync(zipPath, { idempotent: true });
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
  await FileSystem.deleteAsync(getZipLoc(id), { idempotent: true });
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
export async function loadJsonFromFile<T>(uri: string): Promise<T> {
  try {
    const content = await FileSystem.readAsStringAsync(uri);
    return JSON.parse(content) as T;
  } catch (error) {
    console.error('Erreur lecture fichier JSON:', error);
    throw error;
  }
}