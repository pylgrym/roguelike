import { Glyph } from "./07Glyph";
import { Slot } from "./21Slot";

export class Obj {
  level:number=0;
  constructor(public g:Glyph, public slot:Slot) {}

  desc():string { 
    let label = this.name();
    return `${label}${this.level}`; 
  }
  name():string { return Glyph[this.g]; } 
}
