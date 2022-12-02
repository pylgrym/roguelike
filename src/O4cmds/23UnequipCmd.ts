export class UnequipCmd extends CmdBase {
  constructor(public slot:Slot,
              public game:GameIF) { super(); }
  exc(): boolean {
    let slot = this.slot;
    if (slot == Slot.NotWorn) { return false; }
    let game = this.game;
    let worn = <Worn> game.worn;
    if (!worn.has(slot)) {
      let label:string = Slot[slot];
      let s = `${label} not WORN (${slot})`;
      game.flash(s); return false;
    }  
    let o:Obj|undefined = worn.get(slot);
    if (!o) { throw `no item ${slot}?`;}
    worn.remove(slot); 
    game.bag!.add(o);  
    game.msg(`ply removes ${o.desc()}`);  
    return true;
  }
}
