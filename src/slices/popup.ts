import { createSlice } from '@reduxjs/toolkit'
import { initCardLoads } from '../thunks/cards';
interface IPopupState{
    show:boolean,
    message:string|undefined,
    buttonOk:boolean
}
const initialState:IPopupState = {
    show:false,
    message:undefined,
    buttonOk:false
}

const popup = createSlice({
  name: 'popup',
  initialState,
  reducers: {
    showPopup:(s:IPopupState,a:{type:string,payload:{message:string}})=>{
        s.message=a.payload.message
        s.show=true
    },
    hidePopup:(s:IPopupState,a:{type:string})=>{
        s.message=undefined
        s.show=false
    }
  },
  extraReducers:(builder)=>{
    builder.addCase(initCardLoads.pending,(s,a)=>{
        s.message='Chargement des cartes en cours'
        s.show=true
    })
    builder.addCase(initCardLoads.fulfilled,(s,a)=>{
        s.message='Chargement cartes OK'
        s.buttonOk=true
        // s.show=false
    })
    builder.addCase(initCardLoads.rejected,(s,a)=>{
        s.message='Chargement des cartes IMPOSSIBLE'
        s.show=true
    })
  }
});

export const {showPopup,hidePopup} = popup.actions

export default popup.reducer