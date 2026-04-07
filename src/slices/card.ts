import { createSlice } from '@reduxjs/toolkit'
import { ICard } from '../interfaces/card';
import { initCardLoads } from '../thunks/cards';
interface ICardState{
    cards:Array<ICard>
    baseLoc:string
}
const initialState: ICardState ={
    cards:[],
    baseLoc:'/'
}

const card = createSlice({
  name: 'card',
  initialState,
  reducers: {},
  extraReducers:(builder) =>{
       builder.addCase(initCardLoads.fulfilled,(s,a)=>{
        // s.cards=a.payload.cards
        console.log('%c%s','color:red','load cards')
        s.cards.splice(0)
        s.cards.push(...a.payload.cards)
  })
}})

export const {} = card.actions

export default card.reducer