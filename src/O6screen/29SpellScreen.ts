import { TermIF } from "O1term/03TermIF";
import { StackIF } from "O1term/05ScreenStackIF";
import { SScreenIF } from "O1term/05SScreenIF";
import { GameIF } from "O3build/08GameIF";
import { CmdBase } from "O4cmds/09CmdBase";
import { CmdIF } from "O4cmds/09CmdIF";
import { CostIF } from "O4cmds/28CostIF";
import { Spell } from "O4cmds/29Spell";
import { SpellFinder } from "O4cmds/29SpellFinder";
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
      if (y>13) { y=top;x +=14; }
    }
  }
  onKey(e:JQuery.KeyDownEvent,s:StackIF):boolean  {
    this.game.log.clearQueue();
    s.pop();
    let pos = this.char2pos(e.key); this.itemMenu(pos,s); 
    return true;
  }
  itemMenu(pos:number, ss:StackIF):void {
      let s:Spell = pos;
      let label = Spell[s];
      if (!label) {return;}
      this.doSpell(s,ss);
  }
  doSpell(s:Spell, ss:StackIF) {
    let finder = new SpellFinder(this.game,ss,this.make); // what if HE pushes instead?
    let cost:CostIF|undefined = undefined;
    let spell:CmdIF|SScreenIF|null = finder.find(s,cost);
    if (spell == null) { return; }
    if (spell instanceof CmdBase) {
      if (spell.turn()) {
        this.npcTurns(ss); 
      }
    } else { // (it's a screen)
      ss.push(<SScreenIF> spell);
    }
  }
}
