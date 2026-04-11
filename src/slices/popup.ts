import { createSlice } from '@reduxjs/toolkit'
import { initCardLoads, requestCardBycb } from '../thunks/cards';
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
        s.show=true;
        s.buttonOk=false
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

     builder.addCase(requestCardBycb.pending,(s,a)=>{
        s.message='creation de la carte en cours, veuillez patientez ou revenir plus tard elle sera ajouter a votre liste des quelle sera prete'
        s.show=true
        s.buttonOk=true
    })
    builder.addCase(requestCardBycb.fulfilled,(s,a)=>{
        s.message=''
        s.buttonOk=false
        s.show=false
    })
    builder.addCase(requestCardBycb.rejected,(s,a)=>{
        s.message='Chargement des cartes IMPOSSIBLE'
        s.show=true
    })
  }
});

export const {showPopup,hidePopup} = popup.actions

export default popup.reducer