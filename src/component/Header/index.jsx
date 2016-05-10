import React, {Component} from 'react';
import { Link, browserHistory } from 'react-router'

class Header extends Component {
  constructor () {
    super();
  }

  render () {
    return (
      <header className='header maple-flex'>
        <div className='maple-header maple-iterm'>
          <a href='javascript:void 0;'>
            小区管理系统
          </a>
        </div>
        <div className='maple-user maple-iterm'>
          <a href='javascript:void 0;'>
            {this.props.username}
          </a>
          <i className='fa fa-angle-down maple-icon'></i>
          <div className='maple-user-show'>
            <ul>
              <li>
                <i className='fa fa-user'></i>
                <Link to='/update_password'>&nbsp;&nbsp;&nbsp;修改密码</Link>
              </li>
              <li>
                <i className='fa fa-sign-out'></i>
                <a href='/v1/api/signout'>
                    &nbsp;&nbsp;&nbsp;注销
                </a>
              </li>
            </ul>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
