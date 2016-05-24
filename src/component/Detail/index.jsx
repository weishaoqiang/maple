import React, {Component} from 'react'
import axios from 'axios'
import { Link,browserHistory } from 'react-router'

let Modify = (props) =>
  <div className="weui_dialog_alert" style={{display: props.display}}>
    <div className="weui_mask"></div>
    <div className="weui_dialog">
        <div className="weui_dialog_hd"><strong className="weui_dialog_title">{props.title}</strong></div>
        <div className="weui_dialog_bd">
          <input className='weui_input' type='text' defaultValue={props.content} style={{textAlign: 'center'}} autoFocus/>
        </div>
        <div className="weui_dialog_ft">
            <a href="javascript:;" className="weui_btn_dialog primary">确定</a>
        </div>
    </div>
  </div>

  let Item = (props) =>
    <a className='weui_cell' onClick={props.click} href='javascript:;'>
      <div className='weui_cell_bd weui_cell_primary'>
        <p>{props.title}</p>
      </div>
      <div className='weui_cell_ft'>{props.content}</div>
    </a>

class Detail extends Component {
  constructor () {
    super()
    this.state = {
      title: '',
      content: '',
      display: 'none',
      user: {}
    }
  }

  update () {
    let that = this
    axios.get('v1/api/user/getDetail').then(function(response) {
      let rs = response.data || {}
      rs.message = rs.message || {}
      let data = {
        真实姓名: rs.message.name || '请设置真实姓名',
        身份证: rs.message.identityCard || '请设置身份证',
        地址: rs.message.address || '请设置住址',
      }
      that.setState({
        user: data,
        display: 'none'
      })
    })
  }

  componentDidMount () {
    this.update()
  }

  showHandle (title, content) {
    let that = this;
    return function () {
      that.setState({
        display: 'block',
        title,
        content
      })
    }

  }

  handleChange (event) {
    this.setState({content: event.target.value})
  }

  submit () {
    let that = this
    let data = {
      真实姓名: 'name',
      身份证: 'identityCard',
      地址: 'address'
    }
    let value = this.state.content
    let param = data[this.state.title];
    axios.post('/v1/api/modify_user', {
      [param]: value
    }).then(function (response) {
      if (response.data.status === 0) {
        that.update()
      }
    })
  }

  render () {
    return (
      <div className='cell'>
        <div className="hd">
          <h1 className="page_title">用户详情</h1>
        </div>

        <div className='bd'>

          <div className='weui_cells'>

            {
              Object.keys(this.state.user).map((value, index) => {
                return(
                  <Item title={value} content={this.state.user[value]} click={this.showHandle(value, this.state.user[value])} key={ index } />
                )
              })
            }

          </div>
        </div>

        <div className="weui_dialog_alert" style={{display: this.state.display}} >
          <div className="weui_mask"></div>
          <div className="weui_dialog">
            <div className="weui_dialog_hd"><strong className="weui_dialog_title">{this.state.title}</strong></div>
            <div className="weui_dialog_bd">
              <input className='weui_input' type='text' value={this.state.content} onChange={this.handleChange.bind(this)} style={{textAlign: 'center'}} autoFocus={true} />
            </div>
            <div className="weui_dialog_ft">
                <a href="javascript:;" className="weui_btn_dialog primary" onClick={this.submit.bind(this)}>确定</a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Detail;
