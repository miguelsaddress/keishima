export enum TextType {
  PureKanji,
  KanjiKanaMix,
  PureKana,
  Others
}

const KATAKANA_HIRAGANA_SHIFT = '\u3041'.charCodeAt(0) - '\u30a1'.charCodeAt(0)
const HIRAGANA_KATAKANA_SHIFT = '\u30a1'.charCodeAt(0) - '\u3041'.charCodeAt(0)

export const isHiragana = (char: string): boolean => {
  char = char[0]
  return char >= '\u3040' && char <= '\u309f'
}

export const isKatakana = (char: string): boolean => {
  char = char[0]
  return char >= '\u30a0' && char <= '\u30ff'
}

export const isKana = (char: string): boolean => {
  return isHiragana(char) || isKatakana(char)
}

export const isKanji = (char: string): boolean => {
  char = char[0]
  return (char >= '\u4e00' && char <= '\u9fcf')
        || (char >= '\uf900' && char <= '\ufaff')
        || (char >= '\u3400' && char <= '\u4dbf')
}

export const isJapanese = (char: string): boolean => {
  return isKana(char) || isKanji(char)
}

export const hasHiragana = (str: string): boolean => {
  return str.split('').some(isHiragana)
}

export const hasKatakana = (str: string): boolean => {
  return str.split('').some(isKatakana)
}

export const hasKana = (str: string): boolean => {
  return str.split('').some(isKana)
}

export const hasKanji = (str: string): boolean => {
  return str.split('').some(isKanji)
}

export const hasJapanese = (str: string): boolean => {
  return str.split('').some(isJapanese)
}

export const toRawHiragana = (str: string): string => {
  return str.split('').map((char: string) => {
    if (char > '\u30a0' && char < '\u30f7') {
      return String.fromCharCode(char.charCodeAt(0) + KATAKANA_HIRAGANA_SHIFT)
    }
    return char
  }).join('')
}

export const toRawKatakana = (str: string): string => {
  return str.split('').map((char: string) => {
    if (char > '\u3040' && char < '\u3097') {
      return String.fromCharCode(char.charCodeAt(0) + HIRAGANA_KATAKANA_SHIFT)
    }
    return char
  }).join('')
}

export const getTextType = (str: string): TextType => {
  const containsKanji = hasKanji(str)
  const containsKana = hasKana(str)

  if (containsKanji && containsKana) return TextType.KanjiKanaMix
  if (containsKanji) return TextType.PureKanji
  if (containsKana) return TextType.PureKana
  return TextType.Others
}

export const kanaToHiragna = (str: string): string => {
  return toRawHiragana(str)
}

export const kanaToKatakana = (str: string): string => {
  return toRawKatakana(str)
}
