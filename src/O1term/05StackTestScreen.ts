import { TermIF } from "./03TermIF";
import { TestTerm } from "./03TestTerm";
import { StackIF } from "./05ScreenStackIF";
import { SScreenIF } from "./05SScreenIF";

export class StackTestScreen implements SScreenIF {
  name='test2';
  onKey(e:JQuery.KeyDownEvent, s:StackIF){}
  draw(term:TermIF) { TestTerm.test2(term,'-'); }
}
