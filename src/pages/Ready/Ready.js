import React, { Component } from 'react'
import { invitFriend,outRooms } from '../../axios/api'
import {Row, Button, Col, Drawer, } from 'antd';
import Play from '../Play'
import { connect } from 'react-redux';
import { start } from '../../axios/api';
class Ready extends Component {
constructor(props){
  super (props)
  this.state={
open:true,
childrenOpen:false,
firends:[],
roomid:''
  }
}
componentDidMount=(props)=>{
  // const objOnline = store.getState().list.msg11.extend.online
  // console.log('object',objOnline);
  console.log('000',this.props);
  console.log('no',Object.values(this.props.list.msg11.extend.notOnline));
this.setState({firends:Object.values(this.props.list.msg11.extend.online)})

}
// componentDidUpdate(prevProps) {
//   // 典型用法（不要忘记比较 props）：
//   if (this.props.userID !== prevProps.userID) {
//     this.fetchData(this.props.userID);
//   }
// }
outRoom = async(userid)=>{
  const res = await outRooms(userid)
  console.log('res',res)
}
start = async(roomid,userid)=>{
  const res = await start(roomid,userid)
  console.log('res',res)
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
    // console.log('fff',firends);
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
    
      <Drawer title="邀请已在线的好友"  placement="right"  closable={false} onClose={this.onClose} open={open}>
        <Button type="primary" onClick={this.showChildrenDrawer}>
        邀请好友开局
      </Button>
      <p>邀请成功</p>
      <p onClick={this.onClose}>重新开始</p>
      <button onClick={()=>this.start(roomid,userid)}>点击开始</button>
      <button onClick={()=>this.outRoom(userid)}>退出房间</button>
        <Drawer
          title="Two-level Drawer"
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

