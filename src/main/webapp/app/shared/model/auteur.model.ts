import { ILivre } from 'app/shared/model/livre.model';

export interface IAuteur {
  id?: number;
  nom?: string;
  age?: number;
  livres?: ILivre[];
}

export const defaultValue: Readonly<IAuteur> = {};
