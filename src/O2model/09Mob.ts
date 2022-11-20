import { Glyph } from "./07Glyph";
import { WPoint } from "./07WPoint";

export class Mob {
  constructor(g:Glyph, x:number, y:number) {
    this.isPly = (g == Glyph.Ply);
    this.g = g;
    this.name = Glyph[g]; 
    this.pos.x = x; this.pos.y = y;  
  }
    
  pos:WPoint = new WPoint();
  g:Glyph = Glyph.Unknown;
  name:string = '?';

  hp:number = 3;    // ch11
  maxhp:number = 3; // ch11

  isPly:boolean = false;

  // alive():boolean { return true; }
  alive():boolean { return this.hp>0; } // ch11.
}
