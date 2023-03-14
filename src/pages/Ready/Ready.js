import React, { Component } from 'react'
import { invitFriend,outRooms } from '../../axios/api'
import {Row, Button, Col, Drawer, } from 'antd';
import Play from '../Play'
import { connect } from 'react-redux';
import { start } from '../../axios/api';

import './Ready.css'
class Ready extends Component {
constructor(props){
  super (props)
  this.state={
open:true,
childrenOpen:false,
firends:[],
roomid:'',

  }
}
componentDidMount=(props)=>{
this.setState({firends:Object.values(this.props.list.msg11.extend.online)})
}

outRoom = async(userid)=>{
  const res = await outRooms(userid)
  if (res.status===200) {
    this.props.history.push('/Rou/createroom')
  }
}
start = async(roomid,userid)=>{
  const res = await start(roomid,userid)
  console.log('readOkres',res)
}
showDrawer = () => {
  this.setState({open:true});
};
 onClose = () => {
  this.setState({open:false});
};
showChildrenDrawer = () => {
  this.setState({childrenOpen:true});

};

onChildrenDrawerClose = () => {
  this.setState({childrenOpen:false });
};
 invit =async (friendId, userId)=>{
  const res = await invitFriend(friendId, userId)
  console.log('res', res)
}
  render() {
    const userid=localStorage.getItem('userid')
    const roomid=this.props.list.room.id
    const {open,childrenOpen,firends}=this.state
    return (
      <>
      <Row>
        <Col xs={2} sm={4} md={6} lg={24} xl={18} offset={2}>
       < Play></Play>
       </Col>
       <Col style={{marginTop:"10%"}} xs={2} sm={4} md={6} lg={24} xl={2} offset={1}>
      <Button type="primary" onClick={this.showDrawen}>
        邀请好友开局
      </Button>
      </Col>
      <Drawer title="邀请已在线的好友"  placement="right"  closable={false}  open={open}>
        <Button type="primary" onClick={this.showChildrenDrawer}>
        邀请好友开局
      </Button>
      <p>邀请成功</p>
      <button onClick={this.onClose}>重新开始</button>
      <br></br>
      <button id='readybtn' onClick={()=>this.start(roomid,userid)}>准备就绪</button>
      <br></br>
      <button id='leavebtn' onClick={()=>this.outRoom(userid)}>退出房间</button>
        <Drawer
          title="邀请列表"
          width={320}
          onClose={this.onChildrenDrawerClose}
          open={childrenOpen}
        > 
          {
            firends.map((element, id)=>{
              return(<p key={id}> {element.username} <Button onClick={()=>this.invit(element.id,userid)} type="link"  style={{ marginLeft:'20%',background:'yellow'}}>邀请</Button></p>)  
             })
          }
        </Drawer>
      </Drawer>
      
      </Row>
    </>
    )
  }
}
function mapStateToProps(state) { 
  return Object.assign({}, state)
}
export default connect(mapStateToProps)(Ready)

