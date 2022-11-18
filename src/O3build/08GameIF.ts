import { DMapIF } from "O2Model/07DMapIF";
import { Rnd } from "O2Model/07Rnd";

export interface GameIF {
  rnd:Rnd;
  curMap():DMapIF|null;
}