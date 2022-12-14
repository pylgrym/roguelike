import { Glyph } from "./07Glyph";

export class GlyphInf1 {
  constructor(public glyph:Glyph,
    public fg:string, public bg:string, 
    public c:string) {}
}

export class GlyphMap1 {
  static glyphs: Array<GlyphInf1> = []; 
  static bad:GlyphInf1 = 
      new GlyphInf1(Glyph.Bad,'red','yellow','?');  

  static inf(glyph:Glyph):GlyphInf1 {
    return (glyph in GlyphMap1.glyphs) 
      ? GlyphMap1.glyphs[glyph]
      : GlyphMap1.bad;    
  }
  static ensureInit:number = GlyphMap1.initGlyphs(); 
  static initGlyphs():number {
    let bg = 1 ? '#fff' : 'black';
    var add = GlyphMap1.add;
    add('red', 'yellow', '§',Glyph.Bad);
    add('#222','#282828','%',Glyph.Rock);    
    add('#444','#555555','#',Glyph.Wall);   
    add(bg,    '#123',   '.',Glyph.Floor);  
    add('#222','#282828','?',Glyph.Unknown);
    add(bg,    'orange', '@',Glyph.Ply); // ch09
    add(bg,    '#e2b',   'a',Glyph.Ant);
    add(bg,    '#43a',   'b',Glyph.Bat);
    add(bg,    '#6c4',   'c',Glyph.Cat);
    add(bg,    '#294',   'S',Glyph.Sheep); 
    
    add(bg,    'orange', '>',Glyph.StairsDown); // ch13
    add(bg,    'orange', '<',Glyph.StairsUp);
      
    add(bg,    'orange', ',',Glyph.Door_Open);  // ch15
    add(bg,    'orange', '+',Glyph.Door_Closed);

    return GlyphMap1.glyphs.length;
  }
  static add(bg:string, fg:string, c:string, g:Glyph) {
    let inf:GlyphInf1=new GlyphInf1(g,fg,bg,c);
    GlyphMap1.warn(g);
    GlyphMap1.glyphs[g] = inf;
  } 
  static warn(g:Glyph) {
    if (GlyphMap1.glyphs.length == g) { return; }
    console.log(g, 'differs from', 
      GlyphMap1.glyphs.length 
    );
  }
}
