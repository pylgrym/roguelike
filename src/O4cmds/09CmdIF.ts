import { Mob } from "O2model/09Mob";
import { GameIF } from "O3build/08GameIF";

export interface CmdIF { 
  exc():boolean; 
  me:Mob;
  g:GameIF;
}
