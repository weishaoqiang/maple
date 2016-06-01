import React,{Component} from 'react'

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

            {
              this.props.role === 'resident' ? (
                <div>
                  <Item title='我要报修' path='notification/create' />
                  <Item title='我的报修' path='repair' />
                  <Item title='我要投诉' path='notification/complaint' />
                  <Item title='我的投诉' path='complaint' />
                </div>
                ) : (
                  <div>
                    <Item title='居民报修' path='repair' />
                    <Item title='居民投诉' path='complaint' />
                  </div>
                )
            }

          </div>

          <div className="weui_cells_title">用户相关</div>
          <div className='weui_cells'>
            {
              this.props.role === 'resident' ? (
                <div>
                  <Item title='居民信息' path='user_info' />
                  <Item title='修改密码' path='update_password' />
                </div>
              ) : (
                ''
              )
            }
            {
              this.props.role === 'system' ?
                <Item title='创建用户' path='create_user' />
                : ''
            }
            <Item title='退出登录' path='v1/api/signout' />
          </div>

        </div>

      </div>
    )
  }
}

export default Me
