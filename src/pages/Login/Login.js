import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import store from '../../redux/store';
import { connect } from 'react-redux';
import './Login.css'
import { login } from '../../axios/api';
import { useState } from 'react';

const Login = (props) => {
  const [userInfo, setuserInfo] = useState("lj");
  const onFinish =  (values) => {
    const word=values.password
    const name=values.username
    toLogin(word,name)
  };
  const onFinishFailed = (errorInfo) => {
   setuserInfo(store.getState().user) 
  };
  const toLogin = async (word,name) => {
    const res = await login({"password": word,"username": name});
    if(res.data.code===200){
      props.sendAction(res.data)
      setuserInfo(store.getState().user)
      var storage = window.localStorage
      storage.setItem('userid', res.data.data.id)
      props.history.push('/Rou')
    }
  }
  return (
    <div className='loginBox'> 
      <Form 
      style={{paddingTop:'5%'}}
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 10,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
     
        <h2>进入系统{userInfo}</h2>
     
      <Form.Item
        label="Username"  
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          登录/注册
        </Button>
      </Form.Item>
    </Form>
    </div>
    
  );
};



const mapDispatchToProps = (dispatch)=> {
return{
  sendAction:(b)=>{
    dispatch({
      type:'SET_userInfo',
      values:b
    })
  },
}
}


const mapStateToProps=(state)=>{
  return {
      ...state
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Login);
// const action={
//   type:'',
//   value:value,
// }
//派发事件
// store.dispatch(action)