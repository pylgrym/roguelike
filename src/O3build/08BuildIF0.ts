import { DMapIF } from "O2model/07DMapIF";
import { Rnd } from "O2model/07Rnd";
import { GameIF } from "./08GameIF";

export interface BuildIF0 {
  makeGame():GameIF;
  makeLevel(rnd:Rnd, level:number):DMapIF;
  makeMap(rnd:Rnd, level:number):DMapIF;
}