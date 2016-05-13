import React,{Component} from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router'
import 'weui'

import Login from './component/Login'
import UpdatePassword from './component/UpdatePassword'
import CreateUser from './component/CreateUser'
import Content from './component/Content'
import './public/stylesheet/style.css'
import getCookie from './common/getCookie'

class App extends Component {
  constructor () {
    super()
  }
  componentWillMount () {
    let user = getCookie('username')
    console.log(user)
    if (!user) {
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
      <IndexRoute component={Content}></IndexRoute>
      <Route path="login" component={Login}></Route>
      <Route path="update_password" component={UpdatePassword}></Route>
      <Route path="create_user" component={CreateUser}></Route>
    </Route>
  </Router>
), document.getElementById('app'))
