import { NormalOrSpacedConverter } from './NormalOrSpacedConverter'

export class NormalConverter extends NormalOrSpacedConverter {
  protected getCharactersJoiner(): string {
    return ''
  }

}