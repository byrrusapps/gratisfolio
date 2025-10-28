import { getId } from "./getId";
import { randomNumbers } from "./randomNumbers";
import { timeElapsed } from "./timeElapsed";

interface UtilsInterface {
  getId: typeof getId;
  randomNumbers: typeof randomNumbers;
  timeElapsed: typeof timeElapsed;
}

const utils: UtilsInterface = {
  getId,
  randomNumbers,
  timeElapsed,
};

export { utils };
export type { UtilsInterface };