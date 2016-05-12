import React,{Component} from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, Link, browserHistory } from 'react-router'
import 'weui'
import Header from './component/Header'
import Login from './component/Login'
import UpdatePassword from './component/UpdatePassword'
import CreateUser from './component/CreateUser'
import Navbar from './component/Navbar'
import './public/stylesheet/style.css'
import getCookie from './common/getCookie'

class App extends Component {
  constructor () {
    super()
    this.state = {
      isLogin: false
    }
  }
  componentWillMount () {
    let user = getCookie('username')
    let role = getCookie('role')
    if (user) {
      this.setState({
        username: user,
        role: role,
        isLogin: true
      })
    } else {
      browserHistory.push('/login')
    }
  }
  render () {
    return (
      <div className='container' id='container'>
        {this.props.children}
      </div>
    )
  }
}

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path="login" component={Login}></Route>
      <Route path="update_password" component={UpdatePassword}></Route>
      <Route path="create_user" component={CreateUser}></Route>
    </Route>
  </Router>
), document.getElementById('app'))
