const kuromoji = require('kuromoji')
const { Tokenizer } = kuromoji
type KuromojiTokenizer = typeof Tokenizer

const PATH_TO_KUROMOJI_DICT = 'node_modules/kuromoji/dict/'

type WordInfo = {
  word_id: number
  word_type: 'KNOWN' | string // not sure of more possible values yet
  word_position: number
}

type BaseKuromojiResult = {
  surface_form: string
  pos: string
  pos_detail_1: string
  pos_detail_2: string
  pos_detail_3: string
  conjugated_type: string
  conjugated_form: string
  basic_form: string
  reading: string
  pronunciation: string
}

export type KuromojiParsedResponse = BaseKuromojiResult & {
  verbose: WordInfo
}

export type KuromojiTokenizedResult = BaseKuromojiResult & WordInfo

/**
 * Kuromoji based morphological analyzer for kuroshiro
 * Based on 'kuroshiro-analyzer-kuromoji@1.1.0' by Hexen Qi
 * https://github.com/hexenq/kuroshiro-analyzer-kuromoji.git
 */
export class KuromojiAnalyzer {

  private kuromojiTokenizer: KuromojiTokenizer | undefined

  isInitialised(): boolean {
    return this.kuromojiTokenizer !== undefined
  }

  private async getKuromojiTokenizer() {
    if(!this.isInitialised()) {
      this.kuromojiTokenizer = await new Promise((resolve, reject) => {
        kuromoji
          .builder({ dicPath: PATH_TO_KUROMOJI_DICT })
          .build((err: Error, kuromojiTokenizer: KuromojiTokenizer) => {
            if (err) {
              return reject(err)
            }
            return resolve(kuromojiTokenizer)
          })
      })
    }

    return this.kuromojiTokenizer
  }

  /**
    * Parse the given string
    * @param {string} str input string
    * @returns {Promise} Promise object represents the result of parsing
    * @example The result of parsing 黒白
    * [{
    *     'surface_form': '黒白',    // 表層形
    *     'pos': '名詞',             // 品詞 (part of speech)
    *     'pos_detail_1': '一般',    // 品詞細分類1
    *     'pos_detail_2': '*',      // 品詞細分類2
    *     'pos_detail_3': '*',      // 品詞細分類3
    *     'conjugated_type': '*',   // 活用型
    *     'conjugated_form': '*',     // 活用形
    *     'basic_form': '黒白',        // 基本形
    *     'reading': 'クロシロ',        // 読み
    *     'pronunciation': 'クロシロ',  // 発音
    *     'verbose': {                 // Other properties
    *         'word_id': 413560,
    *         'word_type': 'KNOWN',
    *         'word_position': 1
    *     }
    * }]
    */
  async analyze(text = ''): Promise<KuromojiParsedResponse[]> {
    if (text.trim() === '') {
      return []
    }

    const kuromojiTokenizer: KuromojiTokenizer = await this.getKuromojiTokenizer()
    const results: KuromojiTokenizedResult[] = kuromojiTokenizer.tokenize(text)
    return results.map((tr: KuromojiTokenizedResult) => {
      return {
        surface_form: tr.surface_form,
        pos: tr.pos,
        pos_detail_1: tr.pos_detail_1,
        pos_detail_2: tr.pos_detail_2,
        pos_detail_3: tr.pos_detail_3,
        conjugated_type: tr.conjugated_type,
        conjugated_form: tr.conjugated_form,
        basic_form: tr.basic_form,
        reading: tr.reading,
        pronunciation: tr.pronunciation,
        verbose: {
          word_id: tr.word_id,
          word_type: tr.word_type,
          word_position: tr.word_position
        }
      }
    })
  }
}

