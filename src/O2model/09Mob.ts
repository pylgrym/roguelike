import { Glyph } from "./07Glyph";
import { WPoint } from "./07WPoint";
import { Mood } from "./18MoodEnum";

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
  isPly:boolean = false;

  hp:number = 3;    // ch11
  maxhp:number = 3; // ch11
  mood:Mood = Mood.Asleep; //ch18
  level:number = 0; // ch20

  // alive():boolean { return true; }
  alive():boolean { return this.hp>0; } // ch11.
}
