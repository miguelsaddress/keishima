/**
 * @jest-environment node
 */

import { KuromojiAnalyzer } from '../../src/analyzers/KuromojiAnalyzer'

describe('kuroshiro-analyzer-kuromoji Node Test', () => {
  const EXAMPLE_TEXT = 'すもももももももものうち'
  const EXAMPLE_TEXT_WORDS_COUNT = 7 // すもも _ も _ もも _ もも _ も _ の _ うち
  let analyzer

  test('Initialization sets the KuromojiTokenizer', async () => {
    analyzer = new KuromojiAnalyzer()
    await analyzer.init()

    expect(analyzer.theAnalyzer).toBeDefined()
  })

  test('Repeated Initialization throws an error', async () => {
    analyzer = new KuromojiAnalyzer()
    await analyzer.init()
    await expect(analyzer.init()).rejects.toEqual(
      new Error('This analyzer has already been initialized.')
    )
  })

  test('Kuromoji Build Failed', async () => {
    analyzer = new KuromojiAnalyzer()
    try {
      await analyzer.init('node_modules/foo/bar')
    } catch (err) {
      expect(err.message).toMatch('ENOENT: no such file or directory, open \'node_modules/foo/bar/')
    }
  })

  test('Sentence can be parsed', async () => {
    analyzer = new KuromojiAnalyzer()
    await analyzer.init()

    const result = await analyzer.parse(EXAMPLE_TEXT)
    // console.debug('RESULT: ', result)
    expect(result).toBeInstanceOf(Array)
    expect(result).toHaveLength(EXAMPLE_TEXT_WORDS_COUNT)
  })

  test('Parsing no text, does NOT result in error but empty array', async () => {
    analyzer = new KuromojiAnalyzer()
    await analyzer.init()

    const result = await analyzer.parse()
    // console.debug("RESULT: ", result)
    expect(result).toBeInstanceOf(Array)
    expect(result).toHaveLength(0)
  })

  it('Parsing empty string sentence, does NOT result in error but empty array', async () => {
    analyzer = new KuromojiAnalyzer()
    await analyzer.init()

    const result = await analyzer.parse('')
    // console.debug("RESULT: ", result)
    expect(result).toBeInstanceOf(Array)
    expect(result).toHaveLength(0)
  })
})
