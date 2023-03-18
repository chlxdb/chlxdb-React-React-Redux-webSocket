import React, { useEffect, useState,useRef} from 'react'
import { Row, Col, Input, Divider, Card ,Button,message} from 'antd'
import { connect } from 'react-redux'
import './Firends.css'
import axios from 'axios'
import { getChat, sendChat } from '../../axios/api';
const { TextArea } = Input

const Firends = (props) => {
    const myRef = useRef('sss')
    const [value, setValue] = useState('')
    const [recode, setRecode] = useState([])
    const [news,setNews]=useState()
    const [current, setCurrent] = useState(1);
    const [size, setSize] = useState(10);
    const otherId = props.match.params.id
    var user = props.user.user
    let arr=[]
    let arr2=[]
    useEffect(() => {
      console.log('firendprops',props);
      setNews(props.list.msg2)
      chatRecode()
      // eslint-disable-next-line
    }, [otherId,props.list.msg2])
   var chatRecode = async () => {
    // setAddSize(10)
    //暂定一页展现1000条
    setSize(10)
    const res = await getChat({
      'anotherId': otherId,
      'current': current,
      'size': size,
      'userId': user,
    })
    if(res.data.code===200){
      // console.log("chatres",res);
      let arr_1=res.data.data.history
      arr=[]
   if(arr_1.length!==0){
    for(let i=arr_1.length-1; i>=0 ; i--){
      arr.push(arr_1[i]) 
    }
    setRecode(arr)
    // console.log('myRef',myRef);
    // console.log('myRefcurrent',myRef.current);
    if(current===1){
      myRef.current.scrollTop = myRef.current.scrollHeight
    }
  }
   
  }
  }
  const sendMes =async (valeus) => {
    const res = await sendChat({
      "content": valeus,
      "receiverId": otherId,
      "senderId": user,
    }) 
    if(res.data.code===200){
      // chatRecode()
      setValue('')
      if(current === 1){
        // 发送时若为第一页，无法触发update，需手动获取数据
        chatRecode()
      }else{
        // 发送消息时，若当前页不是第一页，手动设置，以触发滚动条置底设置
          setCurrent(1)
      }  
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
const loading= async () => {
  setSize((size) => {return size + 10})
  const res = await getChat({
    'anotherId': otherId,
    'current': current,
    'size': size,
    'userId': user,
  })
  console.log('res',res);
  if(res.data.code===200){
      let arr_2=res.data.data.history
      if(arr_2.length!==0){
        for(let i=arr_2.length-1; i>=0 ; i--){
          arr2.push(arr_2[i])
        }    
    setRecode(arr2)       
    myRef.current.scrollTop=100
      }
    }
    }
  const Scroll=(e)=>{
  if(e.target.scrollTop===0){
    // console.log("scrollTop",e.target.scrollTop);
    loading() 
  } 
  // console.log("scrollHeight",e.target.scrollHeight);
  // console.log("scrollTop",e.target.scrollTop);
  // console.log("clientHeight",e.target.clientHeight);
}
   return (
     <>
         <Card title="Carde"  style={{ width: '80vw' }} >
           <div className="chatRecode" ref={myRef} onScroll={Scroll} >
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
               <Button onClick={()=>sendMes(value)}>发送消息</Button>
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