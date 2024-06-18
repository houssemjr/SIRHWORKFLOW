import { Motif } from "../services/motif.service";
import { UserDTO } from "./userDTO";

export interface Leave {
  message:string;
  leaveType: string;
  startDate:Date;
  endDate:Date;
  user?: UserDTO; 
  idEmployee:string;
  processInstanceId:string;
  id:number 
  motifleave: Motif;
  state:Boolean;


}