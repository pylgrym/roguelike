import { Mob } from "O2model/09Mob";
import { GameIF } from "O3build/08GameIF";
import { CmdIF } from "./09CmdIF";

export abstract class CmdBase implements CmdIF {
  exc(): boolean { throw 'no exc'; }

  constructor(public me:Mob, public g:GameIF){}
}
