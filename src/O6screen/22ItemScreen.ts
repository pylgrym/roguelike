import { TermIF } from "O1term/03TermIF";
import { Stack } from "O1term/05ScreenStack";
import { DMapIF } from "O2model/07DMapIF";
import { DrawMap } from "O2model/07DrawMap";
import { Obj } from "O2model/21Obj";
import { Bag } from "O2model/22Bag";
import { GameIF } from "O3build/08GameIF";
import { MakerIF } from "./06ScreenMakerIF";
import { BaseScreen } from "./09BaseScreen";

export class ItemScreen extends BaseScreen {  
  name:string = 'item';     
  constructor(public obj:Obj, public ix:number, 
               game:GameIF, maker:MakerIF) { 
    super(game,maker); 
  } 

  draw(term:TermIF) { 
    // Remove prev menu:
    super.draw(term); 
    let fg = 'lightblue', bg='#025';

    let y=1;
    term.txt(0,y++, 
     `Do what with ${this.obj.desc()} ?`,
      fg,bg); 
    term.txt(0,y++,'u use',   fg,bg); 
    term.txt(0,y++,'d drop',  fg,bg); 
    term.txt(0,y++,'t throw', fg,bg); 
    term.txt(0,y++,'w wear',  fg,bg);         
    DrawMap.renderMsg(term, this.game); 
  }   

  onKey(e:JQuery.KeyDownEvent, 
        s:Stack):boolean 
  {
    console.log('key:', e.key);
    switch (e.key) {
      case 'd': this.dropItem(s); break;
      default: s.pop(); break;
    } 
    return true;
  }

  dropItem(ss:Stack) { 
    // This completes ply's turn, 
    // so execute command and return.
    if (this.dropBagItem()) {
      this. 
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
}