
const defaultState={
id:1
}

export default function reducer(state=defaultState,action){
  // state=action.infoType
  // console.log('reducer',action.type);
  // console.log('reducer',action.type===8);
  
  switch(action.type){
    case 8:
      return{
       ...state , msg8:action.infoType
        // .notOnline
      };
    case 11:
      return{
        ...state, msg11:action.infoType
      };
    case "SET_userInfo":
      return{
        ...state, user:action.values.data.id
      };
    // case 11:
    //   return{
    //     msg11:action.data
    //   }
    default:
      return state;
  
  }
    }



// //定义默认的数据状态
// const defaultState={
// id:'xxx'
// }


// export default(state=defaultState,action)=>{
//  //reducer只能接收和返回新的值但是不能修改
//   switch(action.type){
//     case "xxx":
      
//       break;
//     default:
//       break;
//   }
    
//   return state;
// }


// //导出一个函数，返回状态数据
// // export default(state=defaultState)=>{
// //   return state;
// // }
