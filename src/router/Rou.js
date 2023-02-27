import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import { Layout, Menu, Col, Row, Badge, Avatar } from 'antd'
import { SubMenu, MenuItem, ItemGroup } from 'rc-menu'
import {Modal,Button } from 'antd';
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons'
import Add from '../pages/Add/Add'
import User from '../pages/User/User'
import Play from '../pages/Play'
import Firends from '../pages/Firends/Firends'
import { connect } from 'react-redux'
import createRoom from '../pages/createRoom/createRoom'
import Ready from '../pages/Ready/Ready'
import { acceptFriend } from '../axios/api';
const { Content } = Layout
const userId=localStorage.getItem('userid')
const Menus = (props) => {
  const [firendonline, setfirendonline] = useState()
  const [firendnotOnline, setfirendnotOnline] = useState()
  const [isModalOpen, setIsModalOpen] = useState(false);
const [modalMsg,setmodalMsg]=useState(" ")
const [modalExtendUser,setmodalExtendUser]=useState()
console.log('menus',props);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = async()=>{
    // console.log("e",e);
    setIsModalOpen(false);
    const res = await acceptFriend(1, modalExtendUser,userId)
    console.log('res', res)
  }
  const handleCancel = () => {
    setIsModalOpen(false);
  };
    // const [count, setcount] = useState()
  useEffect(() => {
    setfirendonline(Object.values(props.lists.msg11.extend.online))
    setfirendnotOnline(Object.values(props.lists.msg11.extend.notOnline))
    // console.log(typeof(props.lists.msg17.type));
    if(props.lists.msg17){
      // console.log(typeof(props.lists.msg17.type));
      console.log('props.lists.msg17.extend.user.id',props.lists.msg17.extend.user.id);
      setmodalMsg(props.lists.msg17)
      setmodalExtendUser(props.lists.msg17.extend.user.id)
      setIsModalOpen(true);
    }
  }, [props.lists])

  return (
    <Menu mode="inline" >
        <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
      <Modal title="游戏邀请"
        onOk={handleOk}
        onCancel={handleCancel}
        cancelText="取消" 
        okText="同意" 
        open={isModalOpen}>
        <p>{modalMsg.content}</p>
      </Modal>
      <MenuItem key="1" icon={<UserOutlined />}>
        <Link to="/Rou/add">添加好友</Link>
      </MenuItem>
      <SubMenu defaultOpenKeys={'2'} key="2" icon={<VideoCameraOutlined />} title=" 好友互聊">
        <ItemGroup title="在线好友">
          {firendonline?.map((item) => (
            <MenuItem key={item.id}>
              <Link to={`/Rou/firends/${item.id}`}>
                <Badge size="small" offset={[0, -3]} count={item.unreadCount}>
                  <Avatar src={item.profile} shape="square" size="small"/>
                </Badge>
                {item.username}
                </Link>
            </MenuItem>
          ))}
        </ItemGroup>
        <ItemGroup title="离线好友">
          {/* {item.profile} */}
          {firendnotOnline?.map((item) => (
            <MenuItem key={item.id}>
              {/* < Link to={`/basic/detail/${element[0].id}`}> */}
              <Link to={`/Rou/firends/${item.id}`}>
                <Badge size="small" offset={[0, -3]} count={item.unreadCount}>
                  <Avatar src="{item.profile}" shape="square" size="small" />
                </Badge>
                {item.username}
              </Link>
            </MenuItem>
          ))}
        </ItemGroup>
      </SubMenu>
      <MenuItem key="3" icon={<VideoCameraOutlined />}>
        {/* <Link to="/Rou/play:12">五子棋大战</Link> */}
        <Link to="/Rou/createroom">五子棋大战</Link> 
      </MenuItem>
      <MenuItem key="4" icon={<UploadOutlined />}>
        <Link to="/Rou/manage">个人中心</Link>
      </MenuItem>
    </Menu>
    
  
  )
}

const Rou = (props) => {
    console.log('Rou', props)
  return (
    <Router>
      <Row className="head">
        <Col xs={2} sm={4} md={6} lg={8} xl={6} offset={10}>
          <div>
            <h1>实时聊天系统</h1>
          </div>
        </Col>
        <Col xs={2} sm={4} md={6} lg={8} xl={5}>
          <p>username</p>
          <p>ip:xxx</p>
        </Col>
      </Row>
      <Row>
        <Col xs={2} sm={4} md={6} lg={8} xl={4}>
          {props.list && <Menus lists={props.list} />}
        </Col>
        <Col xs={2} sm={4} md={6} lg={8} xl={20} offset={0}>
          <Content>
            <div style={{ height: '91vh' }}>
              <Switch>
                {/* <Route path='/' exact component={User}></Route> */}
                <Route path="/Rou/add" component={Add} />
                <Route path="/Rou/firends/:id" component={Firends} />
                <Route path="/Rou/play:id" component={Play} />
                <Route path="/Rou/createroom" component={createRoom} />
                <Route path="/Rou/ready" component={Ready} />
                <Route path="/Rou/manage" component={User} />
              </Switch>
            </div>
          </Content>
        </Col>
      </Row>
    </Router>
  )
}

const mapStateToProps = (state) => {
  return {
    ...state,
  }
}

export default connect(mapStateToProps, null)(Rou)
