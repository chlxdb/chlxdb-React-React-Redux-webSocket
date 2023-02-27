import React from 'react'
import { Input,Col, Row,Avatar, List,Card} from 'antd';
import './Add.css'
import { friendReq, login,getChat } from '../../axios/api';

const { Search } = Input;

const data = [
  {
    title: 'Ant Design Title 1',
  },
  {
    title: 'Ant Design Title 2',
  },
  {
    title: 'Ant Design Title 3',
  },
  {
    title: 'Ant Design Title 4',
  },
];
const onSearch = (value) => console.log(value);


// ComponentDidMount(){

// }
const getfriendReq = async () => {
  const res = await friendReq({  id:1599245134922842114n});
      console.log(res.data);
}
const toLogin = async () => {
  const res = await login({   "password": "121","username": "chl"});
      console.log(res.data);
}
const chatRecode = async () => {
  const res = await getChat({
    'anotherId': '1599245134922842114',
    'current': 1,
    'size': 5,
    'userId': '1598252657034199041',
  })
  console.log('res', res)
}

const btn = function () {
  chatRecode()
  getfriendReq()
  toLogin()
// axios({
//   url:'/get',
//   params:{name:"xxx",age:18},
//  method:'get'
// }).then(
//  res=>{console.log(res.data)} 
// ) 

}


export default function Add() {
  return (
   <div className='contentBox'>
<Row>
<Col xs={2} sm={4} md={6} lg={8} xl={6} offset={5} >
    <Search className='addSearch' size='large' placeholder="输入用户ID或者用户名查找" onSearch={onSearch} enterButton />
    <button onClick={btn}>axios</button>
    </Col>
</Row>
<Row>
<Col xs={2} sm={4} md={6} lg={8} xl={6} offset={5} >
<Card className='addCard'>
    <p>Card content</p>
    
  </Card>
    </Col>
</Row>
    <Row>
      
    <Col xs={2} sm={4} md={6} lg={8} xl={18} offset={2} >

    <h3>添加请求</h3>
    <List
    itemLayout="horizontal"
    dataSource={data}
    renderItem={(item) => (
      <List.Item>
        <List.Item.Meta
          avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
          title={<a href="https://ant.design">{item.title}</a>}
          description="Ant Design, a design language for background applications, is refined by Ant UED Team"
        />
      </List.Item>
    )}
  />
  </Col>
    </Row>
    </div>
    
  )
}

