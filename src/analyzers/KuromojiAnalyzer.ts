const kuromoji = require('kuromoji')
const { Tokenizer } = kuromoji
type KuromojiTokenizer = typeof Tokenizer

const PATH_TO_KUROMOJI_DICT = 'node_modules/kuromoji/dict/'

export type KuromojiToken = {
  surfaceForm: string
  position: string
  reading: string
  pronunciation: string
}

export type KuromojiTokenizedResult = {
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
  word_id: number
  word_type: 'KNOWN' | string // not sure of more possible values yet
  word_position: number
}

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
    *     'surfaceForm': '黒白',       // 表層形
    *     'position': '名詞',          // 品詞 (part of speech)
    *     'reading': 'クロシロ',        // 読み
    *     'pronunciation': 'クロシロ',  // 発音
    * }]
    */
  async analyze(text: string = ''): Promise<KuromojiToken[]> {
    if (text.trim() === '') {
      return []
    }

    const kuromojiTokenizer: KuromojiTokenizer = await this.getKuromojiTokenizer()
    const results: KuromojiTokenizedResult[] = kuromojiTokenizer.tokenize(text)
    return results.map((tr: KuromojiTokenizedResult) => {
      return {
        surfaceForm: tr.surface_form,
        position: tr.pos,
        reading: tr.reading,
        pronunciation: tr.pronunciation,
      }
    })
  }
}

