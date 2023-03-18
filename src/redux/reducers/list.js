const initialState = []
export default function reducer(state = initialState, action) {
  console.log('action',action);
 
    switch (action.type) {
      case 2:
        return { ...state, msg2: action } //私信消息
      case 6:
        return { ...state, msg6: action } //私信发送成功
      case 7:
        return { ...state, msg7: action } //私信发送失败
      case 8:
        return { ...state, msg8: action } //未读消息
      case 11:
        return { ...state, msg11: action } //好友列表
      case 12:
        return { ...state, msg12: action } //已读私聊
      case 13:
        return { ...state, msg13: action } //无权限
      case 17:
          return { ...state, msg17: action } //游戏邀请通知
      case 19:
      return { ...state, msg19: action } //房间通知
      case 20:
        return { ...state, msg20: action } //游戏开始通知
      case 21:
      return { ...state, msg21: action } //下棋通知
      case 22:
      return { ...state, msg22: action } //棋盘更新通知
      case 23:
      return { ...state, msg23: action } //棋盘结束通知
      case 'roomInfo':
        return {
          ...state,
          room: action.values,
        }
      default:
        return state
    }
}