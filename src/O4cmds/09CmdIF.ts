import { WPoint } from "O2model/07WPoint";

export interface CmdIF { 
  exc():boolean; 
  setDir(dir: WPoint):CmdIF; //ch15
}
