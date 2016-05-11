import React, {Component} from 'react'
import axios from 'axios'
import { Link, browserHistory } from 'react-router'
import './index.css'

var getCookie = function (sKey) {
    return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
}


class Login extends Component {
  constructor () {
    super()
    this.state = {
      warning: '',
    }
  }

  login () {
    // console.log(this.refs.username.value)
    var username = this.refs.username.value;
    var password = this.refs.password.value;
    var that = this;
    axios.post('/v1/api/signin', {
      username,
      password
    })
    .then(function (response) {
      var warning = response.data.message
      that.setState({
        warning
      });
      if (response.data.status === 0) {
        browserHistory.push('/')
      }
    })
    .catch(function (response) {
      var warning = '发生了未知的错误，请重试'
      that.setState({
        warning
      });
    });
  }
  render () {
    return (
      <div className='login'>
        <div className='login-container'>
          <header>小区登陆系统</header>
          <div className='login-body'>
              <div className='login-line warning'>{this.state.warning}</div>
              <div className='login-line'>
                <input type='text' placeholder='用户名或邮箱' ref="username" />
                <i className='fa fa-user'></i>
              </div>
              <div className='login-line'>
                <input type='password' name='password' ref="password" />
                <i className='fa fa-key'></i>
              </div>
              <div className='login-line'>
                <Link to='update_password'>忘记密码啦？</Link>
                <button onClick={this.login.bind(this)}>登陆</button>
              </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Login;
