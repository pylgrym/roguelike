import { TermIF } from "O1term/03TermIF";
import { Stack } from "O1term/05ScreenStack";
import { GameIF } from "O3build/08GameIF";
import { Spell } from "O4cmds/29Spell";
import { MakerIF } from "./06ScreenMakerIF";
import { BaseScreen } from "./09BaseScreen";

export class SpellScreen extends BaseScreen {  
  name:string = 'spell';     
  constructor(game:GameIF, maker:MakerIF) { super(game,maker); }    
  pos2char(pos:number) { return String.fromCharCode(65+pos); }
  char2pos(c:string) { let pos=c.charCodeAt(0)-'a'.charCodeAt(0); return pos; } //if (pos<0 || pos>=this.bag.len()) { pos = -1; }
  draw(term:TermIF) { 
    super.draw(term);
    term.txt(0,1,'Spells:','yellow','black');
    let top=1; 
    let y=top,x=0;
    for (let s:Spell=0; s<Spell.None; ++s) {
      let c = this.pos2char(s);
      let L = Spell[s];
      term.txt(x,1+y++, `${c} ${L}`, 'yellow', 'black'); 
      if (y>12) { y=top;x +=14; }
    }
  } //++o; of Object.values(Spell)
  onKey(e:JQuery.KeyDownEvent,s:Stack):boolean  {
    this.game.log.clearQueue();
    //s.pop();
    let pos = this.char2pos(e.key); this.itemMenu(pos,s); 
    return true; // if (pos >= 0) { } else { stack.pop(); }
  }
  itemMenu(pos:number, ss:Stack):void {
      let s:Spell = pos;
      let label = Spell[s];
      if (!label) { ss.pop(); return;}
      this.game.flash(label);
  }
}
