import React,{Component} from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, Link } from 'react-router'
import { browserHistory } from 'react-router'
import Header from './component/Header'
import Login from './component/Login/index.jsx'
import UpdatePassword from './component/UpdatePassword'
import 'normalize.css/normalize.css'
import './public/stylesheet/style.css'

var getCookie = function (sKey) {
    return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
}

class App extends Component {
  constructor () {
    super()
    this.state = {
      isLogin: false
    }
  }
  componentWillMount () {
    let user = getCookie('username')
    if (user) {
      this.setState({
        username: user,
        isLogin: true
      })
    } else {
      this.context.router.push('/login')
    }
  }
  render () {
    return (
      <div class='flex-body'>
        <Header className='header' {...this.state} />
        <div class='maple-container' />
      </div>
    )
  }
}

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
    </Route>
    <Route path="/login" component={Login}>
    </Route>
    <Route path="/update_password" component={UpdatePassword}>
    </Route>
  </Router>
), document.getElementById('app'))
