import { KuromojiToken } from '../../analyzers/KuromojiAnalyzer'

export interface Converter {
  convert(tokens: KuromojiToken[]): string
}