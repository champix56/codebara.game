export interface iUserState{
    id:number|null
    nickname:string|null
    mail:string|null
    amount:number|null
    hash:string|null
}
export interface IUserAuthDatas{
    mail:string
    password:string
}
export interface IUserRegisterBody{
    mail:string
}