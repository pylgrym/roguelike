import { GameIF } from "O3build/08GameIF";
import { CostIF } from './28CostIF';


export class ItemCost implements CostIF {
  constructor(public g:GameIF, public objIx:number) { }
  pay(): boolean {
    this.g.bag!.removeIx(this.objIx);
    return true;
  }
}
