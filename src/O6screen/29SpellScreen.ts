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
  itemMenu(pos:number, stack:Stack):void {}
  onKey(e:JQuery.KeyDownEvent,s:Stack):boolean  {
    let pos = this.char2pos(e.key); this.itemMenu(pos,s); 
    s.pop();
    return true; // if (pos >= 0) { } else { stack.pop(); }
  }
  draw(term:TermIF) { 
    term.txt(0,0,'Spells:','yellow','black'); 
    let pos=0;
    var o:Spell|string;
    for (o of Object.values(Spell)) {
      let c = this.pos2char(pos);
      term.txt(0,1+pos++, `${c} ${o}`, 'yellow', 'black'); 
    }
  }
}
