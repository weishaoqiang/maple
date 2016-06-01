import React, {Component} from 'react'
import axios from 'axios'
import { Link, browserHistory } from 'react-router'

class UpdatePassword extends Component {
  constructor () {
    super()
    this.state = {
      icon: '',
      display: 'none',
      warning: ''
    }
  }

  change (data, that) {
    let warning = data.message
    let display = ''
    let icon = data.status === 1 ? 'weui_icon_msg weui_icon_info' : 'weui_icon_toast'
    that.setState({
      icon,
      display,
      warning
    })
    setTimeout(()=>{
      that.setState({
        display: 'none'
      })
    },1000)
  }
  update () {
    var username = this.refs.username.value
    var password = this.refs.password.value
    var passwordConfirmation = this.refs.passwordConfirmation.value
    var code = this.refs.code.value
    var that = this
    axios.post('/v1/api/update_password', {
      code,
      username,
      password,
      passwordConfirmation
    })
    .then(function (response) {
      that.change(response.data, that)
      if (response.data.status === 0) {
        setTimeout(()=>{
          browserHistory.push('/login')
        },1000)
      }
    })
    .catch(function (response) {
      that.change(response.data, that)
    })
  }

  sendEmail () {
    var that = this
    that.change({status:0,message:'正在发送中'}, that)
    var username = this.refs.username.value
    if (!username) {
      that.change({status:0,message:'请输入用户名'}, that)
    } else {
      axios.post('/v1/api/get_email_code', {
        username
      })
      .then(function (response) {
        that.change(response.data, that)
      })
      .catch(function (response) {
        that.change(response.data, that)
      })
    }
  }

  render () {
    let display = this.state.display
    return (
      <div className='cell' >
        <div className="hd">
          <h1 className="page_title">密码重置</h1>
        </div>
        <div className='bd'>
          <div className='weui_cells weui_cells_form'>
            <div className='weui_cell'>
              <div className='weui_cell_hd'>
                <label className="weui_label">账&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号</label>
              </div>
              <div className="weui_cell_bd weui_cell_primary">
                <input className="weui_input" placeholder="邮箱或用户名" ref="username" />
              </div>
            </div>
            <div className='weui_cell'>
              <div className='weui_cell_hd'>
                <label className="weui_label">密&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;码</label>
              </div>
              <div className="weui_cell_bd weui_cell_primary">
                <input className="weui_input" type='password' ref="password" />
              </div>
            </div>
            <div className='weui_cell'>
              <div className='weui_cell_hd'>
                <label className="weui_label">密码确认</label>
              </div>
              <div className="weui_cell_bd weui_cell_primary">
                <input className="weui_input" type='password' ref="passwordConfirmation" />
              </div>
            </div>
            <div className="weui_cell">
              <div className="weui_cell_hd"><label className="weui_label">邮箱验证</label></div>
              <div className="weui_cell_bd weui_cell_primary">
                <input className="weui_input" placeholder="请输入验证码" ref="code" />
              </div>
              <div className="weui_cell_ft">
                <a href='javascript:' className='weui_btn weui_btn_mini weui_btn_primary' onClick={this.sendEmail.bind(this)}>获取</a>
              </div>
            </div>
            <div className='weui_btn_area'>
              <a href="javascript:" className="weui_btn weui_btn_primary" onClick={this.update.bind(this)}>更新密码</a>
              <a href="javascript:" className="weui_btn weui_btn_primary" onClick={()=>{browserHistory.goBack()}}>返回</a>
            </div>
          </div>
          <div className='weui_extra_area'>
            <Link to='/login' style={{float:'left', color:'#225fba'}}>登陆</Link>
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

export default UpdatePassword
