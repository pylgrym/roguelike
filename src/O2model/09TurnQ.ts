import { Mob } from "./09Mob";

export class TurnQ { 
  mobs: Mob[] = [];
  curMob():Mob { return this.mobs[0]; } 
  pushMob(m:Mob) { this.mobs.push(m); }
  popMob():Mob { return <Mob> this.mobs.shift(); } 
  removeMob(m:Mob):boolean {
    let ix = this.mobs.indexOf(m);
    if (ix < 0) { return false; }
    this.mobs.splice(ix,1); 
    return true;
  }
  frontPushMob(m:Mob) { this.mobs.unshift(m); }
  next():Mob {
    this.pushMob(this.popMob());
    return this.curMob();
  }  

  removeMobB(m:Mob):boolean { 
    let ix = this.mobs.indexOf(m);
    if (ix < 0) { return false; }
    this.mobs.splice(ix,1); 
    return true;
  }
}
