import { GameIF } from "O3build/08GameIF";
import { MobAiIF } from "O5ai/10MobAiIF";
import { DMapIF } from "./07DMapIF";
import { Rnd } from "./07Rnd";
import { Mob } from "./09Mob";

export class Game0 implements GameIF {
  constructor(public rnd:Rnd) {}
  map:DMapIF|null = null;
  curMap():DMapIF|null { return this.map;}

    ply:Mob = <Mob><unknown> undefined; // ch09    
    ai:MobAiIF|null = null; // ch10
}