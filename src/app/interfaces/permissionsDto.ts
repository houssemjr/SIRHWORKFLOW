export interface PermissDto {
    taskId: any;
    motif: string;
    datepermission: Date;
    message: string;
    IdEmployee: string;
    nombreheures:number;
    user: {
      lastname: string;
      username: string;
    };
  }
  