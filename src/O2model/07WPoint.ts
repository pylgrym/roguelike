import { TPoint } from "O1term/03TPoint";

export class WPoint {
  constructor(public x:number=0, public y:number=0) {}
  // ch09:
  empty():boolean { return this.x == 0 && this.y == 0; } 
  plus(p:WPoint) { return this.copy().addTo(p); }
  copy():WPoint { return new WPoint(this.x, this.y); }
  addTo(b:WPoint):WPoint {
      this.x += b.x; this.y += b.y; return this;
  }
  set(n: WPoint) { this.x = n.x; this.y = n.y; }

  // ch10:
  dir(p:WPoint):WPoint { 
    return new WPoint(Math.sign(p.x-this.x), 
                      Math.sign(p.y-this.y)); 
  }
  dist(b:WPoint):number { return Math.sqrt(this.sqDist(b)); }
  sqDist(b:WPoint):number { 
    let d = this.minus(b);
    return (d.x*d.x + d.y*d.y); 
  }
  minus(b:WPoint):WPoint { return new WPoint(this.x-b.x, this.y-b.y); }

  // ch13:
  eq(b:WPoint):boolean { 
    return b.x ==  this.x && b.y == this.y;
  }

  // ch33:
  rotateCW() :WPoint { return new WPoint(-this.y, this.x); }
  rotateCCW():WPoint { return new WPoint( this.y,-this.x); }
  outside(dim:WPoint):boolean {
    return (this.x<0||this.y<0||this.x>=dim.x||this.y>=dim.y);
  }

  static StockDims = new WPoint(
    TPoint.StockDims.x,TPoint.StockDims.y);
}
