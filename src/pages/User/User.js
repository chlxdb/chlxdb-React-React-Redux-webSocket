import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom'
import { Avatar} from 'antd';
import { Col, Row ,Button} from 'antd';
 const User=(props)=> {
   console.log('userprops',props);
   let history = useHistory()
   const out=(e)=>{
    localStorage.clear()
    history.push('/login')
   }
  return (
    <>
    <div className='contentBox'>
      <Row>
      <Col xs={2} sm={4} md={6} lg={8} xl={5} offset={1} >
      <Avatar src={props.profile} style={{ backgroundColor: '#7265e6', verticalAlign: 'middle' }} size={ {xs: 2, sm: 2,xl:70} }>
      </Avatar>
      </Col>
      <Col xs={2} sm={4} md={6} lg={8} xl={5} offset={1} >
        <h3>Id:<span>'{props.id}'</span> </h3>
        <h3>username: <span>'{props.username}'</span> </h3>
      </Col>
      <Col xs={2} sm={4} md={6} lg={8} xl={5} offset={1} >
      <Button type="link" onClick={out}>退出账号</Button>
      </Col>
      </Row>
      </div> 
    </>
  );
}

const mapStateToProps=(state)=>{
  return {
      ...state.user.userData
  }
}
export default connect(mapStateToProps)(User); 
