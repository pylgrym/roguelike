import { Term } from "./03Term";
import { TPoint } from "./03TPoint";

export class ResizingTerm extends Term {
  public reinitCtx() { this.ctx = this.initCtx(); }

  public resize(w_px:number, h_px:number) {
    let tx = Math.floor(w_px / this.dim.x);
    let ty = Math.floor(h_px / this.dim.y);
    let side_cand = (tx > ty ? ty : tx);
    this.side = side_cand;
    this.reinitCtx();
  }

  public onResize() {
    let w = window.innerWidth;
    let h = window.innerHeight;
    $('#canvas1').prop('width',  w);
    $('#canvas1').prop('height', h);
    this.resize(w,h);
  }
    
  public static StockTerm():ResizingTerm { 
    return new ResizingTerm(TPoint.StockDims); 
  }
}