import { Obj } from "O2model/21Obj";
import { GameIF } from "O3build/08GameIF";
import { CostIF } from './28CostIF';


export class ItemCost implements CostIF {
  constructor(public g:GameIF, public obj:Obj, public objIx:number){}
  pay(): boolean {
    this.g.msg(`You use ${this.obj.name()}.`);
    this.g.bag!.removeIx(this.objIx);
    return true;
  }
}

export class ChargedItemCost0 implements CostIF {
  constructor(public g:GameIF, public obj:Obj, 
              public objIx:number){}
  pay(): boolean {
    let o = this.obj;
    if (o.charges<=0) { return false; }
    this.g.msg(`You use ${this.obj.name()}.`);
    --o.charges;
    if (o.charges>0) { return true; }
    this.g.bag!.removeIx(this.objIx);
    return true;
  }
}

export class ChargedItemCost1 implements CostIF {
  constructor(public g:GameIF, public obj:Obj, 
              public objIx:number){}
  pay(): boolean {
    let o = this.obj;    
    if (o.charges<=0) { 
      this.g.msg(`You use ${this.obj.name()}`);   
    } else {
      --o.charges;
      if (o.charges>0) { return true; }
      this.g.msg(`${this.obj.name()} used up`);   
    }
    this.g.bag!.removeIx(this.objIx);
    return true;
  }
}
