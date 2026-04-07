import { createAsyncThunk } from "@reduxjs/toolkit";
import { IRequestTokenState, ITokensState } from "../interfaces/tokens";
import { API_ENDPOINTS_CARD, API_URL } from "../constantes/api";
import { exists, extract, initFS, saveTar } from "../tools/fs";
import { loadJsonFromFile } from "../tools/fs";
import { getDir } from "../tools/fs";
interface IRecievedCard {
  id: number;
  cardHash: string;
  cardpower: number;
  health: number;
  attack: number;
  card:string;
  fileloc:string
}
interface IRecievedCardsList {
  cards: Array<IRecievedCard>;
}

export const initCardLoads = createAsyncThunk(
  "card/loading/initial",
  async (primaryTokens: ITokensState) => {
    const primary = await fetch(
      `${API_URL}${API_ENDPOINTS_CARD.listCardCurrentUser.path}`,
      {
        method: API_ENDPOINTS_CARD.listCardCurrentUser.method,
        headers: {
          datas: JSON.stringify(primaryTokens),
        },
      },
    );

    const cardList: IRecievedCardsList & IRequestTokenState =
      await primary.json();
    let tokens: ITokensState = {
      API_TOKEN: primaryTokens.API_TOKEN,
      API_REQUEST_TOKEN: cardList.API_REQUEST_TOKEN,
    };
    //await initFS();
    const cardsToSlice = [];
    for (const element of cardList.cards) {
      const cardExists = await exists(element.id);
      
        const cardPromise = await fetch(
          `${API_URL}${API_ENDPOINTS_CARD.getCard.path.replace("${id}", element.id.toString())}`,
          {
            method: API_ENDPOINTS_CARD.getCard.method,
            headers: {
              datas: JSON.stringify(tokens),
            },
          },
        );
        const cardData = await cardPromise.json();
        tokens = {
          API_TOKEN: primaryTokens.API_TOKEN,
          API_REQUEST_TOKEN: cardData.API_REQUEST_TOKEN,
        };
        if (!cardExists) {cardData.fileloc=await extract(cardData.id,cardData.card)}
        else cardData.fileloc=getDir(element.id)

        const cardtmp={...cardData}
        delete cardtmp.API_REQUEST_TOKEN
        delete cardtmp.API_REQUEST_TOKEN
        delete cardtmp.card
        const datas = await loadJsonFromFile(cardData.fileloc+'datas.json')
        cardtmp.name=datas.name;
        cardsToSlice.push(cardtmp)
      
    }

    return {cards:cardsToSlice,...tokens};
  },
);
