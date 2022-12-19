import { TermIF } from "./03TermIF";
import { EventMgr } from "./04EventMgr";
import { RawScreenIF } from "./04RawScreenIF";
import { StackIF } from "./05ScreenStackIF";
import { SScreenIF } from "./05SScreenIF";

export class Stack implements StackIF, RawScreenIF {
  name='stack';
  s:SScreenIF[] = [];
  pop(){ this.s.pop(); }
  push(screen:SScreenIF) { this.s.push(screen); }
  cur():SScreenIF { return this.s[this.s.length-1]; }
  draw(term:TermIF) {
    let s = this.cur();
    if (s) { s.draw(term); }     
  }  
  onKey(e:JQuery.KeyDownEvent) {
    let s = this.cur();
    if (s) { s.onKey(e,this); }
  }

  // ch27
  onTime():boolean {
    let change = false;
    let s = this.cur();
    if (s) { change = s.onTime(this); }
    return change;
  }

  static run_SScreen(sScreen:SScreenIF) {
    let stack = new Stack();
    stack.push(sScreen); 
    EventMgr.runRawScreen(stack);
  }//If you want to manually push a specific screen.
}
