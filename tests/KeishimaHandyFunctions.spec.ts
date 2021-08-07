import { Keishima } from '../src/Keishima'
import * as testInput from './KeishimaTestInput.json'

describe('keishima Handy Functions', () => {
  test.each(testInput)('okurigana function renders $given okurigana-ed as $okurigana', async ({ given, okurigana }) => {
    const keishima = new Keishima()
    const converted = await keishima.okurigana(given)
    expect(converted).toEqual(okurigana)
  })

  test.each(testInput)('furigana function renders $given furigana-ed as $furigana', async ({ given, furigana }) => {
    const keishima = new Keishima()
    const converted = await keishima.furigana(given)
    expect(converted).toEqual(furigana)
  })
})
