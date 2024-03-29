import { DMapIF } from "O2model/07DMapIF";
import { Glyph } from "O2model/07Glyph";
import { Rnd } from "O2model/07Rnd";
import { WPoint } from "O2model/07WPoint";
import { Obj } from "O2model/21Obj";
import { Slot } from "O2model/21Slot";
import { Spell } from "O4cmds/29Spell";

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
  {g: Glyph.Boots,   s:Slot.Feet },

  {g: Glyph.Potion,  s:Slot.NotWorn},
  {g: Glyph.Scroll,  s:Slot.NotWorn},
  {g: Glyph.Wand,    s:Slot.NotWorn},
  ]    
  
  static ixForGlyph(g:Glyph):number {
    return this.objtypes.findIndex(t => t.g == g);
  }

  // PLACES objects:
  static addObjTypeToMap(p:WPoint, map:DMapIF, rnd:Rnd,
                         objType:Glyph, level:number):Obj 
  { 
    let ix = this.ixForGlyph(objType);
    let tmpl:ObjTypeIF = ObjTypes.getTmpl(ix);
    let obj = this.makeTemplateObj(level,rnd,tmpl);
    map.addObj(obj,p); 
    return obj;
  }
  static addRndObjForLevel(p:WPoint, map:DMapIF, 
        rnd:Rnd, level:number):Obj 
  { 
    let obj = this.rndLevelObj(level,rnd);
    map.addObj(obj,p); 
    return obj;
  }

  // ch29:
  static getRndTemplate(r:Rnd):ObjTypeIF {
    let ix = r.rnd(ObjTypes.objtypes.length);
    let tmpl:ObjTypeIF = ObjTypes.getTmpl(ix);
    return tmpl;
  }
  static rareWands(level:number,r:Rnd):Obj {
    for(;;) {
      let t = this.getRndTemplate(r);
      if (t.g == Glyph.Wand) {
        if (!r.pct(level*3)) { continue; }
      }
      return this.makeTemplateObj(level,r,t);
    }
  }
  // MAKES objects:
  static rndLevelObj(level:number, r:Rnd):Obj {
    //let ix = r.rnd(ObjTypes.objtypes.length);
    //let tmpl:ObjTypeIF = ObjTypes.getTmpl(ix);
    //return this.makeTemplateObj(level,r,tmpl);
    return this.rareWands(level,r);
  }
  static makeTemplateObj(level:number, rnd:Rnd, 
                         tmpl:ObjTypeIF):Obj {
    let objLevel = rnd.spiceUpLevel(level);
    let obj = new Obj(tmpl.g, tmpl.s);
    obj.level = objLevel;
    // ch28:
    if (obj.g == Glyph.Wand) {
      obj.charges = rnd.rnd(1,level);
    }
    // ch29:
    switch (obj.g) {
      case Glyph.Potion:
      case Glyph.Scroll:
      case Glyph.Wand:
        this.setItemSpell(obj,rnd);
    }
    return obj;
  } 
  static setItemSpell(o:Obj,r:Rnd) {
    let L = r.spiceUpLevel(o.level);
    o.spell = this.spellForLevel(L);
  }
  static MaxSpell:number = Spell.None;
  static spellForLevel(L:number):Spell {
    let s:Spell = L % this.MaxSpell;
    return s;
  }

  static getTmpl(ix:number):ObjTypeIF {
    let len = ObjTypes.objtypes.length;
    if (ix < 0 || ix >= len) { 
      throw `bad ix:${ix}, not ${len}`; 
    }
    return ObjTypes.objtypes[ix];
  }
}
