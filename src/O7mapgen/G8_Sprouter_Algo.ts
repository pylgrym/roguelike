import { Rnd } from "O2model/07Rnd";
import { WPoint } from "O2model/07WPoint";
import { MapDrawerIF } from "./33MapDrawerIF";
import { Dir, Dirs } from "./Dir";
import { Surface } from "./Surface";
import { SurfaceIF, Tile } from "./SurfaceIF";

class Leg { 
  constructor(public s:WPoint, public e:WPoint, public dir:Dir,
              public d:WPoint, public len:number){} 
}
class Room { 
  a:WPoint = new WPoint(); b:WPoint = new WPoint(); 
  ways:Dir[] = [];  
  constructor(rnd:Rnd){ this.addRndDirs(rnd); }     
  hasWays():boolean { return !!this.ways.length; }
  addRndDirs(rnd:Rnd) { 
    for (let i=0; i<4;++i) {this.addRndDir(rnd);} 
  }
  addRndDir(rnd:Rnd) { this.ways.push(this.rndDir(rnd)); }
  rndDir(rnd:Rnd):Dir { 
    return [Dir.N,Dir.E,Dir.S,Dir.W][rnd.rnd(4)]; 
  }
  w():number {return this.b.x-this.a.x;}
  h():number {return this.b.y-this.a.y;}
  normalize():Room {
    if (this.a.x > this.b.x) { 
      var swap = this.a.x; this.a.x = this.b.x; this.b.x = swap; 
    }
    if (this.a.y > this.b.y) { 
      var swap = this.a.y; this.a.y = this.b.y; this.b.y = swap; 
    }
    return this;
  }
}
class Queue { 
  q_:Array<Room> = [];
  empty():boolean { return !this.q_.length; }
  rndIx(rnd:Rnd):number { return rnd.rnd(this.q_.length); }
  remove(ix:number) { this.q_.splice(ix,1); }
  add(r:Room) { this.q_.push(r); }
}

export class G8_Sprouter_Algo {
  q:Queue = new Queue();
  dim:WPoint;
  surface:SurfaceIF;
  constructor(public s:MapDrawerIF,
              public rnd:Rnd) {
    this.dim = s.dim
    this.surface = new Surface(s,this.rnd);    
  } 
  run() { 
    this.addFirstRoom(this.dim);        
    while (!this.q.empty()) { this.step(); } 
  }
  step():boolean {
    let i_room = this.q.rndIx(this.rnd);
    let room = this.q.q_[i_room];
    this.growWay(room);
    if (!room.hasWays()) { this.q.remove(i_room); }
    return !this.q.empty();
  }
  addFirstRoom(dim:WPoint) {
    let c = new WPoint( Math.floor(dim.x*0.5), 
                        Math.floor(dim.y*0.5));  
    let ex = new WPoint(4,4);
    let f = new Room(this.rnd); 
    f.a = c.minus(ex); 
    f.b = c.plus(ex);
    this.addRoom(f);
  }
  v:boolean = true;
  addRoom(r:Room) {
    if (this.v) { 
      console.log( 
        `add room (${r.a.x},${r.a.y})-(${r.b.x},${r.b.y})`
      ); 
    }
    this.q.add(r); 
    this.surface.box(r.a, r.b, Tile.C_WALL); 
  }
  growWay(room:Room) {
    let way:Dir|undefined = room.ways.pop();
    let L = this.suggestLeg(way, room);
    let outside = L.e.outside(this.dim);
    if (this.v) { 
      console.log( 
      `leg ${Dirs.ldirs[L.dir]} (${L.s.x},${L.s.y})->(${L.e.x},${L.e.y}), out?${outside}`
      ); 
    }
    if (outside) { return; }
    let r = this.suggestRoom(L);
    if (this.surface.box_empty(r.a, r.b)) {
      this.addRoom(r);
      this.drawTunnel(L);    
    } else { 
      let quickDirtyLoops = true;
      if (quickDirtyLoops && this.rnd.rnd(3)<2) { 
        this.drawTunnel(L); 
      }
      this.collisions.push(L); 
    }
  }    
  drawTunnel(L:Leg) {
    this.surface.tunnel(L.s, L.e, Tile.C_CORRFLOOR);
    // supporting walls only needed for longer halls.
    if (L.len<=1) { return; } 
    let RH = L.d.rotateCW();
    let s0 = L.s.plus(L.d);
    let s1 = s0.plus(RH);
    let s2 = s0.minus(RH);

    let e0 = L.e.minus(L.d);
    let e1 = e0.plus(RH);
    let e2 = e0.minus(RH);
    if (this.v) {
      console.log( `leg1(${s1.x},${s1.y})->(${e1.x},${e1.y})`); 
    }
    if (this.v) {
      console.log( `leg2(${s2.x},${s2.y})->(${e2.x},${e2.y})`); 
    }
    this.surface.tunnel(s1, e1, Tile.C_HALLWALL);
    this.surface.tunnel(s2, e2, Tile.C_HALLWALL);
  }
  collisions:Leg[] = [];    
  suggestLeg(way:Dir|undefined, room:Room):Leg {
    // Propose random corridor out from room.
    if (way == undefined) { 
      throw 'suggestLeg called with undefined dir.'; 
    }
    let len = this.rnd.rnd(1,4); 
    let EW = Dirs.isEW(way);
    let offset = this.rnd.rnd(1, EW ? room.w()-2 : room.h()-2);
    let s = new WPoint();
    switch (way) {
    case Dir.E: s.x=room.b.x;       s.y=room.a.y+offset; break;
    case Dir.W: s.x=room.a.x;       s.y=room.a.y+offset; break;
    case Dir.S: s.x=room.a.x+offset;s.y=room.b.y;        break;
    case Dir.N: s.x=room.a.x+offset;s.y=room.a.y;        break;
    }
    let d = Dirs.dirs[way];
    let e = new WPoint(s.x+d.x*len, s.y+d.y*len);
    return new Leg(s,e,way, d, len);
  }
  suggestRoom(L:Leg):Room { // make room at end of tunnel.
    let w=this.rnd.rnd(3,6); let h=this.rnd.rnd(3,6); 
    // again, push inwards:
    let noff = this.rnd.rnd(1,h-1); // N_orth and R_ight.
    let roff = (h-noff);
    let south = L.d.rotateCW();
    let r = new Room(this.rnd);
    r.a.x = L.e.x + south.x*(-noff);
    r.a.y = L.e.y + south.y*(-noff);
    r.b.x = L.e.x + L.d.x*w + south.x*roff;
    r.b.y = L.e.y + L.d.y*w + south.y*roff;
    return r.normalize();
  }    
}
