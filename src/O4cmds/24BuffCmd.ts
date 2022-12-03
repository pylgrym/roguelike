export class BuffCmd extends CmdBase {
  constructor(public buff:Buff, 
              public mob:Mob, 
              public game:GameIF){ super(); }
  exc():boolean {
    this.game.msg(
      `${this.mob.name} is ${Buff[this.buff]}`
    );
    let effect:TickIF|undefined = undefined;
    if (this.buff == Buff.Poison) {
      effect = new PoisonTick(this.mob, this.game);
    }
    let active:BuffIF = { 
      buff:this.buff, time:8,  effect:effect
    }; 
    this.addBuffToMob(active,this.game,this.mob);
    return true;
  }

  addBuffToMob(active:BuffIF, 
               game:GameIF, mob:Mob) {
    mob.buffs.add(active,game,mob);
  }

}
