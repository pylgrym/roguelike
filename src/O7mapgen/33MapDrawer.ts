export class MapDrawer extends BaseMap {
  term:ResizingTerm;
  constructor(dim:WPoint, init:Glyph) {
    let map=new DMap0(new WPoint(dim.x,dim.y), init);
    super(dim, map);
    this.term=new ResizingTerm(dim);
    this.term.manResize();
  }
  setp(p:WPoint, glyph:Glyph):GlyphInf {
    let i = super.setp(p,glyph);
    this.term.at(p.x, p.y, i.c, i.fg, i.bg, null); 
    return i;
  }
  render() { MapRenderer.renderMap(this.term, this.map); }
  print() {
    let full = '';
    for (let p=new WPoint(); p.y<this.dim.y; ++p.y) {
      let row = '';
      for (p.x=0; p.x<this.dim.x; ++p.x) { 
        let c:Glyph = this.get(p);
        row += c; 
      }
      //console.log(row);
      full += row + '\n';
    }
    console.log(full);
  }
}
