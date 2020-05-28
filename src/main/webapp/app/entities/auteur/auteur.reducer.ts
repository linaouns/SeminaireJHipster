import axios from 'axios';
import {
  parseHeaderForLinks,
  loadMoreDataWhenScrolled,
  ICrudGetAction,
  ICrudGetAllAction,
  ICrudPutAction,
  ICrudDeleteAction,
} from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IAuteur, defaultValue } from 'app/shared/model/auteur.model';

export const ACTION_TYPES = {
  FETCH_AUTEUR_LIST: 'auteur/FETCH_AUTEUR_LIST',
  FETCH_AUTEUR: 'auteur/FETCH_AUTEUR',
  CREATE_AUTEUR: 'auteur/CREATE_AUTEUR',
  UPDATE_AUTEUR: 'auteur/UPDATE_AUTEUR',
  DELETE_AUTEUR: 'auteur/DELETE_AUTEUR',
  RESET: 'auteur/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IAuteur>,
  entity: defaultValue,
  links: { next: 0 },
  updating: false,
  totalItems: 0,
  updateSuccess: false,
};

export type AuteurState = Readonly<typeof initialState>;

// Reducer

export default (state: AuteurState = initialState, action): AuteurState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_AUTEUR_LIST):
    case REQUEST(ACTION_TYPES.FETCH_AUTEUR):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_AUTEUR):
    case REQUEST(ACTION_TYPES.UPDATE_AUTEUR):
    case REQUEST(ACTION_TYPES.DELETE_AUTEUR):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_AUTEUR_LIST):
    case FAILURE(ACTION_TYPES.FETCH_AUTEUR):
    case FAILURE(ACTION_TYPES.CREATE_AUTEUR):
    case FAILURE(ACTION_TYPES.UPDATE_AUTEUR):
    case FAILURE(ACTION_TYPES.DELETE_AUTEUR):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_AUTEUR_LIST): {
      const links = parseHeaderForLinks(action.payload.headers.link);

      return {
        ...state,
        loading: false,
        links,
        entities: loadMoreDataWhenScrolled(state.entities, action.payload.data, links),
        totalItems: parseInt(action.payload.headers['x-total-count'], 10),
      };
    }
    case SUCCESS(ACTION_TYPES.FETCH_AUTEUR):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_AUTEUR):
    case SUCCESS(ACTION_TYPES.UPDATE_AUTEUR):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_AUTEUR):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {},
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

const apiUrl = 'api/auteurs';

// Actions

export const getEntities: ICrudGetAllAction<IAuteur> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_AUTEUR_LIST,
    payload: axios.get<IAuteur>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`),
  };
};

export const getEntity: ICrudGetAction<IAuteur> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_AUTEUR,
    payload: axios.get<IAuteur>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IAuteur> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_AUTEUR,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const updateEntity: ICrudPutAction<IAuteur> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_AUTEUR,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IAuteur> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_AUTEUR,
    payload: axios.delete(requestUrl),
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
