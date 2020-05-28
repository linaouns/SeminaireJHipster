import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ILivre } from 'app/shared/model/livre.model';
import { getEntities as getLivres } from 'app/entities/livre/livre.reducer';
import { getEntity, updateEntity, createEntity, reset } from './livre-details.reducer';
import { ILivreDetails } from 'app/shared/model/livre-details.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ILivreDetailsUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const LivreDetailsUpdate = (props: ILivreDetailsUpdateProps) => {
  const [livreId, setLivreId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { livreDetailsEntity, livres, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/livre-details');
  };

  useEffect(() => {
    if (!isNew) {
      props.getEntity(props.match.params.id);
    }

    props.getLivres();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...livreDetailsEntity,
        ...values,
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="calBiblioApp.livreDetails.home.createOrEditLabel">
            <Translate contentKey="calBiblioApp.livreDetails.home.createOrEditLabel">Create or edit a LivreDetails</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : livreDetailsEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="livre-details-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="livre-details-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="dateCreationLabel" for="livre-details-dateCreation">
                  <Translate contentKey="calBiblioApp.livreDetails.dateCreation">Date Creation</Translate>
                </Label>
                <AvField id="livre-details-dateCreation" type="date" className="form-control" name="dateCreation" />
              </AvGroup>
              <AvGroup>
                <Label id="derniereDateEditionLabel" for="livre-details-derniereDateEdition">
                  <Translate contentKey="calBiblioApp.livreDetails.derniereDateEdition">Derniere Date Edition</Translate>
                </Label>
                <AvField id="livre-details-derniereDateEdition" type="date" className="form-control" name="derniereDateEdition" />
              </AvGroup>
              <AvGroup>
                <Label for="livre-details-livre">
                  <Translate contentKey="calBiblioApp.livreDetails.livre">Livre</Translate>
                </Label>
                <AvInput id="livre-details-livre" type="select" className="form-control" name="livre.id">
                  <option value="" key="0" />
                  {livres
                    ? livres.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.nom}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/livre-details" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  livres: storeState.livre.entities,
  livreDetailsEntity: storeState.livreDetails.entity,
  loading: storeState.livreDetails.loading,
  updating: storeState.livreDetails.updating,
  updateSuccess: storeState.livreDetails.updateSuccess,
});

const mapDispatchToProps = {
  getLivres,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(LivreDetailsUpdate);
