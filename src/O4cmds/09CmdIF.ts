import { Mob } from "O2model/09Mob";
import { GameIF } from "O3build/08GameIF";

export interface CmdIF { 
  exc():boolean; 

  turn():boolean;   // as a turn. 
  raw():boolean;    // in composing.
  npcTurn():boolean;// as a turn.    
  
  me:Mob;
  g:GameIF;
}
