import { TokensPatcher } from '../../src/Kuroshiro/TokensPatcher'

describe('Tests for TokensPatcher', () => {

  describe('patch', () => {
    it('should return the right amount of tokens', () => {
      const tokens = JSON.parse('[{"surface_form":"綺麗","pos":"名詞","reading":"きれい"},{"surface_form":"な","pos":"助動詞"},{"surface_form":"花","pos":"名詞","reading":"ハナ"},{"surface_form":"。","pos":"記号","reading":"。"},{"surface_form":"面白い","pos":"形容詞","reading":"オモシロイ"},{"surface_form":"映画","pos":"名詞","reading":"エイガ"},{"surface_form":"。","pos":"記号","reading":"。"},{"surface_form":"面白かっ","pos":"形容詞","reading":"オモシロカッ"},{"surface_form":"た","pos":"助動詞","reading":"タ"},{"surface_form":"です","pos":"助動詞","reading":"デス"},{"surface_form":"。","pos":"記号","reading":"。"},{"surface_form":"繋ご","pos":"動詞","reading":"ツナゴ"},{"surface_form":"う","pos":"助動詞","reading":"ウ"},{"surface_form":"うp","pos":"名詞"}]')
      const result = new TokensPatcher(tokens).patch()
      expect(result).toHaveLength(12)
    })
  })
})
