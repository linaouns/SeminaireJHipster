import { IUser } from 'app/shared/model/user.model';
import { IAuteur } from 'app/shared/model/auteur.model';
import { ILivreDetails } from 'app/shared/model/livre-details.model';

export interface ILivre {
  id?: number;
  iSBN?: string;
  nom?: string;
  maisonEdition?: string;
  empruntePar?: IUser;
  auteurs?: IAuteur[];
  details?: ILivreDetails;
}

export const defaultValue: Readonly<ILivre> = {};
