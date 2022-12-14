import { CmdIF } from "./09CmdIF";
import { Mob } from "O2model/09Mob";
import { GameIF } from "O3build/08GameIF";
import { WPoint } from "O2model/07WPoint";

export abstract class CmdBase implements CmdIF {
  exc(): boolean { throw 'no exc'; }
  constructor(public me:Mob, public g:GameIF){}
  
  public turn():boolean { return this.exc(); }
  public raw():boolean  { return this.exc(); } 
  public npcTurn():boolean { return this.turn(); }

  setDir(dir: WPoint):CmdIF {throw 'no setDir';} // ch15
}
