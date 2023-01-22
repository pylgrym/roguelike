import { DMap } from "O2model/07DMap";
import { DMapIF } from "O2model/07DMapIF";
import { Glyph } from "O2model/07Glyph";
import { Rnd } from "O2model/07Rnd";
import { TestMap } from "O2model/07TestMap";
import { WPoint } from "O2model/07WPoint";
import { Mob } from "O2model/09Mob";
import { BaseMap } from "O7mapgen/33BaseMap";
import { MapDrawerIF as DrawIF} from "O7mapgen/33MapDrawerIF";
import { G0_BrokenColumns_Algo } from "O7mapgen/G0_BrokenColumns_Algo";
import { G1_HorzVert_Algo } from "O7mapgen/G1_HorzVert_Algo";
import { G2_RndBox_Algo } from "O7mapgen/G2_RndBox_Algo";
import { G3_GridBox_Algo } from "O7mapgen/G3_GridBox_Algo";
import { G4_Maze_Algo } from "O7mapgen/G4_Maze_Algo";
import { G6_CaveIn } from "O7mapgen/G6_CaveIn";
import { G7_BoxGrow_Algo } from "O7mapgen/G7_BoxGrow_Algo";
import { G8_Sprouter_Algo } from "O7mapgen/G8_Sprouter_Algo";
import { G9_BSP_Algo } from "O7mapgen/G9_BSP_Algo";

export class LevelMaker {
  constructor(public rnd:Rnd){}
  make(level:number,dim:WPoint,
       dragonLevel:number): DMapIF {     
    let m:DMapIF = new DMap(dim,Glyph.Unknown,level);
    let s = new BaseMap(m.dim,m);
    switch (level%10) {
    case  0: this.genMap0_brokCol8(s); break;
    case  1: this.genMap1_horzVert9(s); break;
    case  2: this.genMap2_rndBox(s); break;
    case  3: this.genMap3_grid(s); break;
    case  4: this.genMap4_maze(s); break;
    case  5: this.genMap5_both(s); break;
    case  6: this.genMap6_caveIn(s); break;
    case  7: this.genMap7_boxGrow(s); break;
    case  8: this.genMap8_sprout(s); break;
    case  9: this.genMap9_bsp(s); break;
    }
    return m;
  } 
  genMap0_brokCol8(s:DrawIF){ 
    new G0_BrokenColumns_Algo().run(s.dim,this.rnd,s); }
  genMap1_horzVert9(s:DrawIF){ 
    new G1_HorzVert_Algo().run(s.dim,this.rnd,s); }
  genMap2_rndBox(s:DrawIF){ 
    s.fillMap(Glyph.Wall); 
    new G2_RndBox_Algo(s).run(s.dim,this.rnd); }
  genMap3_grid(s:DrawIF){ 
    new G3_GridBox_Algo(s).run(this.rnd,s.dim,2); }
  genMap4_maze(s:DrawIF){ 
    new G4_Maze_Algo(s,this.rnd, s.dim).run(this.rnd); }
  genMap5_both(s:DrawIF){ 
    this.genMap3_grid(s); this.genMap4_maze(s); }
  genMap6_caveIn(s:DrawIF) {
    this.genMap5_both(s); new G6_CaveIn(s).run(s.dim); }
  genMap7_boxGrow(s:DrawIF){ 
    new G7_BoxGrow_Algo(s,s.dim).run(this.rnd); }
  genMap8_sprout(s:DrawIF){ 
    new G8_Sprouter_Algo(s,this.rnd).run(); }
  genMap9_bsp(s:DrawIF){ 
    new G9_BSP_Algo(s,this.rnd).run(s.dim); }  
}
