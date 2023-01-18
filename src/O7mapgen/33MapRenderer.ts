import { GlyphInf1, GlyphMap1 } from './../O2model/16GlyphInf1';
import { TPoint } from "O1term/03TPoint";
import { DMapIF } from "O2model/07DMapIF";
import { MapCell } from "O2model/07MapCell";
import { WPoint } from "O2model/07WPoint";
import { TermIF } from 'O1term/03TermIF';

export class MapRenderer {
  public static renderMap(term:TermIF, map:DMapIF) {
    let w:WPoint = new WPoint();
    let t:TPoint = new TPoint();
    for (t.y=0, w.y=0; t.y < term.dim.y; ++t.y, ++w.y) {
      for (t.x=0, w.x=0; t.x < term.dim.x; ++t.x, ++w.x) {
        let cell:MapCell = map.cell(w);
        let i:GlyphInf1 = GlyphMap1.inf( cell.glyph() );
        term.at(t.x, t.y, i.c, i.fg, i.bg);
      }
    }
  }  
}