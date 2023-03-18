
import React,{ useEffect,useState} from 'react'
import {connect }from "react-redux";
import { Input,Col, Row,Avatar, List,Card,Button} from 'antd';
import './Add.css'
import { friendReq ,searchFirend,addFriend} from '../../axios/api';
const Add=(props)=> {
  const [view,setView]=useState("none")
   const [searchres, setSearchRes] = useState('')
   const [requestList,setRequestList]=useState('')
  useEffect(() => {
    // console.log('props',props);
    getfriendReq(props.user.user)
  },[props.user.user])
  const { Search } = Input;
  const onSearch = async(value) =>{
    if(value && value!==' '){
      const res = await searchFirend({
        id: props.user.user,
        username:value
      })
      if(res.status===200){
       setSearchRes(res.data.data)
       setView('block')
       console.log("fr",res.data.data);
      }
      else{
        console.log(value);
      }
    }
    }
  const getfriendReq = async (userid) => {
    const res = await friendReq({  id:userid});
    if(res.data.code===200){
      console.log("fa",res.data.data);
      setRequestList(res.data.data)
    }
  }
  const add = async () => {
    const res = await addFriend({  
      "receiveUserVo": {
          "enabled": true,
          "gender": searchres.gender,
          "id": searchres.id,
          "profile": "http://8.134.134.68/profile/profile.png",
          "username": searchres.username
     },
     "remark": "string",
     "userVo": {
       ...props.user.userData
     },
    });
        console.log(res.data);
  }
  const btn = function () {
    add()
  }
  return (
   <div className='contentBox'>
<Row>
<Col xs={2} sm={4} md={6} lg={8} xl={6} offset={5}>
    <Search className='addSearch' size='large' placeholder="输入用户名查找" onSearch={onSearch} enterButton />
    </Col>
</Row>
<Row>
<Col xs={2} sm={4} md={6} lg={8} xl={6} offset={5}>
<Card className='addCard'  style={{display:view}}>
    <Avatar  src={searchres.profile} shape="square" size="small"/>
    <span>{searchres.username}: {searchres.id}</span><span> </span>
    <span>性别：{searchres.gender}</span>
    <Button type="primary" size='small' style={{marginLeft:'15%'}} onClick={btn}>添加</Button>
  </Card>
    </Col>
</Row>
    <Row>
    <Col xs={2} sm={4} md={6} lg={8} xl={18} offset={2} >
    <h3>添加请求</h3>
    <List
    itemLayout="horizontal"
    dataSource={requestList}
    renderItem={(item) => (
      <List.Item>
        <List.Item.Meta
          avatar={<Avatar src={item.friendInfo.profile}/>}
          title={<a href="https://ant.design">{item.friendInfo.username}</a>}
          description={item.status===3? "已添加" : item.status===2? "已拒绝" : "待处理"}
        />
      </List.Item>
    )}
  />
  </Col>
    </Row>
    </div>
  )
}
const mapStateToProps = (state) => {
  return {
    ...state,
  }
}
export default connect(mapStateToProps, null)(Add)
