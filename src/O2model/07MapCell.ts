import { Glyph } from "./07Glyph";
import { Mob } from "./09Mob";

export class MapCell {
  constructor(public env:Glyph) {}  
  mob:Mob|undefined; // ch09
  glyph():Glyph {
    return this.mob ? this.mob.g : this.env; 
  }
  blocked():boolean {
    return (!!this.mob || this.opaque()); // ch15
  }
  opaque():boolean {  // ch15
    return (
         this.env == Glyph.Wall 
      || this.env == Glyph.Rock
      || this.env == Glyph.Door_Closed 
      );
  }  
}
