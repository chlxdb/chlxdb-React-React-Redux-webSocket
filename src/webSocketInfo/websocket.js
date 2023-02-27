// import { createStore } from 'redux'
// import reducer from '../redux/reducers'
// const store = createStore(reducer)  //使用createStore创建个store

// let websocket, lockReconnect = false;

// let createWebSocket = (url) => {
    
//     websocket = new WebSocket(url);
//     websocket.onopen = function () {
//       heartCheck.reset().start();
//       console.log('连接创建中');
//     }
//     websocket.onmessage = function (event) {
//       lockReconnect=true; 
//       const res=JSON.parse(event.data)
//       store.dispatch(res)
  
//      //event 为服务端传输的消息，在这里可以处理
//   }
  
//     websocket.onerror = function () {
//       console.log('连接失败');
//         reconnect(url);
//     };
//     websocket.onclose = function (e) {
//         console.log('websocket 断开: ' + e.code + ' ' + e.reason + ' ' + e.wasClean)
//     }
// }
// let reconnect = (url) => {
//     if (lockReconnect) return;
//     //没连接上会一直重连，设置延迟避免请求过多
//     setTimeout(function () {
//         createWebSocket(url);
//         lockReconnect = false;
//     }, 4000);
// }
// let heartCheck = {
//     timeout: 10000, //10秒
//     timeoutObj: null,
//     reset: function () {
//         clearInterval(this.timeoutObj);
//         return this;
//     },
//     start: function () {
//         this.timeoutObj = setInterval(function () {
//             //这里发送一个心跳，后端收到后，返回一个心跳消息，
//             //onmessage拿到返回的心跳就说明连接正常
//             websocket.send({senderId:"1598252657034199041", type:4});
//         }, this.timeout)
//     }
// }
// //关闭连接
// let closeWebSocket=()=> {
//     websocket && websocket.close();
// }
// export {
//     websocket,
//     createWebSocket,
//     closeWebSocket,
// };

