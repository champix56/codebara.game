import { createSlice } from '@reduxjs/toolkit'
import { IRequestTokenState, ITokensState } from '../interfaces/tokens';
import { authUser, registerUser } from '../thunks/user';
import { iUserState } from '../interfaces/user';

const initialState:ITokensState = {
    API_REQUEST_TOKEN:null,
    API_TOKEN:null
}

const tokens = createSlice({
  name: 'tokens',
  initialState,
  reducers: {
    setTokens(s,a:{type:string,payload:ITokensState|IRequestTokenState}){
        Object.assign(s,a.payload)
    }
  },
  extraReducers(builder) {
       builder.addMatcher(
              //(action) => action.type==authUser.fulfilled||action.type==registerUser.fulfilled,
              (action:{type:string}) => action.type.endsWith('fulfilled'),
              (s,a:{type:string,payload:iUserState&ITokensState})=>{
                if(a.payload.API_TOKEN!==undefined)
                s.API_TOKEN=a.payload.API_TOKEN
              if(a.payload.API_REQUEST_TOKEN!==undefined)
                s.API_REQUEST_TOKEN=a.payload.API_REQUEST_TOKEN
                
                //  for (const key of Object.keys(s)) {
                //       //@ts-ignore
                //       s[key]=a.payload[key]
                //  } 
          })
  },
});

export const {setTokens} = tokens.actions

export default tokens.reducer