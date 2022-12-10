import { Mob } from "O2model/09Mob";
import { Buff } from "O2model/24BuffEnum";
import { GameIF } from "O3build/08GameIF";
import { HealthAdj } from "./11HealthAdj";

export class AutoHeal {  
    amountToHealMin:number = 1;
    timeToHealMax:number = 5;
    nextWait:number=0;
    amount:number=0;
    countdown:number=0; 
    constructor(){ this.resetHeal(); }
    public static combatReset(mob:Mob, game:GameIF) { 
      this.clearSleep(mob,game); // ch25
      let ah = game.autoHeal;
        if (mob.isPly && ah) {
            ah.resetHeal();
        } 
    }
    static clearSleep(m:Mob,g:GameIF) { // ch25.
      if (!m.is(Buff.Sleep)) { return; }
      m.buffs.cleanse(Buff.Sleep,g,m);
      if (m.isPly) { g.msg('ply wakes up!'); }
    }
    
    public static combatResets(a:Mob, b:Mob|null, game:GameIF) { 
        this.combatReset(a,game); 
        if (b) { AutoHeal.combatReset(b,game); }
    }
    resetHeal() {
        this.nextWait = this.timeToHealMax; 
        this.countdown = this.nextWait; 
        this.amount = this.amountToHealMin;
    }
    turn(ply:Mob,game:GameIF) {
        if (this.atFullHealth(ply)) { return; }
        this.step_timeToHeal(ply,game);
    }
    atFullHealth(m:Mob):boolean { 
        return (m.hp >= m.maxhp); 
    }
    step_timeToHeal(ply:Mob,game:GameIF) { 
        this.countdown > 0 
            ? --this.countdown 
            : this.healTick(ply, game); 
    }
    healTick(ply:Mob,game:GameIF) {
        game.msg(
 `ply feels ${this.amount} better after ${this.nextWait}`
        );        
        HealthAdj.heal(ply, this.amount);
        ++this.amount;
        if (this.nextWait>1) { 
            --this.nextWait; 
        }
        this.countdown = this.nextWait;
    }
  }
