import { DMapIF } from "O2model/07DMapIF";
import { Glyph } from "O2model/07Glyph";
import { Rnd } from "O2model/07Rnd";
import { TestMap } from "O2model/07TestMap";
import { WPoint } from "O2model/07WPoint";
import { Game0 } from "O2model/08GameModel";
import { Mob } from "O2model/09Mob";
import { GlyphMap1 } from "O2model/16GlyphInf1";
import { Game3 } from "O2model/17GameModel3";
import { MobAiIF } from "O5ai/10MobAiIF";
import { MoodAI } from "O5ai/18MoodAI";
import { AiSwitcher2 } from "O5ai/20AISwitcher2";
import { GameIF } from "./08GameIF";
import { BuildIF2 } from "./10BuildIF2";
import { FreeSpace } from "./13FreeSpace";
import { MapGen1 } from "./15MapGen1";

export class Builder2i implements BuildIF2 {
  makeGame():GameIF { 
    let rnd = new Rnd(42);
    let ply = this.makePly(); 
    let game = new Game3(rnd,ply,this);
    this.enterFirstLevel(game);
    game.ai = this.makeAI(); 
    return game; 
  }  
  makeLevel(rnd:Rnd, level:number):DMapIF {
    let map = this.makeMap(rnd, level);
    this.addLevelStairs(map,level,rnd); // ch13
    //this.makeCatRing(map,rnd);
    this.addMobsToLevel(map,rnd);
    return map;
  }
  makeMap(rnd:Rnd, level:number):DMapIF { // ch20
    let dim = WPoint.StockDims; 
    var map:DMapIF;
    switch (level) {
      default: // (used to be testMap, now it's MapGen1.)
      case 1:  map = MapGen1.test(level); break;
      case 0:  map = TestMap.test(dim, rnd, level); break;  
    }
    return map;
  }
  enterFirstLevel0(game: Game0) {
    let map = <DMapIF> game.map;
    let np = this.centerPos(map.dim);
    map.enterMap(game.ply,np);      
  } 
  centerPos(d: WPoint):WPoint {
    return new WPoint(Math.floor(d.x/2), Math.floor(d.y/2)); 
  }
  makePly():Mob { 
    let ply = new Mob(Glyph.Ply,20,12);
    ply.hp = ply.maxhp = 15;
    return ply; 
  }
  
  makeAI():MobAiIF|null { 
      //return new AiSwitcher(); // ch14
      return new AiSwitcher2(MoodAI.stockMood(1)); 
  } 
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
  //addNPC(g:Glyph, x:number, y:number, 
  //       map:DMapIF, level:number) { 
  //  let mob = new Mob(g,x,y);
  //  map.addNPC(mob); 
  //  return mob;
  //}
  // ch20:
  addNPC(g:Glyph, x:number, y:number, 
         map:DMapIF, level:number) {
    let mob = new Mob(g,x,y);
    this.setLevelStats(mob,level); // ch20
    map.addNPC(mob); 
    return mob;
  }
  setLevelStats(mob:Mob, mobLevel:number) { 
    mob.level = mobLevel;
    mob.maxhp = mob.level * 5;
    mob.hp = mob.maxhp;
  }

  // ch13
  addLevelStairs(map:DMapIF, level:number, rnd:Rnd) { 
    (level == 0) 
    ? this.addStairs0(map) 
    : this.addStairs(map,rnd);
  }
  addStairs0(map: DMapIF) { 
      let pos = this.centerPos(map.dim);
      let p = new WPoint(3,0).addTo(pos);
      map.cell(p).env = Glyph.StairsDown;
  }

  addStairs(map:DMapIF, rnd:Rnd) {  
      this.addStair(map, rnd, Glyph.StairsDown);
      this.addStair(map, rnd, Glyph.StairsUp);
  }
  addStair(map:DMapIF,rnd:Rnd,stair:Glyph):boolean {
      let p = <WPoint> FreeSpace.findFree(map, rnd);
      map.cell(p).env = stair;	
      return true;
  }    
  enterFirstLevel(game: GameIF) {
    let dung = game.dung; 
    let map = dung.curMap(game);
    let np = this.centerPos(map.dim);
    game.dung.plySwitchLevel(dung.level,np,game);
  }
  // ch20:
  addMobsToLevel(map:DMapIF, rnd:Rnd) { 
    switch (map.level) {
      case 0: this.makeCatRing(map,rnd); break;
      default:this.makeMobs(map,rnd,15); break;
    } // (now using makeMobs)
  }
  makeMobs(map:DMapIF, rnd:Rnd, rate:number) {
    let dim = map.dim;
    let p = new WPoint();
    for (p.y=1;p.y<dim.y-1;++p.y) {
      for (p.x=1;p.x<dim.x-1;++p.x) {
        if (!rnd.oneIn(rate)){ continue; }
        if (map.blocked(p)) { continue; }
        this.addMapLevel_Mob(p,map,rnd);
      } // (now using addMapLevel_Mob)
    }
  }
  addMapLevel_Mob(pos:WPoint, map:DMapIF, rnd:Rnd) { 
	  this.addLevelMob(pos,map,rnd,map.level);
  }
  addLevelMob(p:WPoint, map:DMapIF, 
                rnd:Rnd, baseLevel:number):Mob { 
    let level = rnd.spiceUpLevel(baseLevel);
    if (level < 1) { level = 1; } 
    // otherwise 0 would cause @..
    let g = this.level2glyph(level);
    return this.addNPC(g, p.x,p.y, map, level);
  } 
  level2glyph(L:number):Glyph {  
    let glyph_ix:number = L + Glyph.Ant - 1;
    let g = GlyphMap1.ix2glyph(glyph_ix);
    return g;
  }    
}
