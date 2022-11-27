import { WPoint } from "./07WPoint";

export class RndRoot {
  constructor(public seed:number){}
  getSeed():number { return this.seed; }
  setSeed(newSeed: number) { this.seed = newSeed; }
  srand():number { 
    this.seed = (this.seed * 9301 + 49297) % 233280; 
    var rn = this.seed / 233280;
    return rn;
  }
}

export class RndBase extends RndRoot {
  rnd(lower:number,higher:number=0):number { 
    var range, draw, roll;
    if (!higher) { 
      // If you only specify first arg, 
      // it's 0-N (N not included.)
      higher = lower;
      lower = 0;
    }
    if (lower > higher){
      let swap = lower; lower = higher; higher = swap;
    }
    range = (higher-lower);
    draw = this.srand()*range; 
    roll = Math.floor(draw) + lower;
    return roll;
  }
  // Includes upper limit:
  rndC(lower:number,higher:number):number { 
      return this.rnd(lower,higher+1); 
  }  
  oneIn(N:number):boolean { return (this.rnd(N) == 0); }
}

// (We must present it as the name Rnd,
// which will later become a more complete version.)
export class Rnd extends RndBase { 
  //ch14:
  rndDir2():WPoint {  // Never makes zero-zero.
    let a = this.rndC(-1,1);
    let b = this.oneIn(2) ? 1 : -1;
    let h = this.oneIn(2);
    return new WPoint(h ? a : b, h ? b:a);
  }
  // Two extras you can have for free:
  rndDir0():WPoint { 
    return new WPoint(this.rndC(-1,1), 
                      this.rndC(-1,1));
  }

  rndDir(p:WPoint=new WPoint()):WPoint {
    return new WPoint(p.x+this.rndC(-1,1),
                      p.y+this.rndC(-1,1));
  }

  // ch20:
  spiceUpLevel(L: number):number {	
    if (this.oneIn(3)) {
      let dir = this.oneIn(3) ? 1: -1;
      L = this.spice(L+dir, dir); 
      if (L < 0) { L = 0; } 
    } // (There are no negative levels.)
    return L;
  }
  spice(L: number, dir:number):number {
    return this.oneIn(4) ? this.spice(L+dir, dir) : L; 
  }  
}
