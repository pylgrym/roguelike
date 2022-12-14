import { Mob } from "O2model/09Mob";
import { GameIF } from "O3build/08GameIF";
import { WPoint } from "O2model/07WPoint";

export interface CmdIF { 
  exc():boolean; 

  turn():boolean;   // as a turn. 
  raw():boolean;    // in composing.
  npcTurn():boolean;// as a turn.    
  
  me:Mob;
  g:GameIF;
  setDir(dir: WPoint):CmdIF; //ch15
}
