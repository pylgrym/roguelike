import { TermIF } from "./03TermIF";
import { TPoint } from "./03TPoint";

export class Term implements TermIF {
  ctx: CanvasRenderingContext2D;
  hside: number = 1;// ie undef.
  vside: number = 1;  
  side:  number = 40; // (pixels)
  scale: number = 0.8;  

  constructor(public dim:TPoint) { 
    this.ctx = this.initCtx(); 
  }
  
  initCtx(): CanvasRenderingContext2D {
    let cnv = <HTMLCanvasElement>
      document.getElementById("canvas1");
    let ctx = <CanvasRenderingContext2D>
        cnv.getContext("2d");
    // controls how non-square:
    this.hside = this.side*1.0; 
    this.vside = this.side*1.0;

    let squeeze:number=this.side*this.scale;
    ctx.fillStyle = "#110";
    ctx.strokeStyle = "red";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = `${squeeze}px sans-serif`; 
    return ctx;
  }    
  public static StockTerm():Term { 
      return new Term(TPoint.StockDims); 
  }  
  txt(x:number, y:number, s: string, 
       fg:string, bg:string
  ) {
    for (let i=0; i<s.length; ++i) {
      this.at(x,y,s.charAt(i), fg,bg);
      ++x;
      if (x >= this.dim.x) {
        x=0; ++y;
        if (y >= this.dim.y) { y=0; }
      }
    }
  }
  at(x:number,y:number,char:string,fg:string,bg:string){
    let fx = (x    )*this.hside, 
        fy = (y    )*this.vside;
    let px = (x+0.5)*this.hside, 
        py = (y+0.5)*this.vside;

    this.ctx.save();
    {
      this.ctx.fillStyle = bg;
      this.ctx.fillRect(fx,fy,this.hside,this.vside);

      this.ctx.beginPath();
      this.ctx.rect(fx,fy,this.hside, this.vside);
      this.ctx.clip();

      this.ctx.fillStyle = fg;
      this.ctx.fillText(char, px, py);
    }
    this.ctx.restore();
  }
}
