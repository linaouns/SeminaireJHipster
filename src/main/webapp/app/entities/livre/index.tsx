import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Livre from './livre';
import LivreDetail from './livre-detail';
import LivreUpdate from './livre-update';
import LivreDeleteDialog from './livre-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={LivreDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={LivreUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={LivreUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={LivreDetail} />
      <ErrorBoundaryRoute path={match.url} component={Livre} />
    </Switch>
  </>
);

export default Routes;
