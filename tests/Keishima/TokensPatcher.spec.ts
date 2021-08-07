import { TokensPatcher } from '../../src/Keishima/TokensPatcher'

describe('Tests for TokensPatcher', () => {

  describe('patch', () => {
    it('should return the right amount of tokens', () => {
      const tokens = JSON.parse('[{"surfaceForm":"綺麗","position":"名詞","reading":"きれい"},{"surfaceForm":"な","position":"助動詞"},{"surfaceForm":"花","position":"名詞","reading":"ハナ"},{"surfaceForm":"。","position":"記号","reading":"。"},{"surfaceForm":"面白い","position":"形容詞","reading":"オモシロイ"},{"surfaceForm":"映画","position":"名詞","reading":"エイガ"},{"surfaceForm":"。","position":"記号","reading":"。"},{"surfaceForm":"面白かっ","position":"形容詞","reading":"オモシロカッ"},{"surfaceForm":"た","position":"助動詞","reading":"タ"},{"surfaceForm":"です","position":"助動詞","reading":"デス"},{"surfaceForm":"。","position":"記号","reading":"。"},{"surfaceForm":"繋ご","position":"動詞","reading":"ツナゴ"},{"surfaceForm":"う","position":"助動詞","reading":"ウ"},{"surfaceForm":"うp","position":"名詞"}]')
      const result = new TokensPatcher().patch(tokens)
      expect(result).toHaveLength(12)
    })
  })
})
