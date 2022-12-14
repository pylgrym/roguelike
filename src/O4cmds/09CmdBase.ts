import { Mob } from "O2model/09Mob";
import { GameIF } from "O3build/08GameIF";
import { CmdIF } from "./09CmdIF";

export abstract class CmdBase implements CmdIF {
  exc(): boolean { throw 'no exc'; }
  
  public turn():boolean { return this.exc(); }
  public raw():boolean  { return this.exc(); } 
  public npcTurn():boolean { return this.turn(); }

  constructor(public me:Mob, public g:GameIF){}
}
