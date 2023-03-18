import axios from 'axios'
export const login = data => axios.post('/user/login', data);
export const regiest = data => axios.post('/user/register', data);
//查找未添加好友
export const searchFirend = (params) => axios.get('/user/search', { params: params });
//添加好友http://8.134.134.68:8080/friend/addFriend
export const addFriend = data => axios.post('/friend/addFriend', data);
//获取好友添加请求列表
export const friendReq =  (params) => axios.get('/friend/getRequestList', { params: params});

//查找已添加好友
export const searchFirendOk = (params) => axios.get('/categroy/findCategroy', { params: params });
// 获取好友聊天
export const getChat = (data) => axios.post('/chat/getPrivateChatHistory', data)
//发送消息
export const sendChat = (data) => axios.post('/chat/sendPrivateMessage', data)
//获取好友列表
export const friendList =  (params) => axios.get('/friend/getList', { params: params});

//创建房间
export const createRooms = (user) => axios.post('/gobang/create/'+user)
//退出房间
export const outRooms = (user) => axios.post('/gobang/leave/'+user)
//邀请好友组局
// eslint-disable-next-line
export const invitFriend =( friendId, userId )=> axios.post('/gobang/invite?'+'friendId='+friendId+'&userId='+userId);
//接收好友游戏请求
// eslint-disable-next-line
export const acceptFriend =( handleType, inviteUserId,userId )=> axios.post('/gobang/handleInvitation?handleType='+handleType+'&inviteUserId='+inviteUserId+'&userId='+userId);
//游戏准备就绪
export const start =( id, userId )=> axios.post('/gobang/toBeReady?id=f3bc537645ed4b4d85d5b20971dca982&userId=1598252657034199041')
//结束游戏http://8.134.134.68:8080/gobang/toBeEnd?userId=1598252657034199041
// eslint-disable-next-line
export const checkRoom =(userid) =>  axios.get('/gobang/check/'+userid);





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