import { Glyph } from "./07Glyph";
import { WPoint } from "./07WPoint";
import { Mood } from "./18MoodEnum";
import { ActiveBuffs } from "./24ActiveBuffs";
import { Buff } from "./24BuffEnum";

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
  buffs:ActiveBuffs = new ActiveBuffs(); //ch24
  is(buff:Buff): boolean { //ch25
    return this.buffs.is(buff); 
  }
  sinceMove:number=0; // ch25

  alive():boolean { return this.hp>0; } // ch11.
}
