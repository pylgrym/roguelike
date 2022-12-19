import { Term } from "./03Term";
import { TestTerm } from "./03TestTerm";
import { RawScreenIF } from "./04RawScreenIF";

export class RawTestScreen implements RawScreenIF {
  name='test1';
  key:string='-';
  onKey(e:JQuery.KeyDownEvent){this.key=`?:${e.key}`;}
  draw(term:Term) { TestTerm.test2(term,this.key); }

  onTime():boolean{return false;} // ch27
}
