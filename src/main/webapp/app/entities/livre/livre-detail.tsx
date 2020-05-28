import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './livre.reducer';
import { ILivre } from 'app/shared/model/livre.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ILivreDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const LivreDetail = (props: ILivreDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { livreEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="calBiblioApp.livre.detail.title">Livre</Translate> [<b>{livreEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="iSBN">
              <Translate contentKey="calBiblioApp.livre.iSBN">I SBN</Translate>
            </span>
          </dt>
          <dd>{livreEntity.iSBN}</dd>
          <dt>
            <span id="nom">
              <Translate contentKey="calBiblioApp.livre.nom">Nom</Translate>
            </span>
          </dt>
          <dd>{livreEntity.nom}</dd>
          <dt>
            <span id="maisonEdition">
              <Translate contentKey="calBiblioApp.livre.maisonEdition">Maison Edition</Translate>
            </span>
          </dt>
          <dd>{livreEntity.maisonEdition}</dd>
          <dt>
            <Translate contentKey="calBiblioApp.livre.empruntePar">Emprunte Par</Translate>
          </dt>
          <dd>{livreEntity.empruntePar ? livreEntity.empruntePar.login : ''}</dd>
          <dt>
            <Translate contentKey="calBiblioApp.livre.auteur">Auteur</Translate>
          </dt>
          <dd>
            {livreEntity.auteurs
              ? livreEntity.auteurs.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.id}</a>
                    {livreEntity.auteurs && i === livreEntity.auteurs.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
        </dl>
        <Button tag={Link} to="/livre" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/livre/${livreEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ livre }: IRootState) => ({
  livreEntity: livre.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(LivreDetail);
