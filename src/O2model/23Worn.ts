import { Obj } from "./21Obj";
import { Slot } from "./21Slot";

export class Worn {
  _objs: Map<Slot, Obj> = new Map();
  add(o:Obj) { 
    this.legalObj(o); 
    this._objs.set(o.slot, o); 
  }
  remove(slot:Slot) { 
    this.legalSlot(slot); 
    this._objs.delete(slot); 
  }
  has(slot:Slot):boolean { 
    return this._objs.has(slot); 
  }
  len():number{
    return this._objs.size;
  }
  get(slot:Slot):Obj|undefined { 
    return this._objs.get(slot); 
  }
  legalSlot(slot:Slot) {
    if (!this.has(slot)) {
      console.log(this._objs);
      throw `slot not worn: ${slot}`; 
    }
  }
  legalObj(o:Obj) {
    let slot:Slot = o.slot;
    if (slot == Slot.NotWorn) { 
      console.log(slot, o);
      throw `slot NotWorn cannot be worn. ${o.name()}`; 
    }
    if (slot == undefined) { 
      console.log(slot, o);
      throw `no slot on ${o.name()}`; 
    }
  }
  
  // extra for class Worn:
  AC():number { 
      let AC:number = 0;
      for (let [,v] of this._objs) { 
          AC += v.level; 
      }
      return AC;
  }
  AC_reduce():number { // it's 10-20-30-40.
      let AC = this.AC();
      let reduce = 1.0/(AC*0.1 + 1.0);
      return reduce;
  }
  public static weapons:Slot[] = 
      [ Slot.BothHands, 
       Slot.MainHand, 
       Slot.OffHand];
  static isWeapon(o:Obj) { 
      return o.slot in Worn.weapons; 
  }
  weapon():Obj|undefined {
      for (let slot of Worn.weapons) {
          if (this.has(slot)) { 
              return this.get(slot); 
          }
      }
      return undefined;
  }
  weaponDmg():number {
      let weapon:Obj|undefined = this.weapon();
      if (weapon) { return weapon.level+1; }
      return 2; // unarmed, hands/fists. 
  }
}
