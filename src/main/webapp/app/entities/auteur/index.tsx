import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Auteur from './auteur';
import AuteurDetail from './auteur-detail';
import AuteurUpdate from './auteur-update';
import AuteurDeleteDialog from './auteur-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={AuteurDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={AuteurUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={AuteurUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={AuteurDetail} />
      <ErrorBoundaryRoute path={match.url} component={Auteur} />
    </Switch>
  </>
);

export default Routes;
