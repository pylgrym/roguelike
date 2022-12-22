import { Obj } from "O2model/21Obj";
import { GameIF } from "O3build/08GameIF";
import { CostIF } from './28CostIF';


export class ItemCost implements CostIF {
  constructor(public g:GameIF, public obj:Obj, public objIx:number) { }
  pay(): boolean {
    this.g.msg(`You use ${this.obj.name()}.`);
    this.g.bag!.removeIx(this.objIx);
    return true;
  }
}
