export class MapBuilder {
  public static addFence(map:DMapIF, wallg:Glyph=Glyph.Wall, 
                         fill:Glyph=Glyph.None) { // (ie mapborder)
    let p:WPoint = new WPoint();
    for (p.y=0; p.y<map.dim.y; ++p.y) {
      for (p.x=0; p.x<map.dim.x; ++p.x) {
        let edge:boolean = 
          (p.x==0||p.x==map.dim.x-1 || p.y==0||p.y==map.dim.y-1);
        let glyph = edge ? wallg : fill; 
        if (!glyph) { continue; }
        map.cell(p).env = glyph; 
      }
    }
  }
}
