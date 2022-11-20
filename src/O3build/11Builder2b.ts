import { TPoint } from "O1term/03TPoint";
import { DMapIF } from "O2model/07DMapIF";
import { Glyph } from "O2model/07Glyph";
import { Rnd } from "O2model/07Rnd";
import { TestMap } from "O2model/07TestMap";
import { WPoint } from "O2model/07WPoint";
import { Game0 } from "O2model/08GameModel";
import { Mob } from "O2model/09Mob";
import { MobAiIF } from "O5ai/10MobAiIF";
import { MobAI2_cat } from "O5ai/11MobAI2_cat";
import { GameIF } from "./08GameIF";
import { BuildIF2 } from "./10BuildIF2";

export class Builder2b implements BuildIF2 {
  makeGame():GameIF { 
    let rnd = new Rnd(42);
    let game = new Game0(rnd);
    game.ply = this.makePly(); 
    game.map = this.makeLevel(rnd, 0);
    this.enterFirstLevel0(game);
    game.ai = this.makeAI(); 
    return game; 
  }  
  makeLevel(rnd:Rnd, level:number):DMapIF {
    let map = this.makeMap(rnd, level);
    //this.makeSheepRing(map,rnd);
    this.makeCatRing(map,rnd);
    return map;
  }
  makeMap(rnd:Rnd, level:number):DMapIF {
    let dim = TPoint.StockDims;
    let wdim = new WPoint(dim.x, dim.y); 
    return TestMap.test(wdim, rnd, level);
  }
  enterFirstLevel0(game: Game0) {
    let map = <DMapIF> game.map;
    let np = this.centerPos(map.dim);
    map.enterMap(game.ply,np);      
  } 
  centerPos(d: WPoint):WPoint {
    return new WPoint(Math.floor(d.x/2), Math.floor(d.y/2)); 
  }
  makePly():Mob { return new Mob(Glyph.Ply,20,12); }
  //makeAI():MobAiIF|null{ return new MobAI1_sheep(); }  
  makeAI():MobAiIF|null { return new MobAI2_cat(); } // ch11
  makeSheepRing(map:DMapIF, rnd:Rnd) {
    this.makeMobRing(Glyph.Sheep, map, rnd);
  }
  makeCatRing(map:DMapIF, rnd:Rnd) { // ch11
    this.makeMobRing(Glyph.Cat, map, rnd);
  }
  makeMobRing(g:Glyph, map:DMapIF, rnd:Rnd) {
    let dim = map.dim;
    let c = new WPoint(Math.floor(dim.x/2),
                       Math.floor(dim.y/2));
    let p = new WPoint();
    for (p.y=1;p.y<dim.y-1;++p.y) {
      for (p.x=1;p.x<dim.x-1;++p.x) {
        let d = c.dist(p);
        if (d<7 || d>9) { continue; }
        if (map.blocked(p)) { continue; }
        this.addNPC(g,p.x,p.y, map,0);
      }
    }
  }
  addNPC(g:Glyph, x:number, y:number, 
         map:DMapIF, level:number) { 
    let mob = new Mob(g,x,y);
    map.addNPC(mob); 
    return mob;
  }
}
