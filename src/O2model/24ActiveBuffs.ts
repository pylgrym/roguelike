import { GameIF } from "O3build/08GameIF";
import { Mob } from "./09Mob";
import { Buff } from "./24BuffEnum";
import { BuffIF } from "./24BuffIF";

export class ActiveBuffs {
  _map: Map<Buff, BuffIF> = new Map();
  add(b: BuffIF, game: GameIF, mob: Mob) { 
    this._map.set(b.buff, b); 
  } 
  
  del(b: BuffIF, game: GameIF, mob: Mob) {
    this._map.delete(b.buff); 
    if (mob.isPly) {
      game.msg(`${Buff[b.buff]} wears off.`);
    }
  }
  is(buff: Buff): boolean { 
    return this._map.has(buff); 
  }
  get(buff: Buff): BuffIF|undefined { 
    return this._map.get(buff); 
  }
  cleanse(buff:Buff, game:GameIF, mob:Mob) {
    let b = mob.buffs.get(buff);
    if (b) { this.del(b,game,mob); }
  }
  ticks(mob:Mob, game:GameIF) {
    for (let b of this._map.values()) {
      --b.time;
      if (b.effect) { b.effect.tick(b.time); }
      if (b.time<=0) { this.del(b,game,mob); }
    }
  }
}
