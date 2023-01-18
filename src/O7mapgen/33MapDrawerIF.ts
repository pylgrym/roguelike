import { GlyphInf1 } from './../O2model/16GlyphInf1';
import { DMapIF } from "O2model/07DMapIF";
import { Glyph } from "O2model/07Glyph";
import { WPoint } from "O2model/07WPoint";

export interface MapDrawerIF {
  setp(p:WPoint, glyph:Glyph):GlyphInf1;
  get(p:WPoint): Glyph;
  carve(p:WPoint, glyph:Glyph, hard:Glyph):void;

  dim:WPoint;
  map:DMapIF;
  render(): void;
  fillMap(init:Glyph):void;
  legal(p:WPoint):boolean;
}
