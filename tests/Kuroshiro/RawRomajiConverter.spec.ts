import { RawRomajiConverter, RomanizationSystem } from '../../src/Kuroshiro/converters/RawRomajiConverter'

describe('RawRomajiConverter', () => {
  const converter = new RawRomajiConverter()
  it('can convert to nippon-shiki system', () => {
    const text = 'サポート'
    const result = converter.convert(text, RomanizationSystem.Nippon)
    expect(result).toEqual('sapôto')
  })

  test('can convert to passport-shiki system', () => {
    const text = 'サポート'
    const result = converter.convert(text, RomanizationSystem.Passport)
    expect(result).toEqual('sapoto')
  })

  describe('hepburn-shiki system', () => {
    it('Identifies long vowels in katakana', () => {
      const text = 'サポート'
      const result = converter.convert(text, RomanizationSystem.Hepburn)
      expect(result).toEqual('sapōto')
    })

    it('Identifies long vowels in hiragana', () => {
      const text = 'そうです'
      const result = converter.convert(text, RomanizationSystem.Hepburn)
      expect(result).toEqual('soudesu')
    })

    it('Uses M before B', () => {
      const text = 'ナンバ'
      const result = converter.convert(text, RomanizationSystem.Hepburn)
      expect(result).toEqual('namba')
    })

    it('Marks "N" followed by vowel with an apostrophe', () => {
      const text = 'まんえんいか'
      const result = converter.convert(text, RomanizationSystem.Hepburn)
      expect(result).toEqual('man\'en\'ika')
    })

    it('Identifies tch', () => {
      const text = 'まっちゃ'
      const result = converter.convert(text, RomanizationSystem.Hepburn)
      expect(result).toEqual('matcha')
    })
  })
})