import React, {Component} from 'react'
import axios from 'axios'
import { browserHistory } from 'react-router'
import getCookie from '../../common/getCookie'

let Item = (params) =>
  <div className='weui_media_box weui_media_text'>
    <h4 className='weui_media_title'>{new Date(params.createdAt).toLocaleDateString()}</h4>
    <p className="weui_media_desc">{params.message}</p>
    <ul className='weui_media_info'>
      <li className='weui_media_info_meta'>{params.read ? '已处理' : '未处理'}</li>
      <li className='weui_media_info_meta'>住户:{params.sourceUid.name}</li>
      <li className='weui_media_info_meta'>处理人:{params.uid ? params.uid.name : '暂无'}</li>
    </ul>
    <ul className='weui_media_info'>
      <li className='weui_media_info_meta'>标题: { params.title }</li>
      {
        params.role && params.role != 'resident' && !params.read ? (
          <li className='weui_media_info_meta'>
            <a href="javascript:;" onClick={()=>{params.hasHand(params._id)}} className="weui_btn weui_btn_mini weui_btn_primary">按钮</a>
          </li>
        ) : (
          ''
        )
      }

    </ul>

  </div>

class getComplaint extends Component {
  constructor () {
    super()
    this.state = {
      complaints: '',
      icon: '',
      display: 'none',
      warning: ''
    }
  }
  componentDidMount () {
    this.getData();
  }

  getData () {
    let that = this
    axios.get('/v1/api/complaint').then(function (response) {
      console.log(response.data.message);
      if (response.data.status === 0) {
        that.setState({
          complaints: response.data.message
        })
      }
    })
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
      that.getData()
    },1500)
  }

  hasHand (id) {
    var that = this
    axios.put('/v1/api/complaint', {
      id
    }).then (function (response) {
      that.change(response.data, that)
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
    let role = getCookie('role')
    let display = this.state.display
    let that = this
    console.log('ssssss');
    console.log(Object.prototype.toString.call(this.state.complaints));
    return (
      <div className='cell' >
        <div className="hd">
          <h1 className="page_title">投诉建议</h1>
        </div>
        <div className='bd'>

          {
            Object.prototype.toString.call(this.state.complaints) === '[object Array]' ?
              this.state.complaints.map(function (complaint, key) {
                if (role != 'resident') {
                  return <Item {...complaint} role={role} hasHand={that.hasHand.bind(that)} key={key} />
                }
                return <Item {...complaint} key={key} />
              }) : '暂无数据'
          }

          <a href="javascript:" className="weui_btn weui_btn_primary" onClick={()=>{browserHistory.goBack()}}>返回</a>
          <div id='toast' style={{display}}>
            <div className='weui_mask_transparent'></div>
            <div className='weui_toast'>
              <i className={this.state.icon}></i>
              <p className='weui_toast_content'>{this.state.warning}</p>
            </div>
          </div>
        </div>

      </div>
    )
  }
}

export default getComplaint
