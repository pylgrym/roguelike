import { SScreenIF } from "O1term/05SScreenIF";
import { GameIF } from "O3build/08GameIF";

export interface MakerIF {
  new_Game():SScreenIF;
  gameOver():SScreenIF;
  more(game:GameIF|null):SScreenIF; // ch12
}
