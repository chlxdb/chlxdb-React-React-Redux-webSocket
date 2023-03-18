// import actions from './actions'

const initialState = []

export default function reducer(state = initialState, action) {
  console.log('usersaction:',action);
    switch(action.type) {
      case 'SET_userInfo':
        return {
          ...state,
          user: action.values.data.id,
          userData:action.values.data
        }
        default:
          return state
      }
}
