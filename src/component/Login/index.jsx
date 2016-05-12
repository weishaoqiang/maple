import React, {Component} from 'react'
import axios from 'axios'
import { Link, browserHistory } from 'react-router'

class Login extends Component {
  constructor () {
    super()
    this.state = {
      icon: '',
      display: 'none',
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
      let warning = response.data.message
      let display = response.data.status === 1 ? '' : 'none'
      let icon = response.data.status === 1 ? 'weui_icon_msg weui_icon_info' : 'weui_icon_toast'
      that.setState({
        icon,
        display,
        warning
      });
      setTimeout(()=>{
        that.setState({
          display: 'none'
        })
      },1000)
      if (response.data.status === 0) {
        browserHistory.push('/')
      }
    })
    .catch(function (response) {
      var warning = '请重试'
      let display = response.data.status === 1 ? '' : 'none'
      let icon = response.data.status === 1 ? 'weui_icon_msg weui_icon_info' : 'weui_icon_toast'
      that.setState({
        icon,
        display,
        warning
      });
      setTimeout(()=>{
        that.setState({
          display: 'none'
        })
      },1000)
    });
  }
  render () {
    let display = this.state.display
    return (
      <div className='cell' >
        <div className="hd">
          <h1 className="page_title">小区登陆</h1>
        </div>
        <div className='bd'>
          <div className='weui_cells weui_cells_form'>
            <div className='weui_cell'>
              <div className='weui_cell_hd'>
                <label className="weui_label">账号</label>
              </div>
              <div className="weui_cell_bd weui_cell_primary">
                <input className="weui_input" placeholder="邮箱或用户名" ref="username" />
              </div>
            </div>
            <div className='weui_cell'>
              <div className='weui_cell_hd'>
                <label className="weui_label">密码</label>
              </div>
              <div className="weui_cell_bd weui_cell_primary">
                <input className="weui_input" type='password' ref="password" />
              </div>
            </div>
            <div className='weui_btn_area'>
              <a className="weui_btn weui_btn_primary" href="javascript:" onClick={this.login.bind(this)}>登陆</a>
            </div>
          </div>
          <div className='weui_extra_area'>
            <Link to='/update_password' style={{float:'left', color:'#225fba'}}>忘记密码</Link>
            <Link to='/create_user' style={{float:'right', color:'#225fba'}}>新用户</Link>
          </div>
        </div>
        <div id='toast' style={{display}}>
          <div className='weui_mask_transparent'></div>
          <div className='weui_toast'>
            <i className={this.state.icon}></i>
            <p className='weui_toast_content'>{this.state.warning}</p>
          </div>
        </div>
      </div>
    )
  }
}

export default Login;
