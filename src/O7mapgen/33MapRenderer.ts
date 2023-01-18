export class MapRenderer {
  public static renderMap(term:Term, map:DMapIF) {
    let w:WPoint = new WPoint();
    let t:TPoint = new TPoint();
    for (t.y=0, w.y=0; t.y < term.dim.y; ++t.y, ++w.y) {
      for (t.x=0, w.x=0; t.x < term.dim.x; ++t.x, ++w.x) {
        let cell:MapCell0 = map.cell(w);
        let i:GlyphInf = GlyphInf.inf( cell.glyph2() );
        term.at(t.x, t.y, i.c, i.fg, i.bg, null);
      }
    }
  }  
}