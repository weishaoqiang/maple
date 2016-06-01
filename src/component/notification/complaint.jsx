import React, {Component} from 'react'
import axios from 'axios'
import { Link,browserHistory } from 'react-router'

class createComplaint extends Component {
  constructor () {
    super()

    this.messageMaxLength = 200
    this.state = {
      message: '',
      icon: '',
      display: 'none',
      warning: ''
    }
  }

  postDate () {
    let that = this
    let title = this.refs.title.value
    let message = this.refs.message.value
    axios.post('/v1/api/notification', {
      title,
      message,
      type: 'complaint'
    }).then(function (response) {
      if (response.data.status === 0) {
        browserHistory.push('/user')
      } else {
        let icon = response.data.status === 1 ? 'weui_icon_msg weui_icon_info' : 'weui_icon_toast'
        let display = 'block'
        let warning = response.data.message || '系统出错，请联系管理员'
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
    })
  }

  handChange (event) {
    if (event.target.value.length > this.messageMaxLength) {
      return null
    }
    this.setState({
      message: event.target.value
    })
  }

  render () {
    let display = this.state.display
    return (
      <div className='cell' >
        <div className="hd">
          <h1 className="page_title">投诉建议</h1>
        </div>
        <div className='bd'>
          <div className='weui_cells weui_cells_form'>

            <div className='weui_cell'>
              <div className='weui_cell_hd'>
                <label className="weui_label">标题</label>
              </div>
              <div className="weui_cell_bd weui_cell_primary">
                <input className="weui_input" placeholder="建议标题" ref="title" />
              </div>
            </div>

            <div className='weui_cell'>
              <div className='weui_cell_bd weui_cell_primary'>
                <textarea onChange={this.handChange.bind(this)} value={this.state.message} className='weui_textarea' placeholder='请输入内容' ref='message' />
                <div className='weui_textarea_counter'>
                  <span>{this.state.message.length}</span>
                  /{this.messageMaxLength}
                </div>
              </div>
            </div>

            <div className='weui_cell_bd weui_cell_primary'>
              <a href="javascript:;" onClick={this.postDate.bind(this)} className="weui_btn weui_btn_primary">确定</a>
              <a href="javascript:" className="weui_btn weui_btn_primary" onClick={()=>{browserHistory.goBack()}}>返回</a>
            </div>

            <div id='toast' style={{display}}>
              <div className='weui_mask_transparent'></div>
              <div className='weui_toast'>
                <i className={this.state.icon}></i>
                <p className='weui_toast_content'>{this.state.warning}</p>
              </div>
            </div>

          </div>

        </div>

      </div>
    )
  }
}

export default createComplaint
