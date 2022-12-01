import { DMapIF } from "O2model/07DMapIF";
import { Glyph } from "O2model/07Glyph";
import { Rnd } from "O2model/07Rnd";
import { WPoint } from "O2model/07WPoint";
import { Obj } from "O2model/21Obj";
import { Slot } from "O2model/21Slot";

export interface ObjTypeIF {
  g:Glyph;
  s:Slot;
}

export class ObjTypes {
  static objtypes:ObjTypeIF[] = [
  {g: Glyph.Dagger,  s:Slot.MainHand},
  {g: Glyph.Shield,  s:Slot.OffHand },
  {g: Glyph.Cap,     s:Slot.Head },
  {g: Glyph.Gloves,  s:Slot.Hands},
  {g: Glyph.Cape,    s:Slot.Back },
  {g: Glyph.Leggings,s:Slot.Legs },
  {g: Glyph.Boots,   s:Slot.Feet }
  ]    

  static addRndObjToMap(p:WPoint, map:DMapIF, rnd:Rnd):Obj { 
    let obj = this.rndLevelObj(map.level, rnd);
    map.addObj(obj,p); 
    return obj;
  }
  static rndLevelObj(level:number, rnd:Rnd):Obj {
    let objLevel = rnd.spiceUpLevel(level);
    let ix = rnd.rnd(ObjTypes.objtypes.length);
    let tmpl:ObjTypeIF = ObjTypes.getTmpl(ix);
    let obj = new Obj(tmpl.g, tmpl.s);
    obj.level = objLevel;
    return obj;
  }
  static getTmpl(ix:number):ObjTypeIF {
    let len = ObjTypes.objtypes.length;
    if (ix <0 || ix >= len) { 
        throw `bad ix:${ix}, not ${len}`; 
      }
    return ObjTypes.objtypes[ix];
  }
  
}
