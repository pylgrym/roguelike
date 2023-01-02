import { Colors } from "O3build/29Colors";
import { Spell } from "O4cmds/29Spell";
import { Glyph } from "./07Glyph";
import { Slot } from "./21Slot";

export class Obj {
  level:number=0;
  charges:number=0;// ch28
  constructor(public g:Glyph, // ch29
              public slot:Slot,
              public spell:Spell=Spell.None)
               {}
  desc():string { 
    let label = this.name();
    if (this.spell != Spell.None) { // ch29
      let quality = Colors.c[this.spell][1];
      //let quality = Spell[this.spell];
      return `${quality} ${label}`;  
    }
    return `${label}${this.level}`; 
  }
  name():string { return Glyph[this.g]; } 
}
