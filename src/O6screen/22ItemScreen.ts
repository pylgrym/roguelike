import { TermIF } from "O1term/03TermIF";
import { Stack } from "O1term/05ScreenStack";
import { SScreenIF } from "O1term/05SScreenIF";
import { DMapIF } from "O2model/07DMapIF";
import { DrawMap } from "O2model/07DrawMap";
import { Obj } from "O2model/21Obj";
import { Bag } from "O2model/22Bag";
import { GameIF } from "O3build/08GameIF";
import { CmdBase } from "O4cmds/09CmdBase";
import { CmdIF } from "O4cmds/09CmdIF";
import { WearCmd } from "O4cmds/23WearCmd";
import { FindObjSpell } from "O4cmds/28FindObjSpell";
import { MakerIF } from "./06ScreenMakerIF";
import { BaseScreen } from "./09BaseScreen";

export class ItemScreen extends BaseScreen {
  name:string = 'item';
  worn:boolean; // ch23

  constructor(public obj:Obj, public ix:number, 
               game:GameIF, maker:MakerIF) { 
    super(game,maker); 
    this.worn = !!game.worn; // ch23
  } 

  draw(term:TermIF) { 
    // Remove prev menu:
    super.draw(term); 
    let fg = 'lightblue', bg='#025';
    let y=1;
    term.txt(0,y++, 
     `Do what with ${this.obj.desc()} ?`,
      fg,bg); 
    term.txt(0,y++,'d drop',  fg,bg);
    if (this.worn ) { // ch23
      term.txt(0,y++,'w wear',  fg,bg); 
    }
    term.txt(0,y++,'u use',   fg,bg); // ch28

    term.txt(0,y++,'t throw', fg,bg);
    DrawMap.renderMsg(term, this.game); 
  }   

  onKey(e:JQuery.KeyDownEvent, 
        s:Stack):boolean 
  {
    console.log('key:', e.key);
    switch (e.key) {
      case 'd': this.dropItem(s); break;
      case 'w': this.wear(s); break; // ch23
      case 'u': this.useItem(s); break; // ch28
      default: s.pop(); break;
    } 
    return true;
  }

  dropItem(ss:Stack) { 
    // This completes ply's turn, 
    // so execute command and return.
    if (this.dropBagItem()) {
        this.pop_And_RunNPCLoop(ss); 
    } // NPCs must do their turns now.
  }

  dropBagItem():boolean { 
    let game = this.game;
    let map = <DMapIF> game.curMap();      
    let ply = game.ply;
    let c = map.cell(ply.pos);
    if (c.hasObj()) {
      game.flash('No room to drop here.'); 
      return false; 
    }
    c.obj = this.obj;
    let bag = <Bag> game.bag;
    bag.removeIx(this.ix);
    game.msg(`Ply drops ${c.obj.name()}.`);
    return true;
  }
  
  // ch23
  wear(ss:Stack):boolean { 
    if (!this.worn) { return false; }
    let ok = new WearCmd(
      this.obj, this.ix, this.game
    ).turn(); 
    if (ok) { 
      this.pop_And_RunNPCLoop(ss); 
    }
    return ok;
  }

  // ch28
  useItem0(ss:Stack):void { 
    let g = this.game;
    let finder = new FindObjSpell(this.obj,this.ix,g,ss,this.make);
    let spell:CmdIF|null = <CmdIF> finder.find28();
    if (spell == null) { return; }
    ss.pop();
    if (spell) {
      if (spell.turn()) {
        this.npcTurns(ss); 
      }
    } 
  }

  useItem(ss:Stack):void { 
    let g = this.game;
    let finder = new FindObjSpell(this.obj,this.ix,g,ss,this.make);
    let spell:CmdIF|SScreenIF|null = finder.find29();
    if (spell == null) { return; }
    ss.pop(); 
    if (spell instanceof CmdBase) {
      if (spell.turn()) {
        this.npcTurns(ss); 
      }
    } else { // (it's a screen)
      ss.push(<SScreenIF> spell);
    }
  }
}
