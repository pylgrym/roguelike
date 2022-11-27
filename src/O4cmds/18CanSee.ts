import { DMapIF } from "O2model/07DMapIF";
import { MapCell } from "O2model/07MapCell";
import { WPoint } from "O2model/07WPoint";
import { Mob } from "O2model/09Mob";
import { BresIter } from "./18BresIter";

export class CanSee { 
  public static canSee(a:WPoint, b:WPoint, 
    map:DMapIF, onlyEnvir:boolean):boolean 
  {
    let i:BresIter  = BresIter.BresIter1(a, b);
    for (; !i.done();) {
      let p:WPoint = i.next();
      let c:MapCell = map.cell(p);
      if (c.opaque()) { return false; }
    }
    return true;
  }

  public static canSee2(a:Mob, b:Mob, 
    map:DMapIF, onlyEnvir:boolean):boolean 
  {
    return this.canSee(a.pos, b.pos, map, onlyEnvir);
  }
}
