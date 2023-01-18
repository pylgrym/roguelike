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
  setp(p:WPoint, glyph:Glyph):GlyphInf {
    let i: GlyphInf = GlyphInf.inf(glyph);
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
