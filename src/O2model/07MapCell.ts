import { Glyph } from "./07Glyph";
import { Mob } from "./09Mob";

export class MapCell {
  constructor(public env:Glyph) {}
  // glyph():Glyph { return this.env; }
  
  mob:Mob|undefined; // ch09
  glyph():Glyph {
    return this.mob ? this.mob.g : this.env; 
  }
  blocked():boolean {
    return (!!this.mob || this.env == Glyph.Wall);
  }
}
