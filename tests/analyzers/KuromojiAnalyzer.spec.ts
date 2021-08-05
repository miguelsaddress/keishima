import { KuromojiAnalyzer } from '../../src/analyzers/KuromojiAnalyzer'

describe('kuroshiro-analyzer-kuromoji Node Test', () => {
  const EXAMPLE_TEXT = 'すもももももももものうち'
  const EXAMPLE_TEXT_WORDS_COUNT = 7 // すもも _ も _ もも _ もも _ も _ の _ うち
  let analyzer

  test('Sentence can be parsed', async () => {
    analyzer = new KuromojiAnalyzer()
    const result = await analyzer.analyze(EXAMPLE_TEXT)
    // console.debug('RESULT: ', result)
    expect(result).toBeInstanceOf(Array)
    expect(result).toHaveLength(EXAMPLE_TEXT_WORDS_COUNT)
  })

  test('Parsing no text, does NOT result in error but empty array', async () => {
    analyzer = new KuromojiAnalyzer()
    const result = await analyzer.analyze()
    // console.debug("RESULT: ", result)
    expect(result).toBeInstanceOf(Array)
    expect(result).toHaveLength(0)
  })

  it('Parsing empty string sentence, does NOT result in error but empty array', async () => {
    analyzer = new KuromojiAnalyzer()
    const result = await analyzer.analyze('')
    // console.debug("RESULT: ", result)
    expect(result).toBeInstanceOf(Array)
    expect(result).toHaveLength(0)
  })
})
