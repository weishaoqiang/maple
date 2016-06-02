import React, {Component} from 'react'
import axios from 'axios'
import { Link,browserHistory } from 'react-router'

class CreateUser extends Component {
  constructor () {
    super()
    this.state = {
      icon: '',
      display: 'none',
      warning: '',
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
    });
    setTimeout(()=>{
      that.setState({
        display: 'none'
      })
    },1500)
  }

  create () {
    var username = this.refs.username.value;
    let email = this.refs.email.value;
    let phone = this.refs.phone.value;
    let name = this.refs.name.value;
    let password = this.refs.password.value;
    let passwordConfirmation = this.refs.passwordConfirmation.value
    let code = this.refs.code.value
    let role = this.refs.role.value
    let that = this;
    axios.post('/v1/api/signup', {
      username,
      email,
      phone,
      name,
      password,
      passwordConfirmation,
      role,
      code
    })
    .then(function (response) {
      if (response.data.status === 0) {
        setTimeout(()=>{
          browserHistory.push('/login')
        },1000)
      } else {
        that.change(response.data, that)
      }
    })
    .catch(function (response) {
      that.change(response.data, that)
    })
  }

  sendEmail () {
    let that = this;
    that.change({status:0,message:'正在发送中'}, that)
    let email = this.refs.email.value;
    let username = this.refs.email.value;
    if (!email) {
      that.change({status:0,message:'请输入邮箱'}, that)
    } else {
      axios.post('/v1/api/get_email_code', {
        username,
        email
      })
      .then(function (response) {
        that.change(response.data, that)
      })
      .catch(function (response) {
        that.change(response.data, that)
      });
    }
  }

  render () {
    let display = this.state.display
    return (
      <div className='cell' >
        <div className="hd">
          <h1 className="page_title">用户注册</h1>
        </div>
        <div className='bd'>
          <div className='weui_cells weui_cells_form'>
            <div className='weui_cell'>
              <div className='weui_cell_hd'>
                <label className="weui_label">登陆名称</label>
              </div>
              <div className="weui_cell_bd weui_cell_primary">
                <input className="weui_input" placeholder="登陆名称" ref="username" />
              </div>
            </div>
            <div className='weui_cell'>
              <div className='weui_cell_hd'>
                <label className="weui_label">邮&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;箱</label>
              </div>
              <div className="weui_cell_bd weui_cell_primary">
                <input className="weui_input" placeholder="邮箱" ref="email" />
              </div>
            </div>
            <div className='weui_cell'>
              <div className='weui_cell_hd'>
                <label className="weui_label">手机号码</label>
              </div>
              <div className="weui_cell_bd weui_cell_primary">
                <input className="weui_input" type='number' placeholder="手机号码" ref="phone" />
              </div>
            </div>
            <div className='weui_cell'>
              <div className='weui_cell_hd'>
                <label className="weui_label">用户身份</label>
              </div>
              <div className="weui_cell_bd weui_cell_primary">
                <select className="weui_select" name="role" ref='role'>
                    <option value="repairer">维修人员</option>
                    <option value="staff">管理员</option>
                </select>
              </div>
            </div>
            <div className='weui_cell'>
              <div className='weui_cell_hd'>
                <label className="weui_label">显示名称</label>
              </div>
              <div className="weui_cell_bd weui_cell_primary">
                <input className="weui_input" placeholder="显示名称" ref="name" />
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
              <a href="javascript:" className="weui_btn weui_btn_primary" onClick={this.create.bind(this)}>创建用户</a>
            </div>
          </div>
          <div className='weui_extra_area'>
            <Link to='/login' style={{float:'left', color:'#225fba'}}>登陆</Link>
            <Link to='/update_password' style={{float:'right', color:'#225fba'}}>找回密码</Link>
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

export default CreateUser;
