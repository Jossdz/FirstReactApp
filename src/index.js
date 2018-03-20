import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Header from './components/Header';
import Routes from './containers/Routes'

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <div>
    <Header/>
    <br/>
    <Routes/>
  </div>
, document.getElementById('root'));
registerServiceWorker();
