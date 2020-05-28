import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import LivreDetails from './livre-details';
import LivreDetailsDetail from './livre-details-detail';
import LivreDetailsUpdate from './livre-details-update';
import LivreDetailsDeleteDialog from './livre-details-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={LivreDetailsDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={LivreDetailsUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={LivreDetailsUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={LivreDetailsDetail} />
      <ErrorBoundaryRoute path={match.url} component={LivreDetails} />
    </Switch>
  </>
);

export default Routes;
