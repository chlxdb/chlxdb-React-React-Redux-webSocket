import axios from 'axios'


export const login = data => axios.post('/user/login', data);
export const regiest = data => axios.post('/user/register', data);
//添加好友
export const addFirend = (params) => axios.get('/categroy/findCategroy', { params: params });
// 获取好友聊天
export const getChat = (data) => axios.post('/chat/getPrivateChatHistory', data)
//发送消息
export const sendChat = (data) => axios.post('/chat/sendPrivateMessage', data)
//获取好友列表
export const friendList =  (params) => axios.get('/friend/getList', { params: params});
//检查是否有房间信息
export const friendReq =  (params) => axios.get('/friend/getRequestList', { params: params});
//创建房间
export const createRooms = (user) => axios.post('/gobang/create/'+user)
//退出房间
export const outRooms = (user) => axios.post('/gobang/leave/'+user)
//邀请好友组局
// eslint-disable-next-line
export const invitFriend =( friendId, userId )=> axios.post('/gobang/invite?'+'friendId='+friendId+'&userId='+userId);
//邀请好友组局
// export const invitFriend =(friendId, userId)=>{
//   axios({
// url: 'http://8.134.134.68:8080/gobang/invite?'+'friendId'+'=1599245134922842114&'+'userId'+'=1598252657034199041', 
//   method: 'POST',
// } ).then(res=>{
// console.log(res);
// return res
// })
// }

//接收好友请求
// eslint-disable-next-line
export const acceptFriend =( handleType, inviteUserId,userId )=> axios.post('/gobang/handleInvitation?handleType='+handleType+'&inviteUserId='+inviteUserId+'&userId='+userId);
//准备就绪
export const start =( id, userId )=> axios.post('/gobang/toBeReady?id=f3bc537645ed4b4d85d5b20971dca982&userId=1598252657034199041')
