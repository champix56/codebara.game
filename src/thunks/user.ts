import { createAsyncThunk } from "@reduxjs/toolkit";
import { ITokensState } from "../interfaces/tokens";
import { IUserAuthDatas, IUserRegisterBody, iUserState } from "../interfaces/user";
import { API_ENDPOINTS_USER, API_URL } from "../constantes/api";

export const authUser=createAsyncThunk('user/auth', async(datas:ITokensState|IUserAuthDatas):Promise<(ITokensState&iUserState)>=>{
    const url=`${API_URL}${API_ENDPOINTS_USER.auth.path}`
    const method=API_ENDPOINTS_USER.auth.method
    const p=await fetch(url,{
        method:method,
        headers:{
            datas:JSON.stringify(datas)
        }
    })
    const ret=await p.json()
    return ret;
})
export const registerUser=createAsyncThunk('user/create', async(mail:string):Promise<ITokensState&iUserState>=>{
        const url=`${API_URL}${API_ENDPOINTS_USER.auth.path}`
    const p=await fetch(url,{
        method:API_ENDPOINTS_USER.register.method,
        body:JSON.stringify({mail:mail})
    })
      const ret=await p.json()
    return ret;
})
