import React, {Component} from 'react'
import axios from 'axios'
import { Link, browserHistory } from 'react-router'

let Item = (params) =>
  <div className='weui_media_box weui_media_text'>
    <h4 className='weui_media_title'>{params.title}</h4>
    <p className="weui_media_desc">{params.message}</p>
    <ul className='weui_media_info'>
      <li className='weui_media_info_meta'>{new Date(params.createdAt).toLocaleDateString()}</li>
    </ul>


  </div>

class Notification extends Component {
  constructor () {
    super()
    this.state = {
      notifications: ''
    }
  }
  componentDidMount () {
    let that = this
    axios.get('/v1/api/notification').then(function (response) {
      if (response.data.status === 0) {
        that.setState({
          notifications: response.data.message
        })
      }
    })
  }

  render () {
    return (
      <div className='cell' >
        <div className="hd">
          <h1 className="page_title">小区通知</h1>
        </div>
        <div className='bd'>

          {
            Object.prototype.toString.call(this.state.notifications) === '[object Array]' ?
              this.state.notifications.map(function (notification, key) {
                return <Item {...notification} key={key} />
              }) : '暂无通知'
          }

        </div>

      </div>
    )
  }
}

export default Notification
