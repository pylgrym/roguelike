import { TPoint } from "O1term/03TPoint";
import { DMapIF } from "O2model/07DMapIF";
import { Glyph } from "O2model/07Glyph";
import { Rnd } from "O2model/07Rnd";
import { TestMap } from "O2model/07TestMap";
import { WPoint } from "O2model/07WPoint";
import { Game0 } from "O2model/08GameModel";
import { Mob } from "O2model/09Mob";
import { GameIF } from "./08GameIF";
import { BuildIF1 } from "./09BuildIF1";

export class Builder1 implements BuildIF1 {
  makeGame():GameIF { 
    let rnd = new Rnd(42);
    let game = new Game0(rnd);
    game.ply = this.makePly();
    game.map = this.makeLevel(rnd, 0);
    this.enterFirstLevel0(game);
    return game; 
  } 
  makeLevel(rnd:Rnd, level:number):DMapIF {
    let map = this.makeMap(rnd, level);
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
}
