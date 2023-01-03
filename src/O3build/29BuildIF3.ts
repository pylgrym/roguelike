import { DMapIF } from "O2model/07DMapIF";
import { Glyph } from "O2model/07Glyph";
import { Rnd } from "O2model/07Rnd";
import { WPoint } from "O2model/07WPoint";
import { Mob } from "O2model/09Mob";
import { BuildIF2 } from "./10BuildIF2";

 export interface BuildIF3 extends BuildIF2 {
  addNPC(g:Glyph, x:number, y:number, 
    map:DMapIF, level:number):Mob;
  // (MUST RETURN mob!)
  addMapLevel_Mob(pos:WPoint, map:DMapIF, rnd:Rnd):Mob;
}

export interface BuildIF4 extends BuildIF3 {
  makeDragonLevels(rnd:Rnd, level:number, dragonLevel:number):DMapIF;
}