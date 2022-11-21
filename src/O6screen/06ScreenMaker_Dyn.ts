import { Stack } from "O1term/05ScreenStack";
import { SScreenIF } from "O1term/05SScreenIF";
import { MakerIF } from "./06ScreenMakerIF";
import { DummyScreen } from "./06DummyScreen";
import { OverScreen0 } from "./06OverScreen";
import { GameIF } from "O3build/08GameIF";
import { BuildIF1 } from "O3build/09BuildIF1";

//export interface GameIF {} // ch09:replaced
//export interface BuildIF1 {makeGame():GameIF}

export class ScreenMaker1_Dyn implements MakerIF {
  game:GameIF|null = null;
  
  constructor(
    public build:BuildIF1,
    public gameScreen:(game:GameIF,sm:MakerIF)=>SScreenIF,
    public overScreen:(game:GameIF,sm:MakerIF)=>SScreenIF,
    public init:(sm:MakerIF)=>SScreenIF
  ) {}

  new_Game():SScreenIF {
    this.game = this.build.makeGame();
    return this.gameScreen(<GameIF>this.game, this);
  }
  gameOver():SScreenIF {
    return this.overScreen(<GameIF>this.game, this);  
  }
  more(game:GameIF|null):SScreenIF { return new DummyScreen(this);}


  static runDyn(dyn_gs:ScreenMaker1_Dyn) {
    Stack.run_SScreen(dyn_gs.init(dyn_gs));
  }
  static runBuilt_GOfirst(build:BuildIF1) {
    let dyn_gs:ScreenMaker1_Dyn = new ScreenMaker1_Dyn(
      build,
      (g:GameIF,sm:MakerIF) => new DummyScreen(sm),
      (g:GameIF,sm:MakerIF) => new OverScreen0(sm),
      (sm:MakerIF) => sm.gameOver()
    );
    this.runDyn(dyn_gs);        
  }
}
