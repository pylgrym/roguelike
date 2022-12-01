import { Glyph } from "./07Glyph";
import { Mob } from "./09Mob";
import { Obj } from "./21Obj";

export class MapCell {
  constructor(public env:Glyph) {}  
  mob:Mob|undefined; // ch09
  lit:boolean|undefined; // ch18
  obj: Obj|undefined; // ch21

  glyph():Glyph {
    return this.mob ? this.mob.g : this.env; 
  }
  
  // ch18
  glyph18():Glyph { return this.env; }

  // ch21
  glyph21(): Glyph {  // this is wrong, it should also use LoS!CanSee
    return this.obj ? this.obj.g 
                    : this.env; 
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
