export interface ICardSpecialSpecs {
  name: string;
  attack: number;
  health: number;
  turn: number;
}
export interface ICard {
  id: number;
  creatorid: number;
  ownerid: number;
  seasonid: number;
  fileloc: string;
  cardHash: string;
  name: string;
  health: number;
  attack: number;
  cardpower: number;
  rarity: number;
  specials: Array<ICardSpecialSpecs>;
}
// const demo = {
//   id: 722,
//   name: "",
//   attack: 11,
//   health: 32,
//   rarity: 1.0,
//   power: 100,
//   specials: [
//     {
//       name: "Energy drink",
//       attack: 20,
//       health: 36,
//       turn: 1,
//     },
//     {
//       name: "nouvelle petite amie",
//       attack: null,
//       health: 31,
//       turn: 1,
//     },
//     {
//       name: "220V -> 380V",
//       attack: 45,
//       health: null,
//       turn: 2,
//     },
//   ],
// };
