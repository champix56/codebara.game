interface IEndpoint{
    path:string, method:'GET'|'POST'|'PUT'|'DELETE'
}

export const API_URL = "http://champix.freeboxos.fr:58080";
//export const API_URL='http://0.0.0.0:8080'
//export const API_URL='https://curial-vihaan-anyway.ngrok-free.dev'
interface IUserEndpoints{
    auth:IEndpoint
    register:IEndpoint
}
export const API_ENDPOINTS_USER: IUserEndpoints = {
  auth: { path: "/user/auth", method: "GET" },
  register: { path: "/user", method: "PUT" },
};
interface ICardEndpoints{
    listCardCurrentUser:IEndpoint
    changeCardName:IEndpoint
    checkCardIntegrity:IEndpoint
    generateCard:IEndpoint
    getCard:IEndpoint
}
export const API_ENDPOINTS_CARD:ICardEndpoints = {
  listCardCurrentUser: { path: "/card", method: "GET" },
  changeCardName: { path: "/card/name", method: "PUT" },
  checkCardIntegrity: { path: "/card/check", method: "GET" },
  generateCard: { path: "/card", method: "POST" },
  getCard:{path:'/card/${id}', method:'GET'}
};
