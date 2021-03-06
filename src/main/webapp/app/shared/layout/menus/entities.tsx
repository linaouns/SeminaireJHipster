import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Translate, translate } from 'react-jhipster';
import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from './menu-components';

export const EntitiesMenu = ({ isAdmin }) => (
  <NavDropdown
    icon="th-list"
    name={translate('global.menu.entities.main')}
    id="entity-menu"
    style={{ maxHeight: '80vh', overflow: 'auto' }}
  >
    <MenuItem icon="asterisk" to="/livre">
      <Translate contentKey="global.menu.entities.livre" />
    </MenuItem>
    {isAdmin && (
      <MenuItem icon="asterisk" to="/livre-details">
        <Translate contentKey="global.menu.entities.livreDetails" />
      </MenuItem>
    )}
    <MenuItem icon="asterisk" to="/auteur">
      <Translate contentKey="global.menu.entities.auteur" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/livre-details">
      <Translate contentKey="global.menu.entities.livreDetails" />
    </MenuItem>
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);
