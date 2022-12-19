import { Glyph } from "./07Glyph";
import { Mob } from "./09Mob";
import { Obj } from "./21Obj";

export class MapCell {
  constructor(public env:Glyph) {}  
  mob:Mob|undefined; // ch09
  lit:boolean|undefined; // ch18
  obj: Obj|undefined; // ch21
  public sprite:Glyph|undefined; // ch27

  glyph():Glyph {
    return this.mob ? this.mob.g : this.env; 
  }
  
  // ch18
  glyph18():Glyph { return this.env; }

  // ch21
  glyph21(): Glyph {
    return this.obj ? this.obj.g 
                    : this.env; 
  }
  
  // ch27
  glyph27():Glyph { 
    if (this.sprite) { return this.sprite; }
    return (this.obj ? this.obj.g : this.env); 
  }

  hasObj():boolean { return !!this.obj; } // ch21

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
