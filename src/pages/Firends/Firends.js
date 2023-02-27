import React, { useEffect, useState,useRef,useCallback } from 'react'
import { Row, Col, Input, Divider, Card ,Button,Pagination,message} from 'antd'
import { connect } from 'react-redux'
import './Firends.css'
import axios from 'axios'
import { getChat, sendChat } from '../../axios/api';
// import store from '../../redux/store';
//  recodeRef.recode = res.data.data
const { TextArea } = Input

const Firends = (props) => {
  // const clear_count = {
  //   type: clearUnread,
  //   extend: {
  //   },
  // }
 const myRef = useRef('sss')
  const[flag,setflag]=useState(true) 
  const [value, setValue] = useState('')
  const [recode, setRecode] = useState([])
  const [news,setNews]=useState()
  const [current, setCurrent] = useState(1);
  const [size, setSize] = useState(1000);
  const [addSize,setAddSize]=useState(10)
  const [height,setheight]=useState()
  // const [ID, setID] = useState();
  const otherId = props.match.params.id
   var user = localStorage.getItem('userid')
   let arr=[],arr2=[]
   useEffect(() => {
    setNews(props.list.msg2)
     chatRecode()
    //  setID(otherId)
    //  setSize(10)
   }, [otherId,props.list.msg2])


   var chatRecode = async () => {
    setAddSize(10)
    //暂定一页展现1000条
    const res = await getChat({
      'anotherId': otherId,
      'current': current,
      'size': size,
      'userId': user,
    })
    if(res.data.code===200){
      let arr_1=res.data.data.history
   while(arr_1.length!==0){
    arr.push(arr_1.pop()) 
    setRecode(arr)
    }
    arr=[]
    }
  }
 const send = () => {
  const file = document.querySelector('#input').files[0]
  const messageVo ={
    'receiverId':otherId,
    'senderId':user
  }
  const formData = new FormData()
  formData.append("file", file)
  formData.append("messageVo", JSON.stringify(messageVo))
      //     formData.forEach((value, key) => {
      //       console.log(`key ${key}: value ${value}`);
      //       console.log('user',user);
      //  })
  axios({
      url: 'http://8.134.134.68:8080/chat/transferFile',
      method: 'POST',
      headers: {
        ContentType: 'multipart/form-data',
      },
      data: formData,
   } ).then(
      request => {
        console.log(request);
          // if (request.data.length === 0) {
          //     message.error("上传失败，不能为空")
          // }
          // else {
              message.success("成功上传")
          // }

      },
      error => {
          console.log(error.data)
      }
  )
 }
const Whell=(ev)=>{
console.log(ev);
}
const Scroll=(e)=>{
  console.log(e);
  }
//  const Scroll = () => {
//    //1+2=3
//   let height1 = myRef.current.clientHeight  // 可以得到我们设置的高度 (不包括滚动的高度)
//   let height2 = myRef.current.scrollTop  //当滚动时距离顶部的高度//网页被卷去的高
//   // let height3 = myRef.current.scrollHeight  // 全部的高度 包括滚动的高度
//    if( height2 ===0 ){
//       // 加了flag 是为了防止反复触发
//          setAddSize(addSize + 5)
//    const loading= async () => {
//         const res = await getChat({
//           'anotherId': otherId,
//           'current': current,
//           'size': addSize,
//           'userId': user,
//         })
//         if(res.data.code===200){
//             let arr_1=res.data.data.history
//           while(arr_1.length!==0){
//             arr2.push(arr_1.pop()) 
        
//             setRecode(arr2)
//             myRef.current.scrollTop=330
//           }
//           arr2=[]
//         }
//       }
//  loading()
// // setflag(false)  
// }
//   // if(height1 + height2 + 20 > height3 )  // 当距离底部20 则会触发

// }
    

   return (
     <>
         <Card title="Carde"  style={{ width: '80vw' }} >
           <div className="chatRecode" ref={myRef}  onWheel={Whell} onScroll={Scroll} >
           {/* <div className="chatRecode" ref={myRef} onScroll={Scroll} > */}
             <Row>
               {recode?.map((item) => (
                 <Col
                   xs={2}
                   sm={4}
                   md={6}
                   lg={8}
                   xl={15}
                   offset={2}
                   key={item.id}
                 >
                   <div className={item.senderId === user ? 'right' : 'left'}>
                     <p>{item.content}</p>
                   </div>
                 </Col>
               ))}
               {() => {
                 if (news) {
                   return (
                     <Col xs={2} sm={4} md={6} lg={8} xl={15} offset={2}>
                       <div
                         className={news.senderId === user ? 'right' : 'left'}
                       >
                         <p>{news.content}</p>
                       </div>
                     </Col>
                   )
                 }
               }}
             </Row>
           </div>

           <Divider />
           <Row style={{ position: 'relative' }}>
             <Col xs={2} sm={4} md={6} lg={8} xl={10} offset={6}>
               <TextArea
               type
                 value={value}
                 onChange={(e) => setValue(e.target.value)}
                 autoSize={{ minRows: 5, maxRows: 5 }}
                 maxLength={200}
               />
             </Col>
             <Col xs={2} sm={4} md={6} lg={8} xl={1} offset={1}>
               <input type="file" id="input" ></input>
               <Button onClick={send}>发送/上传资源文件</Button>
             </Col>
           </Row>
         </Card>
    
     </>
   )
 }
const mapStateToProps = (state) => {
  return {
    ...state,
  }
}
export default connect(mapStateToProps, null)(Firends)