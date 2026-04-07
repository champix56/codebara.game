export interface IRequestTokenState{
    API_REQUEST_TOKEN:string|null
}

interface IAPITokenState{
    API_TOKEN:string|null
}
export type ITokensState=IAPITokenState&IRequestTokenState;
