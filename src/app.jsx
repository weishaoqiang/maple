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
        <div className='maple-top' style={{position:'fixed'}} onClick={function () {browserHistory.goBack()}}>
          <img
            width='40px'
            height= '20px'
            src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAA30lEQVRYR73XzQ2DMAyGYWePDNMlyLWwAaswQdMrWYJh2MNVJJBQJfJjf4ZzxPv4ZNmR0RfSHplpS8HHUsJZ9HOciN7538w0lRBwwDV+DPddBz/eDQoF9MYzCgaQxGEAaRwC0MTVAG1cBUDExQBUXARAxrsB6HgXwCLeDLCKNwEs41WAdbwKGNZ9dI4+5yZjppiCn5ArvLqMrBFVQJ7WEtEEsEQ0A6wQXQALRDcAjRABkAgxAIVQARAINUCLgAA0CBhAioACbhBLCn5+5DQ7I3+747nb8DrlgXiVDtP8/gfiuL8hnqIpRgAAAABJRU5ErkJggg=='
            />
         </div>
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
      </Route>
      <Route path='/repair' component={getRepair}></Route>
      <Route path='user_info' component={Detail}></Route>
      <Route path="login" component={Login}></Route>
      <Route path="update_password" component={UpdatePassword}></Route>
      <Route path="create_user" component={CreateUser}></Route>
    </Route>
  </Router>
), document.getElementById('app'))
