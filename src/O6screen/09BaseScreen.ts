import { TermIF } from "O1term/03TermIF";
import { Stack } from "O1term/05ScreenStack";
import { StackIF } from "O1term/05ScreenStackIF";
import { SScreenIF } from "O1term/05SScreenIF";
import { DMapIF } from "O2model/07DMapIF";
import { DrawMap } from "O2model/07DrawMap";
import { Mob } from "O2model/09Mob";
import { TurnQ } from "O2model/09TurnQ";
import { GameIF } from "O3build/08GameIF";
import { MakerIF } from "./06ScreenMakerIF";

export class BaseScreen implements SScreenIF {
  name='base';
  constructor(public game:GameIF, public make:MakerIF){}
  draw(term:TermIF) { 
    DrawMap.drawMapPly(
      term, <DMapIF>this.game.curMap(), this.game.ply.pos, this.game
    ); 
    DrawMap.renderStats(term, this.game); // ch11
    DrawMap.renderMsg(term, this.game); // ch12
  }
  onKey(e:JQuery.KeyDownEvent, s:StackIF) {}
  npcTurns(s:StackIF) {
    let ply = <Mob> this.game.ply;
    let map = <DMapIF> this.game.curMap();
    let q = map.Q;
    var m:Mob;
    this.finishPlyTurn(q);
    for (m=q.next(); 
         !m.isPly && !this.over(s); 
         m=q.next()
    ) {
      this.npcTurn(m,ply);
    }
    this.handleMsgs(s); // ch12    
  }  
  over(s:StackIF):boolean { 
    let over = !this.game.ply.alive();
    if (over) {
      s.pop();
      s.push(this.make.gameOver());
    }
    return over;  
  }
  handleMsgs(s:StackIF) { // ch12
    if (!this.game.log) {return;}
    if (this.game.log.queuedMsgs()) {
      s.push(this.make.more(this.game)); //new MoreScreen(this.game, this.make));
    }
  }

  // ch24
  tickBuffs(m: Mob) {
    if (!m.buffs) { return; }
    m.buffs.ticks(m,this.game);
  }
  finishTurn(m: Mob) {
    this.tickBuffs(m);
  }
    npcTurn(m:Mob, ply:Mob) { 
    let ai = this.game.ai; // ch10
    if (ai) { ai.turn(m,ply,this.game); }  
    this.finishTurn(m);
  }
  finishPlyTurn(q:TurnQ) {
    let ply = q.curMob();
    if (!ply.isPly) { throw `${ply.name} not ply?'`; }
    this.finishTurn(ply);
    if (this.game.autoHeal) {
      this.game.autoHeal.turn(ply, this.game);
    }
  }  
  
  pop_And_RunNPCLoop(s:Stack) { // ch22
    s.pop();
    this.npcTurns(s); 
  }
}
