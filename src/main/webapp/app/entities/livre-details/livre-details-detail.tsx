import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './livre-details.reducer';
import { ILivreDetails } from 'app/shared/model/livre-details.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ILivreDetailsDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const LivreDetailsDetail = (props: ILivreDetailsDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { livreDetailsEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="calBiblioApp.livreDetails.detail.title">LivreDetails</Translate> [<b>{livreDetailsEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="dateCreation">
              <Translate contentKey="calBiblioApp.livreDetails.dateCreation">Date Creation</Translate>
            </span>
          </dt>
          <dd>
            {livreDetailsEntity.dateCreation ? (
              <TextFormat value={livreDetailsEntity.dateCreation} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="derniereDateEdition">
              <Translate contentKey="calBiblioApp.livreDetails.derniereDateEdition">Derniere Date Edition</Translate>
            </span>
          </dt>
          <dd>
            {livreDetailsEntity.derniereDateEdition ? (
              <TextFormat value={livreDetailsEntity.derniereDateEdition} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <Translate contentKey="calBiblioApp.livreDetails.livre">Livre</Translate>
          </dt>
          <dd>{livreDetailsEntity.livre ? livreDetailsEntity.livre.nom : ''}</dd>
        </dl>
        <Button tag={Link} to="/livre-details" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/livre-details/${livreDetailsEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ livreDetails }: IRootState) => ({
  livreDetailsEntity: livreDetails.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(LivreDetailsDetail);
