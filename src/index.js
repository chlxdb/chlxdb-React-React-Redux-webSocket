import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import '../src/axios/config'
import { Provider } from 'react-redux'
import {legacy_createStore as createStore } from "redux";
import { compose, applyMiddleware } from 'redux'

import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import {PersistGate} from 'redux-persist/lib/integration/react';
import reducer from '../src/redux/reducers'
import './index.css'
import App from './App'
const persistConfig = {
  key: 'root',
  storage: storage,
  whitelist: ['user','list'],//设置白名单
  // blacklist: ['list'],
  stateReconciler: autoMergeLevel2 // 查看 'Merge Process' 部分的具体情况
}

const firendListMiddleware = (store) => (next) => (action) => {
  if (action.type === 8) {
    // console.log('88888',action.extend);
    // const list_14 = new Map()
    const objNOTonline = store.getState().list.msg11.extend.notOnline
    const objOnline = store.getState().list.msg11.extend.online
    // 将js对象类型转化为map类型
    const list_8_Not = new Map(Object.entries(objNOTonline))
    const list_8_on = new Map(Object.entries(objOnline))
    const type8_Info = new Map(Object.entries(action.extend))
    type8_Info.forEach((val, key) => {
      // console.log(`${key} -> ${val}`)
      if (list_8_Not.has(key)) {
   list_8_Not.get(key).unreadCount = val
        // console.log('list_8_Not.get(key)zuihou', list_8_Not.get(key))
      }
      else if (list_8_on.has(key)) {
        list_8_on.get(key).unreadCount = val
        // console.log('list_8_on.get(key)zuihou', list_8_on.get(key))
      }
    })
    const res_type8 = {
      type: 11,
      extend: {
        online: Object.fromEntries(list_8_on.entries()),
        notOnline: Object.fromEntries(list_8_Not.entries()),
      },
    }
        store.dispatch(res_type8)
 }
  if (action.type === 14) {
    const objNOTonline = store.getState().list.msg11.extend.notOnline
    const objOnline = store.getState().list.msg11.extend.online
    const list_14_Not = new Map(Object.entries(objNOTonline))
    const list_14_on = new Map(Object.entries(objOnline))
    list_14_Not.delete(action.extend.onLinedFriendInfo.id)
    list_14_on.set(
      action.extend.onLinedFriendInfo.id,
      action.extend.onLinedFriendInfo
    )
    // console.log('list_14后', list_14.get('online'))
    const res_type14 = {
      type: 11,
      extend: {
        online: Object.fromEntries(list_14_on.entries()),
        notOnline: Object.fromEntries(list_14_Not.entries()),
      },
    }
    store.dispatch(res_type14)
  }
  if (action.type === 15) {
// const list_15 = new Map()
const objNOTonline = store.getState().list.msg11.extend.notOnline
const objOnline = store.getState().list.msg11.extend.online
// 将js对象类型转化为map类型
const list_15_Not = new Map(Object.entries(objNOTonline))
const list_15_on = new Map(Object.entries(objOnline))
  list_15_on.delete(action.extend.offLinedFriendInfo.id)
  list_15_Not.set(
    action.extend.offLinedFriendInfo.id,
    action.extend.offLinedFriendInfo
  )
    // console.log('list_15_on', list_15_on)
    //  console.log('list_15_Not', list_15_Not)
    const res_type15 = {
      type: 11,
      extend: {
        online: Object.fromEntries(list_15_on.entries()),
        notOnline:  Object.fromEntries(list_15_Not.entries())
      },
    }
    store.dispatch(res_type15)
  } else {
    next(action) 
  }
}
const myPersistReducer = persistReducer(persistConfig, reducer)
// const store = createStore(myPersistReducer)
const firendListCreateStore = compose(applyMiddleware(firendListMiddleware))(createStore)
const store = firendListCreateStore(myPersistReducer) //使用createStore创建个store
const persistor = persistStore(store)
let websocket,lockReconnect = false
let createWebSocket = (url) => {
  websocket = new WebSocket(url)
  websocket.onopen = function () {
    heartCheck.reset().start()
    console.log('连接创建中')
  }
  websocket.onmessage = function (event) {
    lockReconnect = true
    heartCheck.reset().start()
    const res = JSON.parse(event.data)
    store.dispatch(res)
    console.log('event:', res)
  }
  websocket.onerror = function () {
    console.log('连接失败')
    reconnect(url)
  }
  websocket.onclose = function (e) {
    console.log('websocket 断开: ' + e.code + ' ' + e.reason + ' ' + e.wasClean)
  }
}
let reconnect = (url) => {
  if (lockReconnect) return
  //没连接上会一直重连，设置延迟避免请求过多
  setTimeout(function () {
    createWebSocket(url)
    lockReconnect = false                                    
  }, 4000)
}
let heartCheck = {
  timeout: 1000, //10秒
  timeoutObj: null,
  reset: function () {
    clearInterval(this.timeoutObj)
    return this
  },
  start: function () {
    this.timeoutObj = setInterval(function () {
      //这里发送一个心跳，后端收到后，返回一个心跳消息，
      //onmessage拿到返回的心跳就说明连接正常
      websocket.send({ senderId: '1598252657034199041', type: 4 })
    }, this.timeout)
  },
}
//关闭连接
let closeWebSocket = () => {
  websocket && websocket.close()
}
// 监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
window.onbeforeunload = function () {
  closeWebSocket()
}
let url = `ws://8.134.134.68:8888/ws?userId=1598252657034199041` //服务端连接的url
createWebSocket(url)

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <BrowserRouter>
    <Provider store={store}>
   < PersistGate loading={null} persistor={persistor}>
      <App />
     </PersistGate>
    </Provider>
  </BrowserRouter>
)