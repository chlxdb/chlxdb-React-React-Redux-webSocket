import {Row,Col, Button } from 'antd'
import React, { Component } from 'react'
import { createRooms } from '../../axios/api'
import { connect } from 'react-redux'
 class createRoom extends Component {
 constructor(props){
  super(props);
  this.state={
     user:window.localStorage.getItem("userid")
  }
}

componentDidMount() {
}
  creact=async()=>{
    // this.props.history.push('/Rou/ready')
    const res = await createRooms(this.state.user)
    if(res.data.code ===200){
      //tiaozh跳转到邀请好友界面
      // console.log(this.props);
    this.props.room(res.data.data)
   }
   console.log('creactprops',this.props);
      console.log('res',res);
      this.props.history.push('/Rou/ready')
    }
  render() {
    return (
      <Row>
        <Col xs={2} sm={4} md={6} lg={24} xl={24} offset={2} >
      <Button type="link" onClick={this.creact} style={{ fontSize:'2rem', margin:'20%',}}>创建并进入房间</Button>
      </Col>
      </Row>
    )
  }

}


const mapDispatchToProps = (dispatch)=> {
  return{
    room:(b)=>{
      dispatch({
        type:'roomInfo',
        values:b
      })
    },
  }
}
const mapStateToProps = (state) => {
  return {
    ...state,
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(createRoom)

