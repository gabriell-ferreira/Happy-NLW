import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Landing from './screens/Landing';
import OrphanagesMap from './screens/OrphanagesMap';
import Orphanage from './screens/Orphanage';
import CreateOrphanage from './screens/CreateOrphanage';
import OrphanageCreated from './screens/OrphanageCreated';

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={Landing} />
        <Route path='/app' exact component={OrphanagesMap}/>

        <Route path='/orphanages/create' exact component={CreateOrphanage} />
        <Route path='/orphanages/:id' exact component={Orphanage}/>
        <Route path='/created' exact component={OrphanageCreated}/> 

      </Switch>
    </BrowserRouter>
  );
}

export default Routes;