import { GameIF } from "O3build/08GameIF";
import { DMapIF } from "./07DMapIF";
import { Rnd } from "./07Rnd";

export class Game0 implements GameIF {
  constructor(public rnd:Rnd) {}
  map:DMapIF|null = null;
  curMap():DMapIF|null { return this.map;}
}