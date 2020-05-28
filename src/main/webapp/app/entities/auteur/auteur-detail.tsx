import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './auteur.reducer';
import { IAuteur } from 'app/shared/model/auteur.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IAuteurDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const AuteurDetail = (props: IAuteurDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { auteurEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="calBiblioApp.auteur.detail.title">Auteur</Translate> [<b>{auteurEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="nom">
              <Translate contentKey="calBiblioApp.auteur.nom">Nom</Translate>
            </span>
          </dt>
          <dd>{auteurEntity.nom}</dd>
          <dt>
            <span id="age">
              <Translate contentKey="calBiblioApp.auteur.age">Age</Translate>
            </span>
          </dt>
          <dd>{auteurEntity.age}</dd>
        </dl>
        <Button tag={Link} to="/auteur" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/auteur/${auteurEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ auteur }: IRootState) => ({
  auteurEntity: auteur.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AuteurDetail);
