import { ICardSpecialSpecs } from "./../interfaces/card";
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
  card: string;
  fileloc: string;
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
      if (!cardExists) {
        cardData.fileloc = await extract(cardData.id, cardData.card);
      } else cardData.fileloc = getDir(element.id);

      const cardtmp = { ...cardData };
      delete cardtmp.API_REQUEST_TOKEN;
      delete cardtmp.API_TOKEN;
      delete cardtmp.card;
      const datas = await loadJsonFromFile(cardData.fileloc + "datas.json");
      cardtmp.name = datas.name;
      cardtmp.specials = datas.specials;
      cardsToSlice.push(cardtmp);
    }

    return { cards: cardsToSlice, ...tokens };
  },
);
export const requestCardBycb = createAsyncThunk(
  "card/request",
  async ({
    primaryTokens,
    cb,
  }: {
    primaryTokens: ITokensState;
    cb: string;
  }) => {
    const prc = await fetch(
      `${API_URL}${API_ENDPOINTS_CARD.generateCard.path}`,
      {
        method: API_ENDPOINTS_CARD.generateCard.method,
        headers: {
          datas: JSON.stringify(primaryTokens),
        },
        body: JSON.stringify({cb:cb}),
      },
    );
    const card = await prc.json();
    card.id=card.cardid
    delete card.cardid
    card.fileloc = await extract(card.id, card.card);

    const cardtmp = { ...card };
    const tokens={API_REQUEST_TOKEN:cardtmp.API_REQUEST_TOKEN}
    delete cardtmp.API_REQUEST_TOKEN;
    delete cardtmp.API_TOKEN;
    delete cardtmp.card;
    const datas = await loadJsonFromFile(card.fileloc + "datas.json");
    Object.assign(cardtmp,datas)
    cardtmp.name = datas.name;
    cardtmp.specials = datas.specials;

    return {card:cardtmp,...tokens};
  },
);
