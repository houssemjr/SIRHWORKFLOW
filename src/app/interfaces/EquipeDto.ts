

export interface Equipe {

   titre :string;
   rattachement :string
   usersinfo:UserInfo[]
}

export interface UserInfo {
    id: number;
    nom: string;
    prenom: string;
  }