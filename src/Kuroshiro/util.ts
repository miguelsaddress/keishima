import { KuromojiParsedResponse } from '../analyzers/KuromojiAnalyzer'
import { HEPBURN_SHIKI_MAP } from './romaji-systems/hepburnShiki'
import { NIPPON_SHIKI_MAP } from './romaji-systems/nipponShiki'
import { PASSPORT_SHIKI_MAP } from './romaji-systems/passportShiki'

enum RomanizationSystem {
  Nippon ='nippon',
  Passport = 'passport',
  Hepburn = 'hepburn'
}

const KATAKANA_HIRAGANA_SHIFT = '\u3041'.charCodeAt(0) - '\u30a1'.charCodeAt(0)
const HIRAGANA_KATAKANA_SHIFT = '\u30a1'.charCodeAt(0) - '\u3041'.charCodeAt(0)
// const ROMANIZATION_SYSTEM = {
//   NIPPON: 'nippon',
//   PASSPORT: 'passport',
//   HEPBURN: 'hepburn'
// }

/**
 * Check if given char is a hiragana
 *
 * @param {string} ch Given char
 * @return {boolean} if given char is a hiragana
 */
const isHiragana = (ch: string) => {
  ch = ch[0]
  return ch >= '\u3040' && ch <= '\u309f'
}

/**
 * Check if given char is a katakana
 *
 * @param {string} ch Given char
 * @return {boolean} if given char is a katakana
 */
const isKatakana = (ch: string) => {
  ch = ch[0]
  return ch >= '\u30a0' && ch <= '\u30ff'
}

/**
 * Check if given char is a kana
 *
 * @param {string} ch Given char
 * @return {boolean} if given char is a kana
 */
const isKana = (ch: string) => {
  return isHiragana(ch) || isKatakana(ch)
}

/**
 * Check if given char is a kanji
 *
 * @param {string} ch Given char
 * @return {boolean} if given char is a kanji
 */
const isKanji = (ch: string) => {
  ch = ch[0]
  return (ch >= '\u4e00' && ch <= '\u9fcf')
        || (ch >= '\uf900' && ch <= '\ufaff')
        || (ch >= '\u3400' && ch <= '\u4dbf')
}

/**
 * Check if given char is a Japanese
 *
 * @param {string} ch Given char
 * @return {boolean} if given char is a Japanese
 */
const isJapanese = (ch: string) => {
  return isKana(ch) || isKanji(ch)
}

/**
 * Check if given string has hiragana
 *
 * @param {string} str Given string
 * @return {boolean} if given string has hiragana
 */
const hasHiragana = (str: string) => {
  for (let i = 0; i < str.length; i++) {
    if (isHiragana(str[i])) return true
  }
  return false
}

/**
 * Check if given string has katakana
 *
 * @param {string} str Given string
 * @return {boolean} if given string has katakana
 */
const hasKatakana = (str: string) => {
  for (let i = 0; i < str.length; i++) {
    if (isKatakana(str[i])) return true
  }
  return false
}

/**
 * Check if given string has kana
 *
 * @param {string} str Given string
 * @return {boolean} if given string has kana
 */
const hasKana = (str: string) => {
  for (let i = 0; i < str.length; i++) {
    if (isKana(str[i])) return true
  }
  return false
}

/**
 * Check if given string has kanji
 *
 * @param {string} str Given string
 * @return {boolean} if given string has kanji
 */
const hasKanji = (str: string) => {
  for (let i = 0; i < str.length; i++) {
    if (isKanji(str[i])) return true
  }
  return false
}

/**
 * Check if given string has Japanese
 *
 * @param {string} str Given string
 * @return {boolean} if given string has Japanese
 */
const hasJapanese = (str: string) => {
  for (let i = 0; i < str.length; i++) {
    if (isJapanese(str[i])) return true
  }
  return false
}

/**
 * Convert kana to hiragana
 *
 * @param {string} str Given string
 * @return {string} Hiragana string
 */
const toRawHiragana = (str: string) => {
  return str.split('').map((ch: string) => {
    if (ch > '\u30a0' && ch < '\u30f7') {
      return String.fromCharCode(ch.charCodeAt(0) + KATAKANA_HIRAGANA_SHIFT)
    }
    return ch
  }).join('')
}

/**
 * Convert kana to katakana
 *
 * @param {string} str Given string
 * @return {string} Katakana string
 */
const toRawKatakana = (str: string) => {
  return str.split('').map((ch: string) => {
    if (ch > '\u3040' && ch < '\u3097') {
      return String.fromCharCode(ch.charCodeAt(0) + HIRAGANA_KATAKANA_SHIFT)
    }
    return ch
  }).join('')
}

/**
 * Convert kana to romaji
 *
 * @param {string} str Given string
 * @param {string} system To which romanization system the given string is converted
 * @return {string} Romaji string
 */
const toRawRomaji = (str: string, system: RomanizationSystem = RomanizationSystem.Hepburn) => {

  const romajiSystem = {
    nippon: NIPPON_SHIKI_MAP,
    passport: PASSPORT_SHIKI_MAP,
    hepburn: HEPBURN_SHIKI_MAP
  }

  const reg_tsu = /(っ|ッ)([bcdfghijklmnopqrstuvwyz])/gm
  const reg_xtsu = /っ|ッ/gm

  let pnt = 0
  let ch
  let theResult
  let result = ''

  // [PASSPORT] 長音省略 「―」の場合
  if (system === RomanizationSystem.Passport) {
    str = str.replace(/ー/gm, '')
  }

  // [NIPPON|HEPBURN] 撥音の特殊表記 a、i、u、e、o、y
  if (system === RomanizationSystem.Nippon || system === RomanizationSystem.Hepburn) {
    const reg_hatu = new RegExp(/(ん|ン)(?=あ|い|う|え|お|ア|イ|ウ|エ|オ|ぁ|ぃ|ぅ|ぇ|ぉ|ァ|ィ|ゥ|ェ|ォ|や|ゆ|よ|ヤ|ユ|ヨ|ゃ|ゅ|ょ|ャ|ュ|ョ)/g)
    let match
    const indices = []
    while ((match = reg_hatu.exec(str)) !== null) {
      indices.push(match.index + 1)
    }
    if (indices.length !== 0) {
      let mStr = ''
      for (let i = 0; i < indices.length; i++) {
        if (i === 0) {
          mStr += `${str.slice(0, indices[i])}'`
        }
        else {
          mStr += `${str.slice(indices[i - 1], indices[i])}'`
        }
      }
      mStr += str.slice(indices[indices.length - 1])
      str = mStr
    }
  }

  // [ALL] kana to roman chars
  const max = str.length
  const theSystem: Record<string, string> = romajiSystem[system]
  while (pnt <= max) {
    theResult = theSystem[str.substring(pnt, pnt + 2)]
    if (theResult) {
      result += theResult
      pnt += 2
    }
    else {
      theResult = theSystem[ch = str.substring(pnt, pnt + 1)]
      result += (theResult) ? theResult : ch
      pnt += 1
    }
  }
  result = result.replace(reg_tsu, '$2$2')

  // [PASSPORT|HEPBURN] 子音を重ねて特殊表記
  if (system === RomanizationSystem.Passport || system === RomanizationSystem.Hepburn) {
    result = result.replace(/cc/gm, 'tc')
  }

  result = result.replace(reg_xtsu, 'tsu')

  // [PASSPORT|HEPBURN] 撥音の特殊表記 b、m、p
  if (system === RomanizationSystem.Passport || system === RomanizationSystem.Hepburn) {
    result = result.replace(/nm/gm, 'mm')
    result = result.replace(/nb/gm, 'mb')
    result = result.replace(/np/gm, 'mp')
  }

  // [NIPPON] 長音変換
  if (system === RomanizationSystem.Nippon) {
    result = result.replace(/aー/gm, 'â')
    result = result.replace(/iー/gm, 'î')
    result = result.replace(/uー/gm, 'û')
    result = result.replace(/eー/gm, 'ê')
    result = result.replace(/oー/gm, 'ô')
  }

  // [HEPBURN] 長音変換
  if (system === RomanizationSystem.Hepburn) {
    result = result.replace(/aー/gm, 'ā')
    result = result.replace(/iー/gm, 'ī')
    result = result.replace(/uー/gm, 'ū')
    result = result.replace(/eー/gm, 'ē')
    result = result.replace(/oー/gm, 'ō')
  }

  return result
}

/**
 * Get the type of given string
 *
 * @param {string} str Given string
 * @return {number} Type number. 0 for pure kanji, 1 for kanji-kana-mixed, 2 for pure kana, 3 for others
 */
const getStrType = (str: string) => {
  let hasKJ = false
  let hasHK = false
  for (let i = 0; i < str.length; i++) {
    if (isKanji(str[i])) {
      hasKJ = true
    }
    else if (isHiragana(str[i]) || isKatakana(str[i])) {
      hasHK = true
    }
  }
  if (hasKJ && hasHK) return 1
  if (hasKJ) return 0
  if (hasHK) return 2
  return 3
}

/**
 * Patch tokens for conversion
 * @param {Object} tokens Given tokens
 * @return {Object} Patched tokens
 */
const patchTokens = (tokens: KuromojiParsedResponse[]): KuromojiParsedResponse[] => {
  // patch for token structure
  for (let cr = 0; cr < tokens.length; cr++) {
    if (hasJapanese(tokens[cr].surface_form)) {
      if (!tokens[cr].reading) {
        if (tokens[cr].surface_form.split('').every(isKana)) {
          tokens[cr].reading = toRawKatakana(tokens[cr].surface_form)
        }
        else {
          tokens[cr].reading = tokens[cr].surface_form
        }
      }
      else if (hasHiragana(tokens[cr].reading)) {
        tokens[cr].reading = toRawKatakana(tokens[cr].reading)
      }
    }
    else {
      tokens[cr].reading = tokens[cr].surface_form
    }
  }

  // patch for 助動詞"う" after 動詞
  for (let i = 0; i < tokens.length; i++) {
    if (tokens[i].pos && tokens[i].pos === '助動詞' && (tokens[i].surface_form === 'う' || tokens[i].surface_form === 'ウ')) {
      if (i - 1 >= 0 && tokens[i - 1].pos && tokens[i - 1].pos === '動詞') {
        tokens[i - 1].surface_form += 'う'
        if (tokens[i - 1].pronunciation) {
          tokens[i - 1].pronunciation += 'ー'
        }
        else {
          tokens[i - 1].pronunciation = `${tokens[i - 1].reading}ー`
        }
        tokens[i - 1].reading += 'ウ'
        tokens.splice(i, 1)
        i--
      }
    }
  }

  // patch for "っ" at the tail of 動詞、形容詞
  for (let j = 0; j < tokens.length; j++) {
    if (tokens[j].pos && (tokens[j].pos === '動詞' || tokens[j].pos === '形容詞') && tokens[j].surface_form.length > 1 && (tokens[j].surface_form[tokens[j].surface_form.length - 1] === 'っ' || tokens[j].surface_form[tokens[j].surface_form.length - 1] === 'ッ')) {
      if (j + 1 < tokens.length) {
        tokens[j].surface_form += tokens[j + 1].surface_form
        if (tokens[j].pronunciation) {
          tokens[j].pronunciation += tokens[j + 1].pronunciation
        }
        else {
          tokens[j].pronunciation = `${tokens[j].reading}${tokens[j + 1].reading}`
        }
        tokens[j].reading += tokens[j + 1].reading
        tokens.splice(j + 1, 1)
        j--
      }
    }
  }

  return tokens
}

/**
 * Convert kana to hiragana
 *
 * @param {string} str Given string
 * @return {string} Hiragana string
 */
const kanaToHiragna = (str: string) => {
  return toRawHiragana(str)
}

/**
 * Convert kana to katakana
 *
 * @param {string} str Given string
 * @return {string} Katakana string
 */
const kanaToKatakana = (str: string) => {
  return toRawKatakana(str)
}

/**
 * Convert kana to romaji
 *
 * @param {string} str Given string
 * @param {string} system To which romanization system the given string is converted. ["nippon"|"passport"|"hepburn"]
 * @return {string} Romaji string
 */
const kanaToRomaji = (str: string, system: RomanizationSystem) => {
  return toRawRomaji(str, system)
}

export {
  // language
  RomanizationSystem,
  getStrType,
  patchTokens,
  isHiragana,
  isKatakana,
  isKana,
  isKanji,
  isJapanese,
  hasHiragana,
  hasKatakana,
  hasKana,
  hasKanji,
  hasJapanese,
  toRawHiragana,
  toRawKatakana,
  toRawRomaji,
  kanaToHiragna,
  kanaToKatakana,
  kanaToRomaji
}
