import React from 'react';
import { Avatar} from 'antd';
import { Col, Row } from 'antd';
export default function User() {
  return (
    <>
    <div className='contentBox'>
      <Row>
      <Col xs={2} sm={4} md={6} lg={8} xl={5} offset={1} >
      <Avatar style={{ backgroundColor: '#7265e6', verticalAlign: 'middle' }} size={ {xs: 2, sm: 2,xl:80} }>
        name
      </Avatar>
      </Col>
      <Col xs={2} sm={4} md={6} lg={8} xl={5} offset={0} >
        <p>Id:</p>
        <p>username</p>
        <p>password</p>
      </Col>
      </Row>
      </div> 
    </>
  );

}

