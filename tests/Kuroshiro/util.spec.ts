import { Util } from '../../src/Kuroshiro'

describe('Tests for Util Functions', () => {

  describe('isKana', () => {
    it('Should return true when the given character is hiragana', () => {
      const text = 'こ'
      const result = Util.isKana(text)
      expect(result).toBeTruthy()
    })

    it('Should return true when the given character is katakana', () => {
      const text = 'ハ'
      const result = Util.isKana(text)
      expect(result).toBeTruthy()
    })
  })

  describe('isKanji', () => {
    it('Should return true when the given character is Kanji', () => {
      const text = '公'
      const result = Util.isKanji(text)
      expect(result).toBeTruthy()
    })
  })

  describe('hasKana', () => {
    it('Should return true  when there is Kana and Kanji mixed in the sentence', () => {
      const text = 'この公園の中で'
      const result = Util.hasKana(text)
      expect(result).toBeTruthy()
    })

    it('Should return true when there is just Hiragana in the sentence', () => {
      const text = 'です'
      const result = Util.hasKana(text)
      expect(result).toBeTruthy()
    })

    it('Should return true when there is just Katakana in the sentence', () => {
      const text = 'ミゲル'
      const result = Util.hasKana(text)
      expect(result).toBeTruthy()
    })

    it('Should return true when there is Hiragana mixed with Katakana in the sentence', () => {
      const text = 'ミゲルです'
      const result = Util.hasKana(text)
      expect(result).toBeTruthy()
    })

    it('Should return false if the text does not contain any kana', () => {
      const text = 'abc漢字'
      const result = Util.hasKana(text)
      expect(result).toBeFalsy()
    })
  })

  describe('hasKanji', () => {
    it('Should return true when the sentence contains any kanji', () => {
      const text = 'この公園の中で'
      const result = Util.hasKanji(text)
      expect(result).toBeTruthy()
    })

    it('Should return false when the sentence contains no kanji', () => {
      const text = 'ここで'
      const result = Util.hasKanji(text)
      expect(result).toBeFalsy()
    })
  })

  describe('kanaToHiragana', () => {
    it('should convert from katakana to hiragana', () => {
      const text = 'サカナ'
      const result = Util.kanaToHiragna(text)
      expect(result).toEqual('さかな')
    })

    it('should convert from katakana to hiragana, respecting the existing hiragana', () => {
      const text = 'サカな'
      const result = Util.kanaToHiragna(text)
      expect(result).toEqual('さかな')
    })

    it('should not alter the text if it is all hiragana', () => {
      const text = 'さかな'
      const result = Util.kanaToHiragna(text)
      expect(result).toEqual('さかな')
    })
  })

  describe('kanaToKatakana', () => {
    it('should convert from hiragana to katakana', () => {
      const text = 'さかな'
      const result = Util.kanaToKatakana(text)
      expect(result).toEqual('サカナ')
    })

    it('should convert from hiragana to katakana, respecting the existing katakana', () => {
      const text = 'サカな'
      const result = Util.kanaToKatakana(text)
      expect(result).toEqual('サカナ')
    })

    it('should not alter the text if it is all katakana', () => {
      const text = 'サカナ'
      const result = Util.kanaToKatakana(text)
      expect(result).toEqual('サカナ')
    })
  })
})
