import { createSlice } from '@reduxjs/toolkit'
interface IPopupState{
    show:boolean,
    message:string|undefined
}
const initialState:IPopupState = {
    show:false,
    message:undefined
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
  }
});

export const {showPopup,hidePopup} = popup.actions

export default popup.reducer