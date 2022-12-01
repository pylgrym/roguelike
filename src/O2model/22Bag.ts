import { Obj } from "./21Obj";

export class Bag {
    objs:Obj[] = [];
    len():number{return this.objs.length;}
    add(o:Obj){this.objs.push(o);}
    removeIx(ix:number) { 
      this.objs.splice(ix,1); 
    }
}  
