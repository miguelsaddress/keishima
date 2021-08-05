import { KuromojiParsedResponse } from '../../analyzers/KuromojiAnalyzer'
import { ConvertOptions } from '../Kuroshiro'
import { Converter } from './Converter'

export class NullConverter implements Converter {
  constructor(private options: ConvertOptions, private tokens: KuromojiParsedResponse[]) {}

  public convert(): string {
    return ''
  }
}