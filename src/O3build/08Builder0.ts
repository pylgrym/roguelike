import { DMapIF } from "O2model/07DMapIF";
import { Rnd } from "O2model/07Rnd";
import { TestMap } from "O2model/07TestMap";
import { WPoint } from "O2model/07WPoint";
import { Game0 } from "O2model/08GameModel";
import { BuildIF0 } from "./08BuildIF0";
import { GameIF } from "./08GameIF";

export class Builder0 implements BuildIF0 {
  makeGame():GameIF { 
    let rnd = new Rnd(42);
    let game = new Game0(rnd); 
    game.map = this.makeLevel(rnd,0);
    return game;       
  } 
  makeLevel(rnd:Rnd, level:number):DMapIF {
    return this.makeMap(rnd, level);
  }
  makeMap(rnd:Rnd, level:number):DMapIF { 
    let wdim = WPoint.StockDims;
    return TestMap.test(wdim, rnd, level);
  }
}