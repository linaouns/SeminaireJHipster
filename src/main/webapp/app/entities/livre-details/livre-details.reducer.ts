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

import { ILivreDetails, defaultValue } from 'app/shared/model/livre-details.model';

export const ACTION_TYPES = {
  FETCH_LIVREDETAILS_LIST: 'livreDetails/FETCH_LIVREDETAILS_LIST',
  FETCH_LIVREDETAILS: 'livreDetails/FETCH_LIVREDETAILS',
  CREATE_LIVREDETAILS: 'livreDetails/CREATE_LIVREDETAILS',
  UPDATE_LIVREDETAILS: 'livreDetails/UPDATE_LIVREDETAILS',
  DELETE_LIVREDETAILS: 'livreDetails/DELETE_LIVREDETAILS',
  RESET: 'livreDetails/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ILivreDetails>,
  entity: defaultValue,
  links: { next: 0 },
  updating: false,
  totalItems: 0,
  updateSuccess: false,
};

export type LivreDetailsState = Readonly<typeof initialState>;

// Reducer

export default (state: LivreDetailsState = initialState, action): LivreDetailsState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_LIVREDETAILS_LIST):
    case REQUEST(ACTION_TYPES.FETCH_LIVREDETAILS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_LIVREDETAILS):
    case REQUEST(ACTION_TYPES.UPDATE_LIVREDETAILS):
    case REQUEST(ACTION_TYPES.DELETE_LIVREDETAILS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_LIVREDETAILS_LIST):
    case FAILURE(ACTION_TYPES.FETCH_LIVREDETAILS):
    case FAILURE(ACTION_TYPES.CREATE_LIVREDETAILS):
    case FAILURE(ACTION_TYPES.UPDATE_LIVREDETAILS):
    case FAILURE(ACTION_TYPES.DELETE_LIVREDETAILS):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_LIVREDETAILS_LIST): {
      const links = parseHeaderForLinks(action.payload.headers.link);

      return {
        ...state,
        loading: false,
        links,
        entities: loadMoreDataWhenScrolled(state.entities, action.payload.data, links),
        totalItems: parseInt(action.payload.headers['x-total-count'], 10),
      };
    }
    case SUCCESS(ACTION_TYPES.FETCH_LIVREDETAILS):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_LIVREDETAILS):
    case SUCCESS(ACTION_TYPES.UPDATE_LIVREDETAILS):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_LIVREDETAILS):
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

const apiUrl = 'api/livre-details';

// Actions

export const getEntities: ICrudGetAllAction<ILivreDetails> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_LIVREDETAILS_LIST,
    payload: axios.get<ILivreDetails>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`),
  };
};

export const getEntity: ICrudGetAction<ILivreDetails> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_LIVREDETAILS,
    payload: axios.get<ILivreDetails>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<ILivreDetails> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_LIVREDETAILS,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const updateEntity: ICrudPutAction<ILivreDetails> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_LIVREDETAILS,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<ILivreDetails> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_LIVREDETAILS,
    payload: axios.delete(requestUrl),
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
