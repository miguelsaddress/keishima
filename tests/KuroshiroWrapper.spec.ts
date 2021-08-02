import { KuroshiroWrapper } from '../src/KuroshiroWrapper'
import * as testInput from './KuroshiroWrapperTestInput.json'

describe('KuroshiroWrapper', () => {
  test.each(testInput)('okurigana function renders $given okurigana-ed as $okurigana', async ({ given, okurigana }) => {
    const kuroshiro = await KuroshiroWrapper.create()
    const converted = await kuroshiro.okurigana(given)
    expect(converted).toEqual(okurigana)
  })

  test.each(testInput)('furigana function renders $given furigana-ed as $furigana', async ({ given, furigana }) => {
    const kuroshiro = await KuroshiroWrapper.create()
    const converted = await kuroshiro.furigana(given)
    expect(converted).toEqual(furigana)
  })

})