import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ILivre, defaultValue } from 'app/shared/model/livre.model';

export const ACTION_TYPES = {
  FETCH_LIVRE_LIST: 'livre/FETCH_LIVRE_LIST',
  FETCH_LIVRE: 'livre/FETCH_LIVRE',
  CREATE_LIVRE: 'livre/CREATE_LIVRE',
  UPDATE_LIVRE: 'livre/UPDATE_LIVRE',
  DELETE_LIVRE: 'livre/DELETE_LIVRE',
  RESET: 'livre/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ILivre>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false,
};

export type LivreState = Readonly<typeof initialState>;

// Reducer

export default (state: LivreState = initialState, action): LivreState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_LIVRE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_LIVRE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_LIVRE):
    case REQUEST(ACTION_TYPES.UPDATE_LIVRE):
    case REQUEST(ACTION_TYPES.DELETE_LIVRE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_LIVRE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_LIVRE):
    case FAILURE(ACTION_TYPES.CREATE_LIVRE):
    case FAILURE(ACTION_TYPES.UPDATE_LIVRE):
    case FAILURE(ACTION_TYPES.DELETE_LIVRE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_LIVRE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10),
      };
    case SUCCESS(ACTION_TYPES.FETCH_LIVRE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_LIVRE):
    case SUCCESS(ACTION_TYPES.UPDATE_LIVRE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_LIVRE):
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

const apiUrl = 'api/livres';

// Actions

export const getEntities: ICrudGetAllAction<ILivre> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_LIVRE_LIST,
    payload: axios.get<ILivre>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`),
  };
};

export const getEntity: ICrudGetAction<ILivre> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_LIVRE,
    payload: axios.get<ILivre>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<ILivre> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_LIVRE,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ILivre> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_LIVRE,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<ILivre> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_LIVRE,
    payload: axios.delete(requestUrl),
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
