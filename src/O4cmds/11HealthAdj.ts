import { DMapIF } from "O2model/07DMapIF";
import { Mob } from "O2model/09Mob";
import { GameIF } from "O3build/08GameIF";
import { AutoHeal } from "./17AutoHeal";

export class HealthAdj {
  public static adjust(m:Mob,amount:number,game:GameIF,actor:Mob|null) {
    if (amount==0){return;} // do nothing.
    if (amount>0) {return this.heal(m,amount);}
    if (amount<0) {return this.dmg(m,-amount,game,actor);}
  }
  
  public static heal(m:Mob, amount:number) {
    console.log(`heal .. ${m.hp} += ${amount}`);
    let limit = m.maxhp - m.hp;
    if (amount > limit) { amount = limit; }
    m.hp += amount;
    console.log('h_to', m.hp);
  }

  static dmg(m: Mob, amount: number, game:GameIF,
             attacker:Mob|null) { 
    AutoHeal.combatResets(m,attacker,game);

    let old_hp = m.hp; //console.log('dmg', amount, m.hp);
    m.hp -= amount;
    console.log('dmg',amount,'d_to',old_hp,'->',m.hp, m.name);
    if (m.hp <= 0) { 
      let involvesPly = m.isPly || 
            (attacker != null && attacker.isPly);
      this.mobDies(m, game, involvesPly); 
    }
  }

  static mobDies(m: Mob, game:GameIF, involvesPly:boolean) {
    let s = `${m.name} dies in a fit of agony`;
    //console.log(s);
    if (involvesPly) { game.msg(s); } // ch12
    let map = <DMapIF> game.curMap();
    map.removeMob(m);
  }
  
}