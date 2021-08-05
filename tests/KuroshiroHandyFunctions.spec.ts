import { ConversionMode, Kuroshiro } from '../src/Kuroshiro'
import * as testInput from './KuroshiroWrapperTestInput.json'

describe('Kuroshiro Handy Functions', () => {
  test.each(testInput)('okurigana function renders $given okurigana-ed as $okurigana', async ({ given, okurigana }) => {
    const kuroshiro = new Kuroshiro()
    const converted = await kuroshiro.convert(given, { mode: ConversionMode.Okurigana } )
    expect(converted).toEqual(okurigana)
  })

  test.each(testInput)('furigana function renders $given furigana-ed as $furigana', async ({ given, furigana }) => {
    const kuroshiro = new Kuroshiro()
    const converted = await kuroshiro.convert(given, { mode: ConversionMode.Furigana })
    expect(converted).toEqual(furigana)
  })
})
