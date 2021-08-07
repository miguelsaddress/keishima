import { ConversionMode, Kuroshiro, Sillabary } from '../../src/Kuroshiro'
import { RomanizationSystem } from '../../src/Kuroshiro/converters/RawRomajiConverter'

describe('Kuroshiro Class Tests', () => {
  const EXAMPLE_TEXT = '感じ取れたら手を繋ごう、重なるのは人生のライン and レミリア最高！'
  const EXAMPLE_TEXT2 = 'ブラウン管への愛が足りねぇな'
  const EXAMPLE_TEXT3 = '関ヶ原の戦い'

  let kuroshiro: Kuroshiro

  beforeAll(async () => {
    kuroshiro = new Kuroshiro()
  })

  describe('Convert Kanji to Hiragana', () => {
    it.each([
      {
        text: EXAMPLE_TEXT,
        hiragana: 'かんじとれたらてをつなごう、かさなるのはじんせいのライン and レミリアさいこう！'
      },
      {
        text: EXAMPLE_TEXT2,
        hiragana: 'ブラウンかんへのあいがたりねぇな'
      },
      {
        text: EXAMPLE_TEXT3,
        hiragana: 'せきがはらのたたかい'
      }
    ])('Should respect romaji and katakana', async ({ text, hiragana }) => {
      const result = await kuroshiro.convert(text, { sillabary: Sillabary.Hiragana })
      expect(result).toEqual(hiragana)
    })
  })

  describe('Convert Kanji to Katakana', () => {
    it.each([
      {
        text: EXAMPLE_TEXT,
        katakana: 'カンジトレタラテヲツナゴウ、カサナルノハジンセイノライン and レミリアサイコウ！'
      },
      {
        text: 'あ い う え お か き く け こ さ し す せ そ た ち つ て と な に ぬ ね の は ひ ふ へ ほ ま み む め も や ゆ よ ら り る れ ろ わ を ん が ぎ ぐ げ ご ざ じ ず ぜ ぞ だ ぢ づ で ど ば び ぶ べ ぼ ぱ ぴ ぷ ぺ ぽ きゃ きゅ きょ しゃ しゅ しょ ちゃ ちゅ ちょ にゃ にゅ にょ ひゃ ひゅ ひょ みゃ みゅ みょ りゃ りゅ りょ ぎゃ ぎゅ ぎょ じゃ じゅ じょ びゃ びゅ びょ ぴゃ ぴゅ ぴょ',
        katakana: 'ア イ ウ エ オ カ キ ク ケ コ サ シ ス セ ソ タ チ ツ テ ト ナ ニ ヌ ネ ノ ハ ヒ フ ヘ ホ マ ミ ム メ モ ヤ ユ ヨ ラ リ ル レ ロ ワ ヲ ン ガ ギ グ ゲ ゴ ザ ジ ズ ゼ ゾ ダ ヂ ヅ デ ド バ ビ ブ ベ ボ パ ピ プ ペ ポ キャ キュ キョ シャ シュ ショ チャ チュ チョ ニャ ニュ ニョ ヒャ ヒュ ヒョ ミャ ミュ ミョ リャ リュ リョ ギャ ギュ ギョ ジャ ジュ ジョ ビャ ビュ ビョ ピャ ピュ ピョ'
      }
    ])('Should respect romaji and katakana', async ({ text, katakana }) => {
      const result = await kuroshiro.convert(text, { sillabary: Sillabary.Katakana })
      expect(result).toEqual(katakana)
    })

  })

  describe('Kanji to Romaji with Hepburn-Shiki system', () => {
    it('Should convert using the selected system', async () => {
      const result = await kuroshiro.convert(EXAMPLE_TEXT, { sillabary: Sillabary.Romaji, romajiSystem: RomanizationSystem.Hepburn })
      expect(result).toEqual('kanjitoretarateotsunagō,kasanarunowajinseinorain and remiriasaikō!')
    })

    it('Should be able to transliterate Kanji to Romaji with sokuon', async () => {
      const result = await kuroshiro.convert('勝手に買っちゃったんだ', { mode: ConversionMode.Spaced, sillabary: Sillabary.Romaji, romajiSystem: RomanizationSystem.Hepburn })
      expect(result).toEqual('katte ni katchatta n da')
    })

    it.each([
      {
        kanji: '東京',
        expected: 'tōkyō'
      },
      {
        kanji: '九州',
        expected: 'kyūshū'
      },
      {
        kanji: '丸の内',
        expected: 'marunouchi'
      },
      {
        kanji: '観桜',
        expected: 'kan\'ō'
      },
      {
        kanji: '呼応',
        expected: 'koō'
      },
      {
        kanji: '思う',
        expected: 'omou'
      },
      {
        kanji: '長雨',
        expected: 'nagaame'
      },
      {
        kanji: '記入',
        expected: 'kinyū'
      },
      {
        kanji: '金融',
        expected: 'kin\'yū'
      },
      {
        kanji: '学校',
        expected: 'gakkō'
      },
      {
        kanji: 'ビール',
        expected: 'bīru'
      },
      {
        kanji: 'お母さん',
        expected: 'okāsan'
      },
      {
        kanji: '委員',
        expected: 'iin'
      },
    ])('Should respect romaji and katakana', async ({ kanji, expected }) => {
      const result = await kuroshiro.convert(kanji, { sillabary: Sillabary.Romaji, romajiSystem: RomanizationSystem.Hepburn})
      expect(result).toEqual(expected)
    })
  })

  describe('Kanji to Romaji with Passport-Shiki system', () => {
    it('Should convert using the selected system', async () => {
      const result = await kuroshiro.convert(EXAMPLE_TEXT, { sillabary: Sillabary.Romaji, romajiSystem: RomanizationSystem.Passport })
      expect(result).toEqual('kanjitoretarateotsunago,kasanarunowajinseinorain and remiriasaiko!')
    })

    it('Should be able to transliterate Kanji to Romaji with sokuon', async () => {
      const result = await kuroshiro.convert('勝手に買っちゃったんだ', { mode: ConversionMode.Spaced, sillabary: Sillabary.Romaji, romajiSystem: RomanizationSystem.Passport })
      expect(result).toEqual('katte ni katchatta n da')
    })

    it.each([
      {
        kanji: '東京',
        expected: 'tokyo'
      },
      {
        kanji: '九州',
        expected: 'kyushu'
      },
      {
        kanji: '丸の内',
        expected: 'marunouchi'
      },
      {
        kanji: '観桜',
        expected: 'kano'
      },
      {
        kanji: '呼応',
        expected: 'koo'
      },
      {
        kanji: '思う',
        expected: 'omou'
      },
      {
        kanji: '長雨',
        expected: 'nagaame'
      },
      {
        kanji: '記入',
        expected: 'kinyu'
      },
      {
        kanji: '金融',
        expected: 'kinyu'
      },
      {
        kanji: '学校',
        expected: 'gakko'
      },
      {
        kanji: 'ビール',
        expected: 'biru'
      },
      {
        kanji: 'お母さん',
        expected: 'okasan'
      },
      {
        kanji: '委員',
        expected: 'iin'
      },
    ])('Should respect romaji and katakana', async ({ kanji, expected }) => {
      const result = await kuroshiro.convert(kanji, { sillabary: Sillabary.Romaji, romajiSystem: RomanizationSystem.Passport })
      expect(result).toEqual(expected)
    })

  })

  describe('Kanji to Romaji with Nippon-Shiki system', () => {
    it('Should convert using the selected system', async () => {
      const result = await kuroshiro.convert(EXAMPLE_TEXT, { sillabary: Sillabary.Romaji, romajiSystem: RomanizationSystem.Nippon })
      expect(result).toEqual('kanzitoretaratewotunagô,kasanarunowazinseinorain and remiriasaikô!')
    })

    it('Should be able to transliterate Kanji to Romaji with sokuon', async () => {
      const result = await kuroshiro.convert('勝手に買っちゃったんだ', { mode: ConversionMode.Spaced, sillabary: Sillabary.Romaji, romajiSystem: RomanizationSystem.Nippon })
      expect(result).toEqual('katte ni kattyatta n da')
    })

    it.each([
      {
        kanji: '東京',
        expected: 'tôkyô'
      },
      {
        kanji: '九州',
        expected: 'kyûsyû'
      },
      {
        kanji: '丸の内',
        expected: 'marunouti'
      },
      {
        kanji: '観桜',
        expected: 'kan\'ô'
      },
      {
        kanji: '呼応',
        expected: 'koô'
      },
      {
        kanji: '思う',
        expected: 'omou'
      },
      {
        kanji: '長雨',
        expected: 'nagaame'
      },
      {
        kanji: '記入',
        expected: 'kinyû'
      },
      {
        kanji: '金融',
        expected: 'kin\'yû'
      },
      {
        kanji: '学校',
        expected: 'gakkô'
      },
      {
        kanji: 'ビール',
        expected: 'bîru'
      },
      {
        kanji: 'お母さん',
        expected: 'okâsan'
      },
      {
        kanji: '委員',
        expected: 'iin'
      },
    ])('Should respect romaji and katakana', async ({ kanji, expected }) => {
      const result = await kuroshiro.convert(kanji, { sillabary: Sillabary.Romaji, romajiSystem: RomanizationSystem.Nippon })
      expect(result).toEqual(expected)
    })

  })

  describe('Convert Spaced', () => {
    it.each([
      {
        text: EXAMPLE_TEXT,
        sillabary: Sillabary.Hiragana,
        expected: 'かんじとれ たら て を つなごう 、 かさなる の は じんせい の ライン   and   レミ リア さいこう ！',
      },
      {
        text: EXAMPLE_TEXT,
        sillabary: Sillabary.Katakana,
        expected: 'カンジトレ タラ テ ヲ ツナゴウ 、 カサナル ノ ハ ジンセイ ノ ライン   and   レミ リア サイコウ ！',
      },
      {
        text: EXAMPLE_TEXT,
        sillabary: Sillabary.Romaji,
        expected: 'kanjitore tara te o tsunagō , kasanaru no wa jinsei no rain   and   remi ria saikō !'
      },
    ])('Should respect romaji and katakana and space every word', async ({ text, sillabary, expected }) => {
      const result = await kuroshiro.convert(text, { sillabary, mode: ConversionMode.Spaced})
      expect(result).toEqual(expected)
    })
  })

  describe('Kanji conversion with okurigana', () => {
    it.each([
      {
        text: EXAMPLE_TEXT,
        expected: '感[かん]じ取[と]れたら手[て]を繋[つな]ごう、重[かさ]なるのは人生[じんせい]のライン and レミリア最高[さいこう]！'
      },
      {
        text: EXAMPLE_TEXT2,
        expected: 'ブラウン管[かん]への愛[あい]が足[た]りねぇな'
      },
      {
        text: EXAMPLE_TEXT3,
        expected: '関ヶ原[せきがはら]の戦[たたか]い'
      },
      {
        text: '綺麗な花。面白い映画。面白かったです。',
        expected: '綺麗[きれい]な花[はな]。面白[おもしろ]い映画[えいが]。面白[おもしろ]かったです。'
      },
      {
        text: '言い訳',
        expected: '言[い]い訳[わけ]'
      },
      {
        text: '可愛い',
        expected: '可愛[かわい]い'
      },
      {
        text: '渡り鳥',
        expected: '渡[わた]り鳥[どり]'
      }
    ])('Should convert given text as expected to hiragana', async ({ text, expected }) => {
      const result = await kuroshiro.convert(text, { mode: ConversionMode.Okurigana, sillabary: Sillabary.Hiragana })
      expect(result).toEqual(expected)
    })

    it('Should convert given text as expected to katakana', async () => {
      const result = await kuroshiro.convert(EXAMPLE_TEXT, { mode: ConversionMode.Okurigana, sillabary: Sillabary.Katakana })
      expect(result).toEqual('感[カン]じ取[ト]れたら手[テ]を繋[ツナ]ごう、重[カサ]なるのは人生[ジンセイ]のライン and レミリア最高[サイコウ]！')
    })

    it('Should convert given text as expected to katakana', async () => {
      const result = await kuroshiro.convert(EXAMPLE_TEXT, { mode: ConversionMode.Okurigana, sillabary: Sillabary.Katakana })
      expect(result).toEqual('感[カン]じ取[ト]れたら手[テ]を繋[ツナ]ごう、重[カサ]なるのは人生[ジンセイ]のライン and レミリア最高[サイコウ]！')
    })

    it('Kanji to Romaji with okurigana', async () => {
      const ori = EXAMPLE_TEXT
      const result = await kuroshiro.convert(ori, { mode: ConversionMode.Okurigana, sillabary: Sillabary.Romaji })
      expect(result).toEqual('感[kan]じ取[to]れたら手[te]を繋[tsuna]ごう、重[kasa]なるのは人生[jinsei]のライン and レミリア最高[saikō]！')
    })
  })

  describe('Kanji conversion with okurigana', () => {
    it('Should convert to Hiragana with furigana as expected', async () => {
      const result = await kuroshiro.convert(EXAMPLE_TEXT, { mode: ConversionMode.Furigana, sillabary: Sillabary.Hiragana })
      expect(result).toEqual('<ruby>感<rp>[</rp><rt>かん</rt><rp>]</rp></ruby>じ<ruby>取<rp>[</rp><rt>と</rt><rp>]</rp></ruby>れたら<ruby>手<rp>[</rp><rt>て</rt><rp>]</rp></ruby>を<ruby>繋<rp>[</rp><rt>つな</rt><rp>]</rp></ruby>ごう、<ruby>重<rp>[</rp><rt>かさ</rt><rp>]</rp></ruby>なるのは<ruby>人生<rp>[</rp><rt>じんせい</rt><rp>]</rp></ruby>のライン and レミリア<ruby>最高<rp>[</rp><rt>さいこう</rt><rp>]</rp></ruby>！')
    })
    it('Should convert to Katakana with furigana as expected', async () => {
      const result = await kuroshiro.convert(EXAMPLE_TEXT, { mode: ConversionMode.Furigana, sillabary: Sillabary.Katakana })
      expect(result).toEqual('<ruby>感<rp>[</rp><rt>カン</rt><rp>]</rp></ruby>じ<ruby>取<rp>[</rp><rt>ト</rt><rp>]</rp></ruby>れたら<ruby>手<rp>[</rp><rt>テ</rt><rp>]</rp></ruby>を<ruby>繋<rp>[</rp><rt>ツナ</rt><rp>]</rp></ruby>ごう、<ruby>重<rp>[</rp><rt>カサ</rt><rp>]</rp></ruby>なるのは<ruby>人生<rp>[</rp><rt>ジンセイ</rt><rp>]</rp></ruby>のライン and レミリア<ruby>最高<rp>[</rp><rt>サイコウ</rt><rp>]</rp></ruby>！')
    })
    it('Should convert to Romaji with furigana as expected', async () => {
      const result = await kuroshiro.convert(EXAMPLE_TEXT, { mode: ConversionMode.Furigana, sillabary: Sillabary.Romaji })
      expect(result).toEqual('<ruby>感<rp>[</rp><rt>kan</rt><rp>]</rp>じ<rp>[</rp><rt>ji</rt><rp>]</rp>取<rp>[</rp><rt>to</rt><rp>]</rp>れ<rp>[</rp><rt>re</rt><rp>]</rp>た<rp>[</rp><rt>ta</rt><rp>]</rp>ら<rp>[</rp><rt>ra</rt><rp>]</rp>手<rp>[</rp><rt>te</rt><rp>]</rp>を<rp>[</rp><rt>o</rt><rp>]</rp>繋<rp>[</rp><rt>tsuna</rt><rp>]</rp>ご<rp>[</rp><rt>go</rt><rp>]</rp>う<rp>[</rp><rt>u</rt><rp>]</rp>、<rp>[</rp><rt>,</rt><rp>]</rp>重<rp>[</rp><rt>kasa</rt><rp>]</rp>な<rp>[</rp><rt>na</rt><rp>]</rp>る<rp>[</rp><rt>ru</rt><rp>]</rp>の<rp>[</rp><rt>no</rt><rp>]</rp>は<rp>[</rp><rt>wa</rt><rp>]</rp>人生<rp>[</rp><rt>jinsei</rt><rp>]</rp>の<rp>[</rp><rt>no</rt><rp>]</rp>ラ<rp>[</rp><rt>ra</rt><rp>]</rp>イ<rp>[</rp><rt>i</rt><rp>]</rp>ン<rp>[</rp><rt>n</rt><rp>]</rp> <rp>[</rp><rt> </rt><rp>]</rp>a<rp>[</rp><rt>a</rt><rp>]</rp>n<rp>[</rp><rt>n</rt><rp>]</rp>d<rp>[</rp><rt>d</rt><rp>]</rp> <rp>[</rp><rt> </rt><rp>]</rp>レ<rp>[</rp><rt>re</rt><rp>]</rp>ミ<rp>[</rp><rt>mi</rt><rp>]</rp>リ<rp>[</rp><rt>ri</rt><rp>]</rp>ア<rp>[</rp><rt>a</rt><rp>]</rp>最高<rp>[</rp><rt>saikō</rt><rp>]</rp>！<rp>[</rp><rt>!</rt><rp>]</rp></ruby>')
    })
  })

})


