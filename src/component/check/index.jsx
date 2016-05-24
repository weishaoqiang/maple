import React, {Component} from 'react'
import axios from 'axios'
import { Link, browserHistory } from 'react-router'

let Item = (params) =>
  <div className='weui_media_box weui_media_text'>
    <h4 className='weui_media_title'>{params.title}</h4>
    <p className="weui_media_desc">{params.message}</p>
    <ul className='weui_media_info'>
      <li className='weui_media_info_meta'>{params.type}</li>
      <li className='weui_media_info_meta'>{params.amount}</li>
    </ul>


  </div>

class Check extends Component {
  constructor () {
    super()
    this.state = {
      checks: ''
    }
  }
  componentDidMount () {
    let that = this
    axios.get('/v1/api/check').then(function (response) {
      if (response.data.status === 0) {
        that.setState({
          checks: response.data.message
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
            Object.prototype.toString.call(this.state.checks) === '[object Array]' ?
              this.state.checks.map(function (check, key) {
                return <Item {...check} key={key} />
              }) : '暂无账单'
          }

        </div>

      </div>
    )
  }
}

export default Check;
