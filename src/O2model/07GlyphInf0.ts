import { Glyph } from "./07Glyph";

export class GlyphInf0 {
  constructor(public glyph:Glyph,public c:string){}
}

export class GlyphMap0 {
  static glyphs: Array<GlyphInf0> = []; 
  static bad:GlyphInf0 = new GlyphInf0(Glyph.Bad,'?');  
  static inf(glyph:Glyph):GlyphInf0 {
    return (glyph in GlyphMap0.glyphs) 
      ? GlyphMap0.glyphs[glyph]
      : GlyphMap0.bad;    
  }
  static ensureInit:number = GlyphMap0.initGlyphs(); 
  static initGlyphs():number {
    var add = GlyphMap0.add;
    add('§',Glyph.Bad);
    add('%',Glyph.Rock);    
    add('#',Glyph.Wall);   
    add('.',Glyph.Floor);  
    add('?',Glyph.Unknown);

    add('@',Glyph.Ply); // ch09
    add('a',Glyph.Ant);
    add('b',Glyph.Bat);
    add('c',Glyph.Cat);
		add('S',Glyph.Sheep); 
    
    add('>',Glyph.StairsDown); // ch13
    add('<',Glyph.StairsUp);
      
    return GlyphMap0.glyphs.length;
  }
  static add(c:string, g:Glyph) {
    let inf:GlyphInf0=new GlyphInf0(g,c);
    GlyphMap0.warn(g);
    GlyphMap0.glyphs[g] = inf;
  } 
  static warn(g:Glyph) {
    if (GlyphMap0.glyphs.length == g) { return; }
    console.log(g, 'differs from', 
      GlyphMap0.glyphs.length 
      );
  }
}
