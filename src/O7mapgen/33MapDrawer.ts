import { GlyphInf1 } from './../O2model/16GlyphInf1';
import { ResizingTerm } from "O1term/03ResizingTerm";
import { Glyph } from "O2model/07Glyph";
import { WPoint } from "O2model/07WPoint";
import { BaseMap } from "./33BaseMap";
import { MapRenderer } from './33MapRenderer';
import { DMap } from 'O2model/07DMap';

export class MapDrawer extends BaseMap {
  term:ResizingTerm;
  constructor(dim:WPoint, init:Glyph) {
    let map=new DMap(new WPoint(dim.x,dim.y),init,0);
    super(dim, map);
    this.term=new ResizingTerm(dim);
    this.term.onResize();
  }
  setp(p:WPoint, glyph:Glyph):GlyphInf1 {
    let i = super.setp(p,glyph);
    this.term.at(p.x,p.y,i.c,i.fg,i.bg); 
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
