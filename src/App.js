import React from 'react'
import{BrowserRouter as Router,Route,Switch,withRouter} from 'react-router-dom'
import { connect } from 'react-redux';
import Rou from './router/Rou'
import 'antd/dist/reset.css';
import './App.css';
import Login from './pages/Login/Login';
import Play from './pages/Play';
import Firends from './pages/Firends/Firends';

function App(props) {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/Rou" component={Rou}></Route>
          <Route path="/login" component={Login}></Route>
          <Route path="/play" component={Play}></Route>
          <Route path="/firend" component={Firends}></Route>
          <Route path="/"  component={Login}></Route>
        </Switch>
      </Router>
    </div>
  )
}

// const mapDispatchToProps = (dispatch)=> {
//   return{
//     setSocket:(some)=>{
//       dispatch({
//         type:some,
//         infoType:some,
//         // notOnline:some.extend.notOnline,
//         // Online:some.extend.Online,
//       })
//     },
  
//   }
//   }
  
  
// const mapStateToProps=(state)=>{
//   return {
//     msg8:state.msg8,
//     msg11:state.msg11
// }
// }
const mapStateToProps=(state)=> {
  return {
      Info: state
  }
}
export default withRouter(connect(mapStateToProps,null)(App)) ;
