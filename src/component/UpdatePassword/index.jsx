import React, {Component} from 'react'
import axios from 'axios'
import { Link } from 'react-router'
// import './index.css'

class UpdatePassword extends Component {
  constructor () {
    super()
    this.state = {
      warning: '',
    }
  }

  update () {
    // console.log(this.refs.username.value)
    var username = this.refs.username.value;
    var password = this.refs.password.value;
    var againpassword = this.refs.againpassword.value
    var that = this;
    axios.post('/v1/api/update_password', {
      username,
      password,
      againpassword
    })
    .then(function (response) {
      var warning = response.data.message
      that.setState({
        warning
      });
      if (response.data.status === 0) {
        let data = JSON.stringify(response.data);
        localStorage.setItem('user', data)
        that.props.history.push('/')
      }
    })
    .catch(function (response) {
      var warning = '发生了未知的错误，请重试'
      that.setState({
        warning
      });
    });
  }

  sendEmail () {
    var that = this;
    var username = this.refs.username.value;
    if (!username) {
      this.setState({
        warning: '请输入用户名或邮箱'
      })
    } else {
      axios.post('/v1/api/get_email_code', {
        username
      })
      .then(function (response) {
        var warning = response.data.message
        that.setState({
          warning
        });
        if (response.data.status === 0) {
          this.setState({
            warning: '邮件发送成功'
          })
        }
      })
      .catch(function (response) {
        var warning = '发生了未知的错误，请重试'
        console.log(response)
        that.setState({
          warning
        });
      });
    }
  }

  render () {
    return (
      <div className='login'>
        <div className='login-container'>
          <header>密码重置</header>
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
                <input type='password' name='password' ref="againpassword" />
                <i className='fa fa-key'></i>
              </div>
              <div className='login-line'>
                <input type='text' name='password' ref="againpassword" />
                <button onClick={this.sendEmail.bind(this)}>发送验证码</button>
                <i className='fa fa-envelope-o'></i>
              </div>
              <div className='login-line'>
                <Link to='login'>登陆</Link>
                <button onClick={this.update.bind(this)}>提交</button>
              </div>
          </div>
        </div>
      </div>
    )
  }
}

export default UpdatePassword;
