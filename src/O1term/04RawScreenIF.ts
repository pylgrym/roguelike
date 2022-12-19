import { TermIF } from "./03TermIF";

export interface RawScreenIF {
  draw(term:TermIF) :void;
  onKey(e:JQuery.KeyDownEvent) :void;
  onTime():boolean; // ch27
  name:string;
}
