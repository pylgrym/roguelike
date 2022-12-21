import { Mob } from "O2model/09Mob";
import { GameIF } from "O3build/08GameIF";
import { WPoint } from "O2model/07WPoint";
import { CostIF } from "./28CostIF";

export interface CmdIF { 
  exc():boolean; 

  turn():boolean;   // as a turn. 
  raw():boolean;    // in composing.
  npcTurn():boolean;// as a turn.    
  
  me:Mob;
  g:GameIF;
  setDir(dir: WPoint):CmdIF; //ch15

  cost:CostIF|undefined; // ch28
  setCost(cost:CostIF|undefined):void;
}
