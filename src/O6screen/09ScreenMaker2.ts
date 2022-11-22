import { Stack } from "O1term/05ScreenStack";
import { SScreenIF } from "O1term/05SScreenIF";
import { GameIF } from "O3build/08GameIF";
import { BuildIF1 } from "O3build/09BuildIF1";
import { OverScreen0 } from "./06OverScreen";
import { MakerIF } from "./06ScreenMakerIF";
import { GameScreen } from "./09GameScreen";
import { MoreScreen } from "./12MoreScreen";

export class ScreenMaker2_Fixed implements MakerIF {
  game:GameIF|null = null;
  constructor(public build:BuildIF1) {}
  
  gameOver():SScreenIF { return new OverScreen0(this); }
  new_Game():SScreenIF { 
    this.game = this.build.makeGame();
    return new GameScreen(<GameIF>this.game, this); 
  }

  // ch12:
  more(game:GameIF|null):SScreenIF { 
    return new MoreScreen(<GameIF>game,this); 
  }

  static run_Gfirst(m:MakerIF) {
    Stack.run_SScreen(m.new_Game());
  }

  static StockMaker(build:BuildIF1):MakerIF {
    return new ScreenMaker2_Fixed(build);
  }

  static Gfirst(build:BuildIF1) {
    this.run_Gfirst(this.StockMaker(build));
  }  
}
