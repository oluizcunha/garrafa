import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from '../pages/Home';
import AddClassifieds from '../pages/Add';

function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/add" component={AddClassifieds} />
      </Switch>
    </Router>
  );
}

export default Routes;
