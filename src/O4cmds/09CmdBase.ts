import { WPoint } from "O2model/07WPoint";
import { CmdIF } from "./09CmdIF";

export abstract class CmdBase implements CmdIF {
  exc(): boolean { throw 'no exc'; }
  setDir(dir: WPoint):CmdIF {throw 'no setDir';} // ch15
}
