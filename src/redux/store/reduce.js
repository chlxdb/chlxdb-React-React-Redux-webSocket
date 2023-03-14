
const defaultState={
id:1
}
export default function reducer(state=defaultState,action){  
  switch(action.type){
    case "SET_userInfo":
      return{
        ...state, user:action.values.data.id
      };
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
