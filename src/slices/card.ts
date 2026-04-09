import { createSlice } from '@reduxjs/toolkit'
import { ICard } from '../interfaces/card';
import { initCardLoads, requestCardBycb } from '../thunks/cards';
interface ICardState{
    cards:Array<ICard>
    baseLoc:string
    current:ICard|undefined
}
const initialState: ICardState ={
    current:undefined,
    cards:[],
    baseLoc:'/'
}

const card = createSlice({
  name: 'card',
  initialState,
  reducers: {
    setCurrentCard:(s,a)=>{
        s.current=a.payload
    }
  },
  extraReducers:(builder) =>{
    builder.addCase(requestCardBycb.pending,(s,a)=>{
        s.current=undefined
    })
       builder.addCase(initCardLoads.fulfilled,(s,a)=>{
        // s.cards=a.payload.cards
        console.log('%c%s','color:red','load cards')
        s.cards.splice(0)
        s.cards.push(...a.payload.cards)
  }),
   builder.addCase(requestCardBycb.fulfilled,(s,a)=>{
    debugger;
        // s.cards=a.payload.cards 
        s.cards.push(a.payload.card)
        s.current=a.payload.card
        console.log(a.payload)
  })
}})

export const {setCurrentCard} = card.actions

export default card.reducer