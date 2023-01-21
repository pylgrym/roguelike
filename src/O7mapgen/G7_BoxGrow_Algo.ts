import { Glyph } from "O2model/07Glyph";
import { Rnd } from "O2model/07Rnd";
import { WPoint } from "O2model/07WPoint";
import { MapBuilder } from "./33MapBuilder";
import { MapDrawerIF } from "./33MapDrawerIF";
import { Dir, Dirs } from "./Dir";

class GA_Rect {
  public UL:WPoint; public BR:WPoint;
  ways: Dir[] = [Dir.N, Dir.E, Dir.S, Dir.W];
  constructor(c:WPoint){ this.UL = c.copy(); this.BR = c.copy(); }
  UR():WPoint {return new WPoint(this.BR.x, this.UL.y);}
  BL():WPoint {return new WPoint(this.UL.x, this.BR.y);}
  removeWay(ix:number) { this.ways.splice(ix,1); }
  growDir(dir:Dir) { switch (dir) { 
    case Dir.N: --this.UL.y; break; 
    case Dir.E: ++this.BR.x; break; 
    case Dir.S: ++this.BR.y; break; 
    case Dir.W: --this.UL.x; break; 
  } }
  getSide(dir:Dir):WPoint[] { switch (dir) {
    case Dir.N: return [this.UL, this.UR()];
    case Dir.E: return [this.UR(), this.BR];
    case Dir.S: return [this.BL(), this.BR];
    case Dir.W: return [this.UL, this.BL()];            
    default: throw 'bad dir';
  } }
}

export class G7_BoxGrow_Algo {
  pool: GA_Rect[] = [];
  finished: GA_Rect[] = [];
  constructor(public dm:MapDrawerIF, public dim:WPoint) {}    
  calcSeeds(dim:WPoint):number {
    let area = dim.x * dim.y;
    return Math.ceil(area*0.02);
  }
  initPool(r:Rnd) {
    let seeds = this.calcSeeds(this.dim);
    for (let i=seeds;--i>0;) { this.rndSeed(r,this.dim); } 
  }
  rndSeed(r:Rnd,dim:WPoint) { 
    this.addSeed(new WPoint(r.rnd(dim.x), r.rnd(dim.y)));
  }
  addSeed(p:WPoint) { 
    this.pool.push(new GA_Rect(p)); 
    this.draw(p,p);
  }
  run(rnd:Rnd) {
    MapBuilder.addFence(this.dm.map,Glyph.Wall,Glyph.Floor);
    this.initPool(rnd);
    this.dm.render();
    while (this.pool.length>0) {            
      let ix = this.pickRectIx(rnd);
      //console.log('pool:', this.pool.length, 'pick:',ix);
      this.growRect(ix, this.pool[ix],rnd);  
    }
  }
  pickRectIx(r:Rnd):number { return r.rnd(this.pool.length); }
  growRect(ix:number, rect:GA_Rect, r:Rnd) {
    let dirIx = this.pickDirIx(rect, r);
    this.growSide(dirIx, rect.ways[dirIx], rect, ix);
    if (rect.ways.length==0) { 
      this.removeRect(ix); 
      this.finished.push(rect);
    }
  }
  pickDirIx(rect:GA_Rect, r:Rnd) {
    return r.rnd(rect.ways.length);
  }
  growSide(dirIx:number, dir:Dir, rect:GA_Rect, ix:number) {
    if (dir == undefined) {
      throw `bad ${dirIx} ${rect.ways.length}`;
    }
    let grew = this.grow(rect,dir); 
    if (!grew) { rect.removeWay(dirIx); }
  }
  removeRect(ix:number){ this.pool.splice(ix,1); }
  grow(r:GA_Rect, dir:Dir):boolean {
    let s = r.getSide(dir);
    let d = Dirs.dirs[dir];    
    // 1 out. // c=candidate.
    let c1 = s[0].plus(d), c2 = s[1].plus(d); 
    // 2 out. // b=buffer.
    let b1 =   c1.plus(d), b2 =   c2.plus(d); 
    this.adjustBuffer(b1,b2,dir);
    if (!this.is_free(b1,b2)|| !this.is_free(c1,c2)) { return false; }
    r.growDir(dir);
    this.draw(c1,c2);
    return true;
  }    
  is_free(e:WPoint, f:WPoint):boolean {  
    let dm = this.dm;
    for (let p = e.copy(); p.y <= f.y; ++p.y) {
      for (p.x = e.x; p.x <= f.x; ++p.x) {
        if (!dm.legal(p)) { return false; }
        if (dm.get(p) != Glyph.Floor) { return false; }
      }
    }
    return true; 
  }
  draw(i:WPoint, j:WPoint) { 
    for (let p=i.copy(); p.y <= j.y; ++p.y) {
      for (p.x = i.x; p.x <= j.x; ++p.x) { 
        this.dm.setp(p, Glyph.Wall); 
      }
    }
  }
  adjustBuffer(a:WPoint, b:WPoint, dir:Dir) {
    switch (dir){
      case Dir.S: case Dir.N: --a.x; ++b.x; break;
      case Dir.W: case Dir.E: --a.y; ++b.y; break;
    }
  }
}
