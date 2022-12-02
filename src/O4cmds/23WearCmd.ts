import { Obj } from "O2model/21Obj";
import { Slot } from "O2model/21Slot";
import { Worn } from "O2model/23Worn";
import { GameIF } from "O3build/08GameIF";
import { CmdBase } from "./09CmdBase";

export class WearCmd extends CmdBase {
  worn:Worn;
  constructor(public obj:Obj, public ix:number,
              public game:GameIF) { 
    super(); 
    this.worn = <Worn> game.worn;
  }
  exc(): boolean {
    let game = this.game; 
    let obj:Obj = this.obj;
    if (!this.wearable(obj)) {return false;}
    if (this.alreadyWorn(obj)) {return false;}
    if (this.handsFull(obj)) {return false;}
    game.bag!.removeIx(this.ix); 
    this.worn.add(obj);
    game.msg(`You wear ${obj.name()}.`);
    return true;
  }
  wearable(obj:Obj):boolean {
    let canWear = (obj.slot != Slot.NotWorn);
    if (!canWear) {
      this.game.flash(`${obj.name()} is not wearable: ${obj.slot}`);
    }
    return canWear;
  }
  alreadyWorn(obj:Obj):boolean {
    let already = this.worn.has(obj.slot); 
    if (already) {
      let label = Slot[obj.slot];
      this.game.flash(`${label} already worn.`);
    }
    return already; 
  }
  handsFull(obj:Obj):boolean {
    if (!Worn.isWeapon(obj)) {return false;}
    let worn = this.worn;
    let inHand:Obj|undefined = worn.weapon(); 
    if (!inHand) { return false; }
    let overlap = this.overlaps(obj.slot, inHand!.slot);
    if (overlap) {
      let f=`unequip ${inHand!.name()} first.`;
      this.game.flash(f);
    }
    return overlap;
  }
  overlaps(slot:Slot, hand:Slot):boolean {
    return slot==Slot.BothHands 
        || hand==Slot.BothHands
        || hand==slot;
  }
}
