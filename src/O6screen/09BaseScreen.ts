import { TermIF } from "O1term/03TermIF";
import { StackIF } from "O1term/05ScreenStackIF";
import { SScreenIF } from "O1term/05SScreenIF";
import { DMapIF } from "O2model/07DMapIF";
import { DrawMap } from "O2model/07DrawMap";
import { Mob } from "O2model/09Mob";
import { GameIF } from "O3build/08GameIF";

export class BaseScreen implements SScreenIF {
  name='base';
  constructor(public game:GameIF, public make:MakerIF){}
  /*
  draw0(term:TermIF) { 
    DrawMap.drawMap0(
      term, <DMapIF> this.game.curMap(), new WPoint()
    );
  }
  */
  draw(term:TermIF) { 
    DrawMap.drawMapPly(
      term, <DMapIF>this.game.curMap(), this.game.ply.pos
    ); 
  }
  onKey(e:JQuery.KeyDownEvent, s:StackIF) {}
  npcTurns(s:StackIF) {
    let ply = <Mob> this.game.ply;
    let map = <DMapIF> this.game.curMap();
    let q = map.Q;
    var m:Mob;
    for (m=q.next(); 
         !m.isPly && !this.over(s); 
         m=q.next()
    ) {
      this.npcTurn(m,ply);
    }
  }  
  npcTurn(m:Mob, ply:Mob) {}
  over(s:StackIF):boolean { 
    let over = !this.game.ply.alive();
    if (over) {
      s.pop();
      s.push(this.make.gameOver());
    }
    return over;  
  }
}
