import React, {Component} from 'react'
import axios from 'axios'
import { browserHistory } from 'react-router'

let Item = (params) =>
  <div className='weui_media_box weui_media_text'>
    <h4 className='weui_media_title'>{new Date(params.createdAt).toLocaleDateString()}</h4>
    <p className="weui_media_desc">{params.message}</p>
    <ul className='weui_media_info'>
      <li className='weui_media_info_meta'>{params.finish ? '已处理' : '未处理'}</li>
      <li className='weui_media_info_meta'>住户:{params.sourceUid.name}</li>
      <li className='weui_media_info_meta'>处理人:{params.uid ? params.uid.name : '暂无'}</li>
    </ul>
    <ul className='weui_media_info'>
      <li className='weui_media_info_meta'>地址: { params.address }</li>
      <li className='weui_media_info_meta'>标题: { params.title }</li>
    </ul>

  </div>

class getRepair extends Component {
  constructor () {
    super()
    this.state = {
      repairs: ''
    }
  }
  componentDidMount () {
    let that = this
    axios.get('/v1/api/repair').then(function (response) {
      if (response.data.status === 0) {
        that.setState({
          repairs: response.data.message
        })
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
    let role = this.props.role || ''
    return (
      <div className='cell' >
        <div className="hd">
          <h1 className="page_title">报修</h1>
        </div>
        <div className='bd'>

          {
            Object.prototype.toString.call(this.state.repairs) === '[object Array]' ?
              this.state.repairs.map(function (repair, key) {
                if (role === 'repairer') {
                  return <Item {...repair} key={key} />
                }
                return <Item {...repair} key={key} />
              }) : '没有报修'
          }

          <a href="javascript:" className="weui_btn weui_btn_primary" onClick={()=>{browserHistory.goBack()}}>返回</a>

        </div>

      </div>
    )
  }
}

export default getRepair
