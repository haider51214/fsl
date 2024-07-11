const apis = ()=>{
const baseUrl = 'https://fullspectrumleadership-7df59d68801a.herokuapp.com/'
const local = 'http://localhost:8080/'
const list = {
userId:'6690684e97d85de365f81493',
getPersonalities:`${baseUrl}personalities/list`,
getTenetsList:`${baseUrl}tenet/list`,
addUserPersonality:`${baseUrl}user/personality/add`,
userPersonalityList:`${baseUrl}user/personality/list`,
userTotalPersonalities:`${baseUrl}user/total/personalities`,
deleteUserPersonality:`${baseUrl}user/personality/delete`,
getUserTenetsList:`${baseUrl}user/tenet/list`,
addUserTenet:`${baseUrl}user/add/tenet`,
getUserTotalTenets:`${baseUrl}user/total/tenets`,
deleteUserTenet:`${baseUrl}user/delete/tenet`



}
return list

}

export default apis