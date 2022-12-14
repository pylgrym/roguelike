import { TermIF } from "O1term/03TermIF";
import { Stack } from "O1term/05ScreenStack";
import { DrawMap } from "O2model/07DrawMap";
import { Obj } from "O2model/21Obj";
import { Slot } from "O2model/21Slot";
import { Worn } from "O2model/23Worn";
import { GameIF } from "O3build/08GameIF";
import { UnequipCmd } from "O4cmds/23UnequipCmd";
import { MakerIF } from "./06ScreenMakerIF";
import { BaseScreen } from "./09BaseScreen";

export class WornScreen extends BaseScreen {  
    name:string = 'worn';     
    worn:Worn;
    constructor(game:GameIF, maker:MakerIF) {  
      super(game, maker);  
      this.worn = <Worn> game.worn; 
    }    
    slot2char(pos:Slot):string { 
        return String.fromCharCode(
            65+(pos-Slot.MainHand)
        ); 
    }
    char2slot(c:string):Slot { 
      let i:number = 
          (c.charCodeAt(0) - 'a'.charCodeAt(0)) 
          + Slot.MainHand;
      return i in Slot ? i as Slot : Slot.NotWorn;
    }
    draw(term:TermIF) { 
      // Consider drawing only the items we ARE wearing.
      // Caveat: Current display shows player 
      // what is POSSIBLE.
      let y:number=1;
      term.txt(0,y++, 'You are wearing:', 
               'yellow', 'black'); 
      for (let slot=Slot.MainHand; 
           slot<Slot.Last; 
           ++slot
      ) { 
        let c:string = this.slot2char(slot);
        let label:string = Slot[slot];

        let wi:Obj|undefined = this.worn.get(slot);
        let worn:string = (wi ? wi.desc() : '');
        let fg = (wi ? 'yellow' : 'darkgray'); 
        term.txt(0,y++, `${c} ${worn} (${label})`,
                 fg, 'black'); 
      }      
      DrawMap.renderMsg(term, this.game);  
    } 
    onKey(e:JQuery.KeyDownEvent,
          stack:Stack):boolean 
    {
      if (this.unequip( this.char2slot(e.key) )) {
        stack.pop();
      } 
      return true;
    } // how does cancel work here?
    unequip(slot:Slot):boolean { 
      return new UnequipCmd(slot,this.game).turn();
    }
  }
