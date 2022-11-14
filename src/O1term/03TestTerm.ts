import { TermIF } from "./03TermIF";

export class TestTerm {
  static test(term:TermIF) {
    term.at(0,0,"a","white", "gray");
  }
  static test2(term:TermIF, str:string) {
    for (let y=0; y<term.dim.y; ++y) {
      for (let x=0; x<term.dim.x; ++x) {
        let n = (5*y*x+3*x);
        let nc = (n%26) + 'a'.charCodeAt(0);
        let c = String.fromCharCode(nc);
        let bg = '#' + ((n+ 0)%16).toString(16)
                     + ((n+ 5)%16).toString(16)
                     + ((n+10)%16).toString(16);
        term.at(x,y, c,"white", bg );
      }
    }
    term.txt(2,1,'##.##','white','black');
    term.txt(2,2,'#@.k!','white','black');
    term.txt(2,3,str,'yellow','red');
  }
}
