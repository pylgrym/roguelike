export interface MapDrawerIF {
  setp(p:WPoint, glyph:Glyph):GlyphInf;
  get(p:WPoint): Glyph;
  carve(p:WPoint, glyph:Glyph, hard:Glyph):void;

  dim:WPoint;
  map:DMapIF;
  render(): void;
  fillMap(init:Glyph):void;
  legal(p:WPoint):boolean;
}
