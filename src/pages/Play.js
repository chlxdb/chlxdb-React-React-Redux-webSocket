
import { Button, Col, Row } from 'antd';
import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import {checkRoom} from '../axios/api'

class Play extends Component {
  constructor(props){
    super(props);
    this.state={
      ctx:'',
      chessInfo:[
          {name:'黑子',color:'#111'},
          {name:'白子',color:'#eee'}
        ],
        chess : 0,//当前执棋
        chess_rec:[] ,//下棋的坐标路径
        num:0
    }
}
componentDidMount() {
  this.check()
  this.createImage()
  // console.log(this.state.chessInfo);
  console.log('playprops',this.props);
}
 
componentDidUpdate(prevProps) {
  // 典型用法（不要忘记比较 props）：
  if (this.props!== prevProps) {
    console.log('playprops',this.props);
    if(this.props.list.msg20){
      let nums=this.props.list.msg20.extend.golangPiecesType
        this.setState({num:nums})
      
    }
      //渲染棋盘
      if(this.props.list.msg22){
        console.log('updateplayprops',this.props);
        // console.log('updateplayprops',this.props.list.msg21.content);//提示轮到下棋
        console.log('updateplayprops',this.props.list.msg22);//棋盘更新信息
        let chessArr=this.props.list.msg22.extend.golangUpdateInfo
        if(chessArr[2]===1){
          this.setChess(chessArr[0]*35,chessArr[1]*35,this.state.chessInfo[0].color)
        }else if(chessArr[2]===-1){
          this.setChess(chessArr[0]*35,chessArr[1]*35,this.state.chessInfo[1].color)
        }
       //游戏结束
      if(this.props.list.msg23){
        console.log(this.props.list.msg23);
        }
    }
  }
}
check=async()=>{
  const res = await checkRoom(this.props.user.user);
  if(res.status===200){
    if(res.data.data.havePlayRoom===true){
     let arr=res.data.data.playRoomInfo.square
     console.log('check',arr);
    //  this.setState({chess_rec:arr})
     for(let i=0;i<=14;i++){
       for(let j=0;j<=14;j++){
         if(arr[i][j]===1){
           console.log(i,j,arr[i][j]);
           if(arr[i][j]===1){
            const col=this.state.chessInfo[0].color
            this.setChess(j*35,i*35,col)
           }else if(arr[i][j]===-1){
            const col=this.state.chessInfo[1].color
            this.setChess(j*35,i*35,col)
           }
           
         }
       }
     }
    }
  }
  
}
// 拼图制作
createImage = () => {
let ctx = this.canvasRef.getContext('2d');
  this.setState({ctx:ctx})
  ctx.fillStyle = '#963'//#f2f3f5;
  ctx.fillRect(0, 0, 560, 560);
  //绘制棋盘15*15
  for (let i = 1; i <= 16; i++) {
  ctx.beginPath()
  ctx.moveTo(35*i,0)
  ctx.lineTo(35*i,560)
  ctx.stroke()
  ctx.beginPath()
  ctx.moveTo(0,35*i)
  ctx.lineTo(560,35*i)
  ctx.stroke()
  ctx.lineJoin="round";
  }
  const col=this.state.chessInfo[0].color
  this.setChess(35,525, col)
  //获取图像的数据URL
  // var imgURL = this.canvasRef.toDataURL("image/png"); //默认图片格式为png，也可以自定义设置格式。
//开将这个imgURL的路径可在img标签中展示
};
setChess=(x,y,c)=>{
  let ctx = this.canvasRef.getContext('2d');
  ctx.save()
  ctx.beginPath()
  ctx.fillStyle=c
  ctx.arc(x,y,16,0,2*Math.PI)
  ctx.fill()
  ctx.restore()
  console.log("ok");
}
ccl=(ev)=>{
//向画布添加点击事件监听
const sym=this.state.num
let col=''
if(sym===1){
   col=this.state.chessInfo[0].color;
}else if(sym===-1){
   col=this.state.chessInfo[1].color;
}
  let x=Math.round(ev.nativeEvent.offsetX/35) ,y=Math.round(ev.nativeEvent.offsetY/35);
  //修正坐标
  console.log('x,y',x,y);
  const playChessRequestVo ={
  "golangPiecesType": sym,
  "m": x,
  "n": y,
  "userId": this.props.user.user
  }
  axios({
      url: 'http://8.134.134.68:8080/gobang/play',
      method: 'POST',
      headers: {
        ContentType: 'multipart/form-data',
      },
      data: playChessRequestVo,
   } ).then(
      request => {
        console.log(request);
        if(request.status===200)
        this.setChess(x*35,y*35,col)
      },
      error => {
          console.log(error)
      }
  )
}
  render() {
    return (
      <div style={{padding:'2%'}}>
        <Row>
          <Col  xs={2} sm={4} md={6} lg={24} xl={9} offset={0}>
        <canvas
        id='canv'
      width='595'
      height='595'
        ref={(ref) => {
        this.canvasRef = ref;
      }}
      onClick={this.ccl}
         >
        </canvas>
        </Col>
          <Col xs={2} sm={4} md={6} lg={24} xl={5} offset={10}>
            {/* <h1>已进行xxxxshichang</h1> */}
          <h1>当前执棋：“黑”</h1>
          <Button type='link' >结束游戏</Button>
          <Button type='link' >退出房间</Button>
          </Col>
        </Row>
 </div>
    )
  }
}

const mapDispatchToProps = (dispatch)=> {
  return{
    removeType21:(b)=>{
      dispatch({
        type:'21',
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
export default connect(mapStateToProps, mapDispatchToProps)(Play)