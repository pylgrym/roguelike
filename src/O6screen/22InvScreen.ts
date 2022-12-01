import { TermIF } from "O1term/03TermIF";
import { Stack } from "O1term/05ScreenStack";
import { Obj } from "O2model/21Obj";
import { Bag } from "O2model/22Bag";
import { GameIF } from "O3build/08GameIF";
import { MakerIF } from "./06ScreenMakerIF";
import { BaseScreen } from "./09BaseScreen";
import { ItemScreen } from "./22ItemScreen";

export class InvScreen extends BaseScreen {  
  name:string = 'inv';     
  bag:Bag;
  constructor(game:GameIF, maker:MakerIF) {  
    super(game,maker);
    this.bag = <Bag> game.bag; 
  }    
  pos2char(pos:number) { 
    return String.fromCharCode(65+pos); 
  }
  char2pos(c:string) { 
    let pos=c.charCodeAt(0)-'a'.charCodeAt(0);
    if (pos<0 || pos>=this.bag.len()) { 
        pos = -1; 
    }
    return pos; 
  }
  draw(term:TermIF) { 
    term.txt(0,0,'You carry','yellow','black'); 
    let pos=0;
    for (var o of this.bag.objs) {
      let c = this.pos2char(pos);
      term.txt(0,1+pos++, `${c} ${o.desc()}`,
               'yellow', 'black'); 
    }
  }
  onKey(e:JQuery.KeyDownEvent,
        stack:Stack):boolean 
  {
    let pos = this.char2pos(e.key); 
    if (pos >= 0) { 
      this.itemMenu(pos, stack); 
    } else {
      stack.pop();
    }
    return true;
  }
  itemMenu0(pos:number, stack:Stack) {
    //let item:Obj = this.bag.objs[pos];
    // (Will soon do something..)
  }
  itemMenu(pos: number, stack: Stack) {
    let item:Obj = this.bag.objs[pos];
    stack.pop();
    stack.push(
      new ItemScreen(item,pos,this.game,this.make)
    );      
  }

}
