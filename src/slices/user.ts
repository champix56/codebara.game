import { createSlice } from '@reduxjs/toolkit'
import { iUserState } from '../interfaces/user';
import { authUser, registerUser } from '../thunks/user';
import { ITokensState } from '../interfaces/tokens';

const initialState:iUserState = {
    amount:null,
    id:null,
    hash:null,
    mail:null,
    nickname:null
}

const user = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers:(builder)=>{
    builder.addMatcher(
        (action) => action.type==authUser.fulfilled||action.type==registerUser.fulfilled,
        (s:iUserState,a:{type:string,payload:iUserState&ITokensState})=>{
           for (const key of Object.keys(s)) {
                //@ts-ignore
                s[key]=a.payload[key]
           } 
    })
  }
});

export const {} = user.actions

export default user.reducer