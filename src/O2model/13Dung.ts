import { GameIF } from "O3build/08GameIF";
import { DMapIF } from "./07DMapIF";
import { WPoint } from "./07WPoint";

export class Dung {
  level:number = 0;
  maps:DMapIF[] = [];
  curMap(g:GameIF): DMapIF {
      return this.getLevel(this.level,g);
  }
  getLevel(L:number, g:GameIF): DMapIF {
    if (!this.hasLevel(L)) { 
      let map = g.build.makeLevel(g.rnd,L);
      this.add(map,L);
    }
    return this.maps[L];
  }
  hasLevel(L:number):boolean {
    return L<this.maps.length && !!this.maps[L]; 
  } // && L>=0
  add(map:DMapIF, L:number) { 
    if (L >= this.maps.length) { this.extendMaps(L+1); }
    this.maps[L] = map; 
  }
  extendMaps(len:number) { this.maps.length = len; } 
    
  plySwitchLevel(newLevel:number, np:WPoint, g:GameIF) {
      let ply = g.ply;
      this.curMap(g).removeMob(ply); 
      this.level = newLevel;
      this.curMap(g).enterMap(ply,np);      
  }
}
