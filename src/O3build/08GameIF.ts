import { DMapIF } from "O2model/07DMapIF";
import { Rnd } from "O2model/07Rnd";
import { Mob } from "O2model/09Mob";

export interface GameIF {
  rnd:Rnd;
  curMap():DMapIF|null;

  ply: Mob; // ch09  
}