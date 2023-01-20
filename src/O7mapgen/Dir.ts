import { WPoint } from "O2model/07WPoint";

export enum Dir {N=0,E=1,S=2,W=3}
export class Dirs {
  public static isEW(d:Dir) { 
    return d==Dir.E || d==Dir.W; 
  }
  public static dirs:WPoint[] = [ 
    new WPoint( 0,-1), 
    new WPoint( 1, 0), 
    new WPoint( 0, 1), 
    new WPoint(-1, 0) ];
  public static ldirs:string[] = 
    ['N','E','S','W'];
}
