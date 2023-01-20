import { Glyph } from "O2model/07Glyph";
import { WPoint } from "O2model/07WPoint";
import { MapDrawerIF } from "./33MapDrawerIF";
import { Tile } from "./SurfaceIF";

export class MapSurf {
  constructor(public md:MapDrawerIF) { 
    let p = new WPoint();
    for (p.y=0;p.y<md.dim.y; ++p.y) {
      for (p.x=0;p.x<md.dim.x; ++p.x) {
        md.setp(p,Glyph.Unknown); // Outside
      }
    }
  }  
  p:WPoint = new WPoint();  
  setTile(x:number,y:number, tile:Tile){
    this.p.x = x; this.p.y = y;
    var g:Glyph;
    switch (tile) {
      case Tile.C_WALL:      g = Glyph.Wall; break;
      case Tile.C_HALLWALL:  g = Glyph.Wall; break;
      case Tile.C_FLOOR:     g = Glyph.Floor; break;
      case Tile.C_CORRFLOOR: g = Glyph.Door_Open; break; // These should eventually become plain floor.
      default:               g = Glyph.Rock;  break; // Vein
    }
    this.md.setp(this.p,g);
  }  
  getTile(x:number,y:number):Tile {
    this.p.x = x; this.p.y = y;
    let c = this.md.get(this.p);
    var tile:Tile;
    switch (c) {
      case Glyph.Wall:      tile = Tile.C_WALL;  break;
      case Glyph.Floor:     tile = Tile.C_FLOOR; break; 
      case Glyph.Door_Open: tile = Tile.C_CORRFLOOR; break;
      default:              tile = Tile.UNSET;   break;
    }
    return tile;
  }
}
