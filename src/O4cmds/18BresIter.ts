import { WPoint } from "O2model/07WPoint";

export class BresIter {
  pixels: WPoint[] = []; 
  i:number=0; // loop var.
  longest:number=0; shortest:number=0;
  dx1:number=0; dy1:number=0; dx2:number=0; dy2:number=0;
  numerator:number=0;
  x:number=0; y:number=0;
  // The iterator interface - see iterAll2 below, for example.
  done():boolean  { return !(this.i <= this.longest);  }
  iterAll1():void  { // Use this, to fill pixels-vector.
    for (this.i=0; this.i <= this.longest; this.i++) { this.next(); }
  }
  iterAll2():void {
    var p:WPoint;
    for ( ; !this.done(); ) { p = this.next(); /* Use p */ }
    do                      { p = this.next(); } while (!this.done());
    console.log(p);
  }
  public static BresIter1(p1:WPoint, p2:WPoint):BresIter { 
    return new BresIter().init(p1.x, p1.y, p2.x, p2.y); 
  }
  public static BresIter2(x1:number, y1:number, x2:number, y2:number):BresIter { 
    return new BresIter().init(x1,y1,x2,y2); 
  }
  init(x1:number, y1:number, x2:number, y2:number):BresIter {
    // Bresenham.
    this.x = x1; this.y = y1;
    let w:number = x2 - this.x;
    let h:number = y2 - this.y;
    this.dx1 = 0; this.dy1 = 0; this.dx2 = 0; this.dy2 = 0;
    if (w < 0) { this.dx1 = -1; }
    else if (w > 0) { this.dx1 = 1; }
    if (h < 0) { this.dy1 = -1; }
    else if (h > 0) { this.dy1 = 1; }
    if (w < 0) { this.dx2 = -1; }
    else if (w > 0) { this.dx2 = 1; }
    this.longest = Math.abs(w);
    this.shortest = Math.abs(h);
    if (!(this.longest > this.shortest)) {
      this.longest = Math.abs(h);
      this.shortest = Math.abs(w);
      if (h < 0) { this.dy2 = -1; }
      else if (h > 0) { this.dy2 = 1; }
      this.dx2 = 0;
    }
    this.numerator = Math.floor(this.longest*0.5);
    this.i = 0;
    return this;
  }
  public next():WPoint {
    let curPoint:WPoint = new WPoint(this.x, this.y);
    this.pixels.push(curPoint);
    this.numerator += this.shortest;
    if (!(this.numerator < this.longest)) {
      this.numerator -= this.longest;
      this.x += this.dx1; this.y += this.dy1;
    } else {
      this.x += this.dx2; this.y += this.dy2;
    }
    ++this.i;
    return curPoint;
  }
} 
