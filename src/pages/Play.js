
// import { Row,Col} from 'antd';
import { Col, Row } from 'antd';
import React, { Component } from 'react'

export default class Play extends Component {
  constructor(props){
    super(props);
    this.state={
      ctx:'',
      chessInfo:[
          {name:'黑子',color:'#111'},
          {name:'白子',color:'#eee'}
        ],
        chess : 0,//当前执棋
        chess_rec:[] //下棋的坐标路径
    }
}
componentDidMount() {
  this.createImage();
  console.log(this.state.chessInfo);
}
// 拼图制作
createImage = () => {
let ctx = this.canvasRef.getContext('2d');
   
  this.setState({ctx:ctx})
//  const {ctx}=this.state.ctx
  console.log('ctxxxxx', ctx);
  // ctx.lineWidth=0;
  ctx.fillStyle = '#963'//#f2f3f5;
  // ctx.strokeStyle="#8a919f";
  ctx.fillRect(0, 0, 595, 595);
  //绘制棋盘15*15
  for (let i = 1; i <= 16; i++) {
  ctx.beginPath()
  ctx.moveTo(35*i,35)
  ctx.lineTo(35*i,560)
  ctx.stroke()
  ctx.beginPath()
  ctx.moveTo(35,35*i)
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
  
}

ccl=(ev)=>{
//向画布添加点击事件监听
const col=this.state.chessInfo[1].color
  console.log(ev);
  let x=Math.round(ev.nativeEvent.offsetX/35) ,y=Math.round(ev.nativeEvent.offsetY/35);
  // let x=ev.nativeEvent.offsetX ,y=ev.nativeEvent.offsetY
  //修正坐标
  // console.log(ev.nativeEvent.offsetX,ev.nativeEvent.offsetY);
this.setChess(x*35,y*35,col)
// this.setChess(x,y,col)
// )
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
          <h2>结束游戏</h2>
          <h3>退出房间</h3>
          </Col>
        </Row>
     
      

 </div>
    )
  }
}
