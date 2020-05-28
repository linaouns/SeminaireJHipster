import { Moment } from 'moment';
import { ILivre } from 'app/shared/model/livre.model';

export interface ILivreDetails {
  id?: number;
  dateCreation?: string;
  derniereDateEdition?: string;
  livre?: ILivre;
}

export const defaultValue: Readonly<ILivreDetails> = {};
