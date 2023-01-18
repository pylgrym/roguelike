import { DMapIF } from "O2model/07DMapIF";
import { Glyph } from "O2model/07Glyph";
import { WPoint } from "O2model/07WPoint";
import { GlyphInf1, GlyphMap1 } from "O2model/16GlyphInf1";
import { MapDrawerIF } from "./33MapDrawerIF";

export class BaseMap implements MapDrawerIF {
  // init:Glyph,  //this.fillMap(init);
  constructor(public dim:WPoint, public map:DMapIF){}   
  legal(p:WPoint):boolean {
    return p.x >= 0 && p.y >= 0 
        && p.x < this.dim.x && p.y < this.dim.y;
  }
  get(p:WPoint):Glyph { return this.map.cell(p).env; }
  set(x:number, y:number, glyph:Glyph) { 
    this.setp(new WPoint(x, y), glyph); 
  }
  setp(p:WPoint, glyph:Glyph):GlyphInf1 {
    let i: GlyphInf1 = GlyphMap1.inf(glyph);
    if (!this.map.legal(p)) { throw p; }
    this.map.cell(p).env = glyph;
    return i;
  }
  carve(p:WPoint, glyph:Glyph, hard:Glyph) {
    if (this.get(p) != hard) { this.setp(p, glyph); }
  }
  render() {}
  fillMap(init:Glyph) {
    for (let p=new WPoint(); p.y<this.dim.y; ++p.y) {
      for (p.x = 0; p.x < this.dim.x; ++p.x) {
        this.setp(p, init);
      }
    }
  }
}
