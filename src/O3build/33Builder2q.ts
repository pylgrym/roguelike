import { DMapIF } from "O2model/07DMapIF";
import { Glyph } from "O2model/07Glyph";
import { Rnd } from "O2model/07Rnd";
import { TestMap } from "O2model/07TestMap";
import { WPoint } from "O2model/07WPoint";
import { Game0 } from "O2model/08GameModel";
import { Mob } from "O2model/09Mob";
import { GlyphMap1 } from "O2model/16GlyphInf1";
import { Obj } from "O2model/21Obj";
import { Slot } from "O2model/21Slot";
import { Bag } from "O2model/22Bag";
import { Dung30 } from "O2model/30Dung";
import { Game6 } from "O2model/30GameModel6Win";
import { MobAiIF } from "O5ai/10MobAiIF";
import { MoodAI } from "O5ai/18MoodAI";
import { AiSwitcher2 } from "O5ai/20AISwitcher2";
import { GameIF } from "./08GameIF";
import { FreeSpace } from "./13FreeSpace";
import { MapGen1 } from "./15MapGen1";
import { ObjTypes } from "./21ObjTypes";
import { BuildIF4 } from "./29BuildIF3";
import { LevelMaker } from "./33LevelMaker";

export class Builder2q implements BuildIF4 {
  makeGame():GameIF { 
    let rnd = new Rnd(42);
    let ply = this.makePly(); 
    let game = new Game6(rnd,ply,this); // ch30
    this.initDragonLevel(game);
    game.dung.level = 0;//8;
    this.enterFirstLevel(game);
    game.ai = this.makeAI(); 
    this.initLevel_One(game);//ch22.
    return game; 
  }  
  makeLevel(rnd:Rnd,level:number):DMapIF {
    return this.makeDragonLevels(rnd,level,-1);
  }
  makeDragonLevels(rnd:Rnd, level:number, 
                   dragonLevel:number):DMapIF {
    let hasDragon = (level == dragonLevel);
    let map = this.makeDragonMaps(rnd,level,dragonLevel);
    this.addLevelStairs(map,level,rnd); // ch13
    this.addItems(map,rnd); // ch21
    this.addMobsToLevel(map,rnd);
    if (hasDragon) {this.addDragon(map,rnd);}
    return map;
  }
  makeMap(rnd:Rnd, level:number):DMapIF { 
    return this.makeDragonMaps(rnd,level,-1);
  }
  makeDragonMaps0(rnd:Rnd, level:number, 
                 dragonLevel:number):DMapIF {
    let dim = WPoint.StockDims; 
    var map:DMapIF;
    switch (level) {
      default:
      case 1:  map = MapGen1.test(level); break;
      case 0:  map = TestMap.test(dim, rnd, level); break;        
      case dragonLevel: map = TestMap.test(dim, rnd, level); break;
    } // (here we could make a special dragon level)
    return map;
  }
  makeDragonMaps(rnd:Rnd, level:number, 
                 dragonLevel:number):DMapIF {
    let dim = WPoint.StockDims; 
    return new LevelMaker(rnd).make(level,dim,dragonLevel);
  }
  enterFirstLevel0(game: Game0) {
    let map = <DMapIF> game.map;
    let np = this.centerPos(map.dim);
    map.enterMap(game.ply,np);      
  } 
  centerPos(d: WPoint):WPoint {
    return new WPoint(Math.floor(d.x/2), Math.floor(d.y/2)); 
  }

  static plyHP_value=16;
  makePly():Mob { 
    let ply = new Mob(Glyph.Ply,20,12);
    ply.hp = ply.maxhp = Builder2q.plyHP_value*=2; //10000; //15;
    return ply; 
  }
  
  makeAI():MobAiIF|null { 
      return new AiSwitcher2(MoodAI.stockMood29(1,8)); // ch29
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
      if (!p) {return false;}
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
  addMapLevel_Mob(pos:WPoint, map:DMapIF, rnd:Rnd):Mob { 
	  return this.addLevelMob(pos,map,rnd,map.level);
  }
  addLevelMob(p:WPoint, map:DMapIF, 
                r:Rnd, baseLevel:number):Mob { 
    let level = r.spiceUpLevel(baseLevel);
    if (level < 1) { level = 1; } 
    // otherwise 0 would cause @..
    //let g = this.level2glyph(level);
    let g = this.level2mobGlyph(level,r); // ch30
    return this.addNPC(g, p.x,p.y, map, level);
  } 
  level2mobGlyph(L:number,r:Rnd):Glyph {  
    let g = this.level2glyph(L);
    if (g <= Glyph.Sheep) { return g; }
    // instead return a mix of the last 4 levels:
    let ix = r.rndC(0,3);
    g = <Glyph> (Glyph.Sheep-ix);
    return Glyph.Sheep;
  }
  level2glyph(L:number):Glyph {  
    let glyph_ix:number = L + Glyph.Ant - 1;
    let g = GlyphMap1.ix2glyph(glyph_ix);
    return g;
  }    

  // ch21:
  addItems(map: DMapIF, rnd:Rnd) { 
    for (let p=new WPoint(); p.y<map.dim.y;++p.y) {
      for (p.x=0;p.x<map.dim.x; ++p.x) {
        if (map.blocked(p)){ continue; }
        if (rnd.oneIn(40)) {
          ObjTypes.addRndObjForLevel(p,map,rnd,map.level);
        } 
      }
    }
  }

  // ch22:
  initLevel_One(g: GameIF) { 
    let L1 = g.dung.getLevel(1,g);
    this.addItemToPlayerBag( <Bag> g.bag);
    this.addItemNextToPlayer(g.ply,L1);
    this.addMobsNextToPlayer(g.ply,L1);
  }
  addItemNextToPlayer(ply: Mob, map: DMapIF) { 
    let a = ply.pos;
      
    let p = new WPoint(a.x+1,a.y);
    map.addObj(new Obj(Glyph.Shield, Slot.OffHand), p);
    map.cell(p).env = Glyph.Floor;
      
    p = new WPoint(a.x,a.y+1);
    map.addObj(new Obj(Glyph.Shield, Slot.OffHand), p);    
    map.cell(p).env = Glyph.Floor;
  }
  addItemToPlayerBag(bag: Bag) {  
    bag?.add(new Obj(Glyph.Dagger, Slot.MainHand) );

    // ch28
    bag?.add(new Obj(Glyph.Potion, Slot.NotWorn) );
    bag?.add(new Obj(Glyph.Scroll, Slot.NotWorn) );
    bag?.add(new Obj(Glyph.Wand,   Slot.NotWorn) );
  }
  addMobsNextToPlayer(ply: Mob, map: DMapIF) {
    let p = ply.pos;
    this.addNPC(Glyph.Dragon,p.x,p.y+1,map,1); //31);
  }
  addDragon(map: DMapIF, rnd: Rnd) {
    let p = <WPoint> FreeSpace.find(Glyph.Floor,map,rnd);
    this.addNPC(Glyph.Dragon,p.x,p.y+1,map,31);
  }
  initDragonLevel(g:GameIF) {
    let dung = <Dung30> g.dung;
    let r = g.rnd;
    let minDragon = 26;
    let maxDragon = 30;
    dung.dragonLevel = r.rndC(minDragon,maxDragon);
    dung.dragonLevel = 2
  }
}


