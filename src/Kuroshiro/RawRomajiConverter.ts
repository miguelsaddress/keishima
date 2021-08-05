import { HEPBURN_SHIKI_MAP } from './romaji-systems/hepburnShiki'
import { NIPPON_SHIKI_MAP } from './romaji-systems/nipponShiki'
import { PASSPORT_SHIKI_MAP } from './romaji-systems/passportShiki'

export enum RomanizationSystem {
  Nippon = 'nippon',
  Passport = 'passport',
  Hepburn = 'hepburn'
}

export class RawRomajiConverter {

  convert(str: string, system: RomanizationSystem = RomanizationSystem.Hepburn): string {

    const romajiSystem = {
      nippon: NIPPON_SHIKI_MAP,
      passport: PASSPORT_SHIKI_MAP,
      hepburn: HEPBURN_SHIKI_MAP
    }

    const reg_tsu = /(っ|ッ)([bcdfghijklmnopqrstuvwyz])/gm
    const reg_xtsu = /っ|ッ/gm

    let pnt = 0
    let ch
    let theResult
    let result = ''

    // [PASSPORT] 長音省略 「―」の場合
    if (system === RomanizationSystem.Passport) {
      str = str.replace(/ー/gm, '')
    }

    // [NIPPON|HEPBURN] 撥音の特殊表記 a、i、u、e、o、y
    if (system === RomanizationSystem.Nippon || system === RomanizationSystem.Hepburn) {
      const reg_hatu = new RegExp(/(ん|ン)(?=あ|い|う|え|お|ア|イ|ウ|エ|オ|ぁ|ぃ|ぅ|ぇ|ぉ|ァ|ィ|ゥ|ェ|ォ|や|ゆ|よ|ヤ|ユ|ヨ|ゃ|ゅ|ょ|ャ|ュ|ョ)/g)
      let match
      const indices = []
      while ((match = reg_hatu.exec(str)) !== null) {
        indices.push(match.index + 1)
      }
      if (indices.length !== 0) {
        let mStr = ''
        for (let i = 0; i < indices.length; i++) {
          if (i === 0) {
            mStr += `${str.slice(0, indices[i])}'`
          }
          else {
            mStr += `${str.slice(indices[i - 1], indices[i])}'`
          }
        }
        mStr += str.slice(indices[indices.length - 1])
        str = mStr
      }
    }

    // [ALL] kana to roman chars
    const max = str.length
    const theSystem: Record<string, string> = romajiSystem[system]
    while (pnt <= max) {
      theResult = theSystem[str.substring(pnt, pnt + 2)]
      if (theResult) {
        result += theResult
        pnt += 2
      }
      else {
        theResult = theSystem[ch = str.substring(pnt, pnt + 1)]
        result += (theResult) ? theResult : ch
        pnt += 1
      }
    }
    result = result.replace(reg_tsu, '$2$2')

    // [PASSPORT|HEPBURN] 子音を重ねて特殊表記
    if (system === RomanizationSystem.Passport || system === RomanizationSystem.Hepburn) {
      result = result.replace(/cc/gm, 'tc')
    }

    result = result.replace(reg_xtsu, 'tsu')

    // [PASSPORT|HEPBURN] 撥音の特殊表記 b、m、p
    if (system === RomanizationSystem.Passport || system === RomanizationSystem.Hepburn) {
      result = result.replace(/nm/gm, 'mm')
      result = result.replace(/nb/gm, 'mb')
      result = result.replace(/np/gm, 'mp')
    }

    // [NIPPON] 長音変換
    if (system === RomanizationSystem.Nippon) {
      result = result.replace(/aー/gm, 'â')
      result = result.replace(/iー/gm, 'î')
      result = result.replace(/uー/gm, 'û')
      result = result.replace(/eー/gm, 'ê')
      result = result.replace(/oー/gm, 'ô')
    }

    // [HEPBURN] 長音変換
    if (system === RomanizationSystem.Hepburn) {
      result = result.replace(/aー/gm, 'ā')
      result = result.replace(/iー/gm, 'ī')
      result = result.replace(/uー/gm, 'ū')
      result = result.replace(/eー/gm, 'ē')
      result = result.replace(/oー/gm, 'ō')
    }

    return result
  }

}