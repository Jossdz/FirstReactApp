import React from 'react';
import { 
  Route,
  BrowserRouter
} from 'react-router-dom';

import Home from './Home';
import Articles from './Articles';

export default function Routes(){
  return(
    <BrowserRouter>
    <div>
      <Route exact component={Home} path="/"></Route>
      <Route component={ Articles } path="/articles/:source_id"></Route>
    </div>
  </BrowserRouter>
  )
}