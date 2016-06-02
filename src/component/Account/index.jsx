import React, {Component} from 'react'
import axios from 'axios'
import { Link,browserHistory } from 'react-router'

function topUpAmount (id) {
  axios.post('/v1/api/top_up_amount', {
    id
  }).then(function (response) {
    if (response.data.status === 1) {

    }
  })
}

let Item = (props) =>
{
  return (
    <div className="weui_media_box weui_media_text" style={{display: 'block'}}>
        <h4 className="weui_media_title">{props.uid && props.uid.name}</h4>
        <ul className='weui_media_info'>
          <li className='weui_media_info_meta'>余额: {props.amount}</li>
          <li className='weui_media_info_meta'>水费:{props.water}</li>
          <li className='weui_media_info_meta'>电费:{props.energy}</li>
        </ul>
        <ul className='weui_media_info'>
          <li className='weui_media_info_meta'>
            <a href="javascript:;"
              className="weui_btn weui_btn_mini weui_btn_primary"
              onClick={props.click}
            >
              充值
            </a>
            <a href="javascript:;" className="weui_btn weui_btn_mini weui_btn_primary">缴费</a>
          </li>
        </ul>
    </div>
  )
}

class Account extends Component {
  constructor () {
    super()
    this.state = {
      users: '',
      index: '',
      icon: '',
      warning: '',
      search: '',
      content: 100,
      display: 'none',
    }
  }

  componentDidMount () {
    this.getDate()
  }

  showHandle (index) {
    let that = this;
    return function () {
      that.setState({
        display: 'block',
        index
      })
    }
  }

  getDate () {
    var that = this;
    console.log('sddddd');
    axios.get('/v1/api/get_user_list').then(function (response) {
      console.log('========');
      console.log(response);
      that.setState({
        users: response.data.message,
        display: 'none'
      })
    })
  }

  topUpAmount () {
    let that = this
    let uid = that.state.users[that.state.index].uid._id
    console.log('sss');
    axios.post('/v1/api/top_up_amount', {
      uid,
      amount: that.state.content
    }).then(function (response) {
      console.log(response);
      if (response.data.status === 1) {
        that.setState({
          warning: response.data.messge
        })
      } else {
        that.getDate()
      }
    })
  }

  onchange () {
    this.setState({
      search: this.refs.search.value
    })
  }

  handleChange (event) {
    this.setState({content: event.target.value})
  }

  render () {
    let display = this.state.display
    var that = this
    return (
      <div className='cell' >
        <div className="hd">
          <h1 className="page_title">用户列表</h1>
        </div>

        <div className='bd'>

          <div className='weui_search_bar weui_search_focusing' id='search'>
            <form className="weui_search_outer">
              <div className="weui_search_inner">
                <i className="weui_icon_search"></i>
                <input type="text" className="weui_search_input" placeholder="搜索" ref='search'
                  onChange={that.onchange.bind(that)}
                />
              </div>
              <label for="search_input" className="weui_search_text">
                <i className="weui_icon_search"></i>
                <span>搜索</span>
              </label>
            </form>
          </div>

          {
            Object.prototype.toString.call(this.state.users) === '[object Array]' ?
              this.state.users.map(function (user, key) {
                if (user.uid) {
                  if (user.uid.email.includes(that.state.search)
                  || user.uid.username.includes(that.state.search)
                  || user.uid.name.includes(that.state.search)) {
                    return <Item {...user} key={key} click={that.showHandle(key)} />
                  }
                }
              }) : '暂无通知'
          }

        </div>

        <div className="weui_dialog_alert" style={{display: this.state.display}} >
          <div className="weui_mask"></div>
          <div className="weui_dialog">
            <div className="weui_dialog_hd"><strong className="weui_dialog_title">用户充值</strong></div>
            <div className="weui_dialog_bd">
              {this.state.warning}
              <input className='weui_input' type='text' value={this.state.content} onChange={this.handleChange.bind(this)} style={{textAlign: 'center'}} autoFocus={true} />
            </div>
            <div className="weui_dialog_ft">
                <a href="javascript:;" className="weui_btn_dialog primary" onClick={that.topUpAmount.bind(that)}>确定</a>
            </div>
          </div>
        </div>

      </div>
    )
  }
}

export default Account;
