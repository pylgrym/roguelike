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

  static StockDims = new WPoint(
    TPoint.StockDims.x,TPoint.StockDims.y);
}
