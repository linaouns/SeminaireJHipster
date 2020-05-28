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
import { getEntity, updateEntity, createEntity, reset } from './auteur.reducer';
import { IAuteur } from 'app/shared/model/auteur.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IAuteurUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const AuteurUpdate = (props: IAuteurUpdateProps) => {
  const [livreId, setLivreId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { auteurEntity, livres, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/auteur');
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
        ...auteurEntity,
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
          <h2 id="calBiblioApp.auteur.home.createOrEditLabel">
            <Translate contentKey="calBiblioApp.auteur.home.createOrEditLabel">Create or edit a Auteur</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : auteurEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="auteur-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="auteur-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="nomLabel" for="auteur-nom">
                  <Translate contentKey="calBiblioApp.auteur.nom">Nom</Translate>
                </Label>
                <AvField id="auteur-nom" type="text" name="nom" />
              </AvGroup>
              <AvGroup>
                <Label id="ageLabel" for="auteur-age">
                  <Translate contentKey="calBiblioApp.auteur.age">Age</Translate>
                </Label>
                <AvField id="auteur-age" type="string" className="form-control" name="age" />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/auteur" replace color="info">
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
  auteurEntity: storeState.auteur.entity,
  loading: storeState.auteur.loading,
  updating: storeState.auteur.updating,
  updateSuccess: storeState.auteur.updateSuccess,
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

export default connect(mapStateToProps, mapDispatchToProps)(AuteurUpdate);
