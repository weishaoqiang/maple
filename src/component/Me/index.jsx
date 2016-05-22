import React, {Component} from 'react'
import axios from 'axios'
import { Link,browserHistory } from 'react-router'

const Item = (props) =>
  <a href={props.path} >
    <div className="weui_cell" style={{borderTop:'1px solid #D9D9D9'}}>
      <div className="weui_cell_hd">
        <img src='' />
      </div>
      <div className="weui_cell_bd weui_cell_primary">
        <p style={{color: 'rgba(34,95,186,.6)'}}>{props.title}</p>
      </div>
    </div>
  </a>

class Me extends Component {

  render () {
    return (
      <div className='cell' >
        <div className="hd">
          <h1 className="page_title">个人中心</h1>
        </div>

        <div className='bd'>

          <div className="weui_cells_title">生活相关</div>
          <div className='weui_cells'>
            <Item title='我要报修' />
            <Item title='我的报修' />
          </div>

          <div className="weui_cells_title">用户相关</div>
          <div className='weui_cells'>
            <Item title='居民信息' path='user_info' />
            <Item title='修改密码' path='update_password ' />
            <Item title='退出登录' path='v1/api/signout' />
          </div>

        </div>

      </div>
    )
  }
}

export default Me;
