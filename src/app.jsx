import React,{Component} from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router'
import 'weui'

import Login from './component/Login'
import UpdatePassword from './component/UpdatePassword'
import CreateUser from './component/CreateUser'
import Content from './component/Content'
import Me from './component/Me'
import Account from './component/Account'
import Detail from './component/Detail'
import createNotification from './component/notification/create'
import getRepair from './component/repair/index'
import Notification from './component/notification/index'
import Check from './component/check/index'
import Complaint from './component/notification/complaint'
import getComplaint from './component/complaint/complaint'

import './public/stylesheet/style.css'
import getCookie from './common/getCookie'

class App extends Component {
  constructor () {
    super()
  }
  componentWillMount () {
    let user = getCookie('username')
    if (!user) {
      browserHistory.push('/login')
    }
  }

  render () {
    let user = getCookie('username')
    return (
      <div className='container' id='container'>
        {this.props.children && React.cloneElement(this.props.children, {
          user
        })}
      </div>
    )
  }
}

ReactDOM.render((
  <Router history={browserHistory}>
    <Route component={App}>
      <Route path='/' component={Content}>
        <IndexRoute component={Me}></IndexRoute>
        <Route path="/user" component={Me}></Route>
        <Route path='/notification' component={Notification} />
        <Route path='/check' component={Check} />
      </Route>
      <Route  path='/notification/create' component={createNotification} />
      <Route  path='/notification/complaint' component={Complaint} />
      <Route path='/complaint' component={getComplaint} />
      <Route path='/repair' component={getRepair}></Route>
      <Route path='user_info' component={Detail}></Route>
      <Route path="login" component={Login}></Route>
      <Route path="update_password" component={UpdatePassword}></Route>
      <Route path="create_user" component={CreateUser}></Route>
    </Route>
  </Router>
), document.getElementById('app'))
