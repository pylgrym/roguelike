import { TPoint } from "./03TPoint";

export interface TermIF {
  dim: TPoint;
  txt(x:number, y:number, c:string, 
       fg:string, bg:string):void;
  at( x:number, y:number, s:string, 
       fg:string, bg:string):void;
}
