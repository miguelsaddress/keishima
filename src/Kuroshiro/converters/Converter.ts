import { KuromojiToken } from '../KuromojiAnalyzer'

export interface Converter {
  convert(tokens: KuromojiToken[]): string
}