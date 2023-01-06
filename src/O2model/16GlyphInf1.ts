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
  static ensureInit:number = GlyphMap1.initGlyphs(false); 
  static initGlyphs(hasDragon:boolean):number {
    this.glyphs = [];
    let bg = 1 ? '#fff' : 'black';
    if (hasDragon) { bg = '#201540'; }

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

		add(bg,    '#bf8',   'd',Glyph.Dog); // ch20
		add(bg,    '#bf8',   'e',Glyph.Eye); 
		add(bg,    '#bf8',   'f',Glyph.Frog); 
		add(bg,    '#bf8',   'g',Glyph.Golem); 
		add(bg,    '#bf8',   'h',Glyph.Harpy); 
		add(bg,    '#bf8',   'i',Glyph.Imp); 
		add(bg,    '#bf8',   'j',Glyph.Jackal);
		add(bg,    '#bf8',   'k',Glyph.Kobold);
		add(bg,    '#bf8',   'l',Glyph.Lich); 
		add(bg,    '#bf8',   'm',Glyph.Mold); 
		add(bg,    '#bf8',   'n',Glyph.Naga); 
		add(bg,    '#bf8',   'o',Glyph.Orc); 
		add(bg,    '#bf8',   'p',Glyph.Pirate); 
		add(bg,    '#bf8',   'q',Glyph.Quasit); 
		add(bg,    '#bf8',   'r',Glyph.Rat); 
		add(bg,    '#bf8',   's',Glyph.Snake); 
		add(bg,    '#bf8',   't',Glyph.Troll); 
		add(bg,    '#bf8',   'u',Glyph.UmberHulk); 
		add(bg,    '#bf8',   'v',Glyph.Vampire); 
		add(bg,    '#bf8',   'w',Glyph.Worm); 
		add(bg,    '#bf8',   'x',Glyph.Xorn); 
		add(bg,    '#bf8',   'y',Glyph.Yeti); 
		add(bg,    '#bf8',   'z',Glyph.Zombie); 

    add(bg,    '#294',   'S',Glyph.Sheep); 
    add(bg,    'red',    'D',Glyph.Dragon); 
    
    add(bg,    'orange', '>',Glyph.StairsDown); // ch13
    add(bg,    'orange', '<',Glyph.StairsUp);
      
    add(bg,    'orange', ',',Glyph.Door_Open);  // ch15
    add(bg,    'orange', '+',Glyph.Door_Closed);

    add(bg,    'blue',   '-',Glyph.Dagger); // ch21
    add(bg,    'red',    '(',Glyph.Shield);
    add(bg,    'purple', '(',Glyph.Cap);
    add(bg,    'lime',   '(',Glyph.Gloves);
    add(bg,    'blue',   '(',Glyph.Cape);
    add(bg,    'cyan',   '(',Glyph.Leggings);
    add(bg,    'pink',   '(',Glyph.Boots);
   
    add(bg,    'blue',   '🌟',Glyph.Bullet); // ch27 

    add(bg,    'blue',   '🔥',Glyph.Fire1); // ch30 
    add('yellow','blue', '🔥',Glyph.Fire2); // ch30 
    add('orange','blue', '🔥',Glyph.Fire3); // ch30 

    add(bg,    'blue',   '!',Glyph.Potion); // ch28
    add(bg,    'yellow', '?',Glyph.Scroll); 
    add(bg,    'red',    '-',Glyph.Wand); 
     
    //*✵🌟🌠✵✴❃✫🔯❂ 
    // https://unicode-table.com/en/sets/star-symbols/

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

  // ch20:
  static max:number = Object.keys(Glyph).length / 2;
  static ix2glyph(ix:number):Glyph {
    if (ix<0) { throw `ix ${ix} is less than 0!`; }
    if (ix>=this.max) { throw `ix ${ix} >= ${this.max}!`; } // dies on level43!
    let g:Glyph = <Glyph> ix;
    return g;
  }  
}
