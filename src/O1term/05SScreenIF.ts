import { TermIF } from "./03TermIF";
import { StackIF } from "./05ScreenStackIF";

export interface SScreenIF {
  draw(term:TermIF) :void;
  onKey(e:JQuery.KeyDownEvent, stack:StackIF) :void;
  onTime(stack: StackIF): boolean; // ch27
  name:string;
}
