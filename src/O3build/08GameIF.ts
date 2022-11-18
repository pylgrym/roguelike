import { DMapIF } from "O2model/07DMapIF";
import { Rnd } from "O2model/07Rnd";

export interface GameIF {
  rnd:Rnd;
  curMap():DMapIF|null;
}