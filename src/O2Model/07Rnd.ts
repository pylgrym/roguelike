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
export class Rnd extends RndBase { }
