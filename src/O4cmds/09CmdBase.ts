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

    let hit = (act == Act.Hit);
    let mov = (act == Act.Move);
    let HOM = (hit || mov);
    if (hit && this.afraid(m,g))  { return cant; }
    if (hit && this.charmed(m,g)) { return cant; }
    if (mov && this.rooted(m,g))  { return cant; } 
    if (HOM && this.levitate(m,g)){ return cant; }

    if (this.paralyzed(m,g))      { return foil; }
    if (this.asleep(m,g))         { return foil; }
    if (this.slow(m,g))           { return foil; }    
    if (this.freeze(m,g,mov))     { return foil; } 
    return able; // nothing blocked us.
  } 
  
  afraid(me:Mob, g:GameIF):boolean {
    let afraid = me.is(Buff.Afraid); 
    if (afraid && me.isPly) {
      g.flash('Ply is afraid!');
    } // you are too afraid to hit.
    return afraid;
  }  
  charmed(me:Mob, g:GameIF):boolean {
    let charmed = me.is(Buff.Charm); 
    if (charmed && me.isPly) {
      g.flash("It's too cute!");
    } // you are too charmed to attack it.
    return charmed;
  }
  rooted(me:Mob, g:GameIF):boolean {
    let rooted = me.is(Buff.Root); 
    if (rooted && me.isPly) {
      g.flash('Ply is rooted!');
    } 
    return rooted;
  }
  levitate(me:Mob, g:GameIF):boolean {
    let levitate = me.is(Buff.Levitate); 
    if (levitate && me.isPly) {
      g.flash("Ply levitates!");
    } // you cannot reach/get down.
    return levitate;
  }
  paralyzed(me:Mob, g:GameIF):boolean {
    if (!me.is(Buff.Paralyze)) { return false; }
    let rate=0;
    switch (this.act) {
      case Act.Move: rate=33;break;
      case Act.Hit:  rate=25;break;
      case Act.Act:  rate=20;break;
    }
    let paralyzed = !g.rnd.pct(rate);
    if (paralyzed) { 
      if (me.isPly) { g.flash('ply paralyzed!'); } 
    } else { // allowed an action.
      let buff = me.buffs.get(Buff.Paralyze);
      buff!.time -= g.rnd.rndC(1,2);
    }
    return paralyzed; 
  }  
  asleep(me:Mob, g:GameIF):boolean { // 7
    if (!me.is(Buff.Sleep)) { return false; }    
    if (me.isPly) { g.flash('ply sleeps!'); } 
    return true;
  } 
  slow(me:Mob, g:GameIF):boolean {
    if (!me.is(Buff.Slow)) { return false; }
    if (g.rnd.oneIn(2)) { return false; }
    if (me.isPly) { g.flash('ply slows!'); } 
    return true;
  }
  freeze(me:Mob, g:GameIF, move:boolean):boolean {
    if (!me.is(Buff.Freeze)) { return false; }    
    if (g.rnd.oneIn(2)) { return false; }
    if (me.isPly) { g.flash('ply is frozen!'); }     
    return true;
  }

}
