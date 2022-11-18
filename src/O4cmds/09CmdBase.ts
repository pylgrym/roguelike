import { CmdIF } from "./09CmdIF";

export abstract class CmdBase implements CmdIF {
  exc(): boolean { throw 'no exc'; }
}
