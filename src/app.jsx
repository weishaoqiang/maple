import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import Header from './component/Header';
import 'normalize.css/normalize.css';
import './public/stylesheet/style.css';
class App extends Component {
  constructor () {
    super();
    this.state = {
      user: {
        name:'Maple',
        role: 'system',
        token: ''
      }
    };
  }

  render () {
    return (
      <div class='flex-body'>
        <Header className='header' {...this.state} />
        <div class='maple-container'>

        </div>
      </div>
    );
  }
}


ReactDOM.render(<App />, document.getElementById('app'));
