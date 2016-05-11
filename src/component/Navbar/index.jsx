import React, {Component} from 'react'
import { Link, browserHistory } from 'react-router'
import getCookie from '../../common/getCookie'
import './index.css'
class Navbar extends Component {
  constructor () {
    super();
  }

  render () {
    return (
      <nav>
        <ul>
          <li class='nav-list'>
            <a href='javascript: void 0'>用户相关</a>
            <ul>
              <li><Link to='/createUser'>{this.props.username}</Link></li>
            </ul>
          </li>
        </ul>
      </nav>
    )
  }
}

export default Navbar;
