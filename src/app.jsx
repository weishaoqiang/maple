import React,{Component} from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, Link } from 'react-router'
import { browserHistory } from 'react-router'
import Header from './component/Header'
import Login from './component/Login/index.jsx'
import 'normalize.css/normalize.css'
import './public/stylesheet/style.css'

class App extends Component {
  constructor () {
    super();
    this.state = {
      isLogin: false
    }
  }
  componentWillMount () {
    if (this.props.location.state) {
      this.setState(this.props.location.state)
    } else {
      this.props.history.push('/login')
    }
    // if (this.props.location.state && !this.props.location.state.isLogin) {
    //   this.props.history.push('/login')
    // }
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
  </Router>
), document.getElementById('app'))
