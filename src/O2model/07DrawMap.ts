import { TermIF } from "O1term/03TermIF";
import { TPoint } from "O1term/03TPoint";
import { GameIF } from "O3build/08GameIF";
import { DMapIF } from "./07DMapIF";
import { Glyph } from "./07Glyph";
import { GlyphInf0, GlyphMap0 } from "./07GlyphInf0";
import { MapCell } from "./07MapCell";
import { WPoint } from "./07WPoint";

export class DrawMap {
  static drawMap0(term:TermIF, map:DMapIF, vp:WPoint) {
    let tdim = term.dim;
    let t=new TPoint();
    let w=new WPoint();
    for (t.y=0, w.y=vp.y; t.y<tdim.y; ++t.y, ++w.y) {
      for (t.x=0, w.x=vp.x; t.x<tdim.x; ++t.x, ++w.x) {
        let cell:MapCell = 
            (map.legal(w) ? map.cell(w) : this.outside);
        let i:GlyphInf0 = GlyphMap0.inf(cell.glyph());
        term.at(t.x, t.y, i.c,'gray', 'lightgray');
      } 
    }
  }  
  static outside:MapCell = new MapCell(Glyph.Unknown);    

  // ch09:
  static drawMapPly(term:TermIF, map:DMapIF, plypos:WPoint, g:GameIF) { 
    if (!plypos) { plypos = new WPoint(); }
    let vp:WPoint = new WPoint( // Must get viewport:
      -Math.floor(term.dim.x*0.5)+plypos.x,
      -Math.floor(term.dim.y*0.5)+plypos.y,
    );
    this.drawMap0(term,map,vp);  
  }

  // ch11:
  static renderStats(term:TermIF, game:GameIF) {
    let ply = game.ply;
    let  hp = ` HP:${ply.hp}`;
    let mhp = `MHP:${ply.maxhp}`;    
    let   L = `LVL:${game.dung.level}`;    
    let y=1;
    term.txt(0,y++, hp, 'yellow', 'teal');
    term.txt(0,y++,mhp, 'yellow', 'teal');
    term.txt(0,y++,  L, 'yellow', 'teal'); // ch13.
  }    

  // ch12:  
  static renderMsg(term:TermIF, game:GameIF) {
    let log = game.log;
    if (!log) {return;} //(Let older versions still run.)
    let line = log.top();
    let num = log.len(); 
    let s = (num > 1)  
       ? `${line} (${num} more)`
       : line;
    s = this.extend(s,term);
    term.txt(0,0, s, 'cyan', 'blue');
  }

  static mask:string='';
  static extend(s:String, term:TermIF):string { 
      let dim = term.dim; // Extend s to width:
      if (!this.mask) { this.mask = ' '.repeat(dim.x); }
      return s + this.mask.substr(0, dim.x - s.length);
  }
}