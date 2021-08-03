import { Util } from '../../src/Kuroshiro'
import { patchTokens, RomanizationSystem } from '../../src/Kuroshiro/util'

describe('Tests for Util Functions', () => {

  describe('patchTokens', () => {
    it('should return the right amount of tokens', () => {
      const tokens = JSON.parse('[{"surface_form":"綺麗","pos":"名詞","reading":"きれい"},{"surface_form":"な","pos":"助動詞"},{"surface_form":"花","pos":"名詞","reading":"ハナ"},{"surface_form":"。","pos":"記号","reading":"。"},{"surface_form":"面白い","pos":"形容詞","reading":"オモシロイ"},{"surface_form":"映画","pos":"名詞","reading":"エイガ"},{"surface_form":"。","pos":"記号","reading":"。"},{"surface_form":"面白かっ","pos":"形容詞","reading":"オモシロカッ"},{"surface_form":"た","pos":"助動詞","reading":"タ"},{"surface_form":"です","pos":"助動詞","reading":"デス"},{"surface_form":"。","pos":"記号","reading":"。"},{"surface_form":"繋ご","pos":"動詞","reading":"ツナゴ"},{"surface_form":"う","pos":"助動詞","reading":"ウ"},{"surface_form":"うp","pos":"名詞"}]')
      const result = patchTokens(tokens)
      expect(result).toHaveLength(12)
    })
  })

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

  describe('kanaToRomaji', () => {
    it('can convert to nippon-shiki system', () => {
      const text = 'サポート'
      const result = Util.kanaToRomaji(text, RomanizationSystem.Nippon)
      expect(result).toEqual('sapôto')
    })

    test('can convert to passport-shiki system', () => {
      const text = 'サポート'
      const result = Util.kanaToRomaji(text, RomanizationSystem.Passport)
      expect(result).toEqual('sapoto')
    })

    describe('hepburn-shiki system', () => {
      it('Identifies long vowels in katakana', () => {
        const text = 'サポート'
        const result = Util.kanaToRomaji(text, RomanizationSystem.Hepburn)
        expect(result).toEqual('sapōto')
      })

      it('Identifies long vowels in hiragana', () => {
        const text = 'そうです'
        const result = Util.kanaToRomaji(text, RomanizationSystem.Hepburn)
        expect(result).toEqual('soudesu')
      })

      it('Uses M before B', () => {
        const text = 'ナンバ'
        const result = Util.kanaToRomaji(text, RomanizationSystem.Hepburn)
        expect(result).toEqual('namba')
      })

      it('Marks "N" followed by vowel with an apostrophe', () => {
        const text = 'まんえんいか'
        const result = Util.kanaToRomaji(text, RomanizationSystem.Hepburn)
        expect(result).toEqual('man\'en\'ika')
      })

      it('Identifies tch', () => {
        const text = 'まっちゃ'
        const result = Util.kanaToRomaji(text, RomanizationSystem.Hepburn)
        expect(result).toEqual('matcha')
      })
    })
  })
})
