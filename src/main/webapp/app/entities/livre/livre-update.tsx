import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IUser } from 'app/shared/model/user.model';
import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { IAuteur } from 'app/shared/model/auteur.model';
import { getEntities as getAuteurs } from 'app/entities/auteur/auteur.reducer';
import { ILivreDetails } from 'app/shared/model/livre-details.model';
import { getEntities as getLivreDetails } from 'app/entities/livre-details/livre-details.reducer';
import { getEntity, updateEntity, createEntity, reset } from './livre.reducer';
import { ILivre } from 'app/shared/model/livre.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ILivreUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const LivreUpdate = (props: ILivreUpdateProps) => {
  const [idsauteur, setIdsauteur] = useState([]);
  const [emprunteParId, setEmprunteParId] = useState('0');
  const [detailsId, setDetailsId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { livreEntity, users, auteurs, livreDetails, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/livre' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getUsers();
    props.getAuteurs();
    props.getLivreDetails();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...livreEntity,
        ...values,
        auteurs: mapIdList(values.auteurs),
      };
      entity.user = values.user;

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
          <h2 id="calBiblioApp.livre.home.createOrEditLabel">
            <Translate contentKey="calBiblioApp.livre.home.createOrEditLabel">Create or edit a Livre</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : livreEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="livre-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="livre-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="iSBNLabel" for="livre-iSBN">
                  <Translate contentKey="calBiblioApp.livre.iSBN">I SBN</Translate>
                </Label>
                <AvField id="livre-iSBN" type="text" name="iSBN" />
              </AvGroup>
              <AvGroup>
                <Label id="nomLabel" for="livre-nom">
                  <Translate contentKey="calBiblioApp.livre.nom">Nom</Translate>
                </Label>
                <AvField id="livre-nom" type="text" name="nom" />
              </AvGroup>
              <AvGroup>
                <Label id="maisonEditionLabel" for="livre-maisonEdition">
                  <Translate contentKey="calBiblioApp.livre.maisonEdition">Maison Edition</Translate>
                </Label>
                <AvField id="livre-maisonEdition" type="text" name="maisonEdition" />
              </AvGroup>
              <AvGroup>
                <Label for="livre-empruntePar">
                  <Translate contentKey="calBiblioApp.livre.empruntePar">Emprunte Par</Translate>
                </Label>
                <AvInput id="livre-empruntePar" type="select" className="form-control" name="empruntePar.id">
                  <option value="" key="0" />
                  {users
                    ? users.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.login}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="livre-auteur">
                  <Translate contentKey="calBiblioApp.livre.auteur">Auteur</Translate>
                </Label>
                <AvInput
                  id="livre-auteur"
                  type="select"
                  multiple
                  className="form-control"
                  name="auteurs"
                  value={livreEntity.auteurs && livreEntity.auteurs.map(e => e.id)}
                >
                  <option value="" key="0" />
                  {auteurs
                    ? auteurs.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/livre" replace color="info">
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
  users: storeState.userManagement.users,
  auteurs: storeState.auteur.entities,
  livreDetails: storeState.livreDetails.entities,
  livreEntity: storeState.livre.entity,
  loading: storeState.livre.loading,
  updating: storeState.livre.updating,
  updateSuccess: storeState.livre.updateSuccess,
});

const mapDispatchToProps = {
  getUsers,
  getAuteurs,
  getLivreDetails,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(LivreUpdate);
