import { WPoint } from "O2model/07WPoint";
import { Mob } from "O2model/09Mob";
import { Buff } from "O2model/24BuffEnum";
import { GameIF } from "O3build/08GameIF";
import { CmdIF } from "./09CmdIF";
import { Able } from "./25Able";
import { Act } from "./25Act";

export abstract class CmdBase implements CmdIF {
  // ch25:
  m:Mob|undefined = undefined;
  g:GameIF|undefined = undefined;
  act:Act = Act.Act; // (default is other than hit and move.)

  exc(): boolean { throw 'no exc'; }
  setDir(dir: WPoint):CmdIF {throw 'no setDir';} // ch15


  public turn():boolean {
    let r = this.able(
      <Mob>this.m,<GameIF>this.g,this.act
    );  
    if (!r.able) { return r.turn; }
    return this.exc(); 
  }
  able(m:Mob, g:GameIF,act:Act):Able {
    let cant = {able:false,turn:false};
    let foil = {able:false,turn:true};
    let able = {able:true, turn:false};
    //..
    return able; // nothing blocked us.
  } 
  
  afraid(me:Mob, g:GameIF):boolean {
    let afraid = me.is(Buff.Afraid); 
    if (afraid && me.isPly) {
      g.flash('Ply is afraid!');
    } // you are too afraid to hit.
    return afraid;
  }  
}
