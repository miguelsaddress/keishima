import { NormalOrSpacedConverter } from './NormalOrSpacedConverter'

export class SpacedConverter extends NormalOrSpacedConverter {
  protected getCharactersJoiner(): string {
    return ' '
  }

}