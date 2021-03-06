export const PASSPORT_SHIKI_MAP: Record<string, string> = {
  // 数字と記号
  '１': '1',
  '２': '2',
  '３': '3',
  '４': '4',
  '５': '5',
  '６': '6',
  '７': '7',
  '８': '8',
  '９': '9',
  '０': '0',
  '！': '!',
  '“': '"',
  '”': '"',
  '＃': '#',
  '＄': '$',
  '％': '%',
  '＆': '&',
  '’': '\'',
  '（': '(',
  '）': ')',
  '＝': '=',
  '～': '~',
  '｜': '|',
  '＠': '@',
  '‘': '`',
  '＋': '+',
  '＊': '*',
  '；': ';',
  '：': ':',
  '＜': '<',
  '＞': '>',
  '、': ',',
  '。': '.',
  '／': '/',
  '？': '?',
  '＿': '_',
  '・': '･',
  '「': '"',
  '」': '"',
  '｛': '{',
  '｝': '}',
  '￥': '\\',
  '＾': '^',

  // 直音-清音(ア～ノ)
  あ: 'a',
  い: 'i',
  う: 'u',
  え: 'e',
  お: 'o',
  ア: 'a',
  イ: 'i',
  ウ: 'u',
  エ: 'e',
  オ: 'o',

  か: 'ka',
  き: 'ki',
  く: 'ku',
  け: 'ke',
  こ: 'ko',
  カ: 'ka',
  キ: 'ki',
  ク: 'ku',
  ケ: 'ke',
  コ: 'ko',

  さ: 'sa',
  し: 'shi',
  す: 'su',
  せ: 'se',
  そ: 'so',
  サ: 'sa',
  シ: 'shi',
  ス: 'su',
  セ: 'se',
  ソ: 'so',

  た: 'ta',
  ち: 'chi',
  つ: 'tsu',
  て: 'te',
  と: 'to',
  タ: 'ta',
  チ: 'chi',
  ツ: 'tsu',
  テ: 'te',
  ト: 'to',

  な: 'na',
  に: 'ni',
  ぬ: 'nu',
  ね: 'ne',
  の: 'no',
  ナ: 'na',
  ニ: 'ni',
  ヌ: 'nu',
  ネ: 'ne',
  ノ: 'no',

  // 直音-清音(ハ～ヲ)
  は: 'ha',
  ひ: 'hi',
  ふ: 'fu',
  へ: 'he',
  ほ: 'ho',
  ハ: 'ha',
  ヒ: 'hi',
  フ: 'fu',
  ヘ: 'he',
  ホ: 'ho',

  ま: 'ma',
  み: 'mi',
  む: 'mu',
  め: 'me',
  も: 'mo',
  マ: 'ma',
  ミ: 'mi',
  ム: 'mu',
  メ: 'me',
  モ: 'mo',

  や: 'ya',
  ゆ: 'yu',
  よ: 'yo',
  ヤ: 'ya',
  ユ: 'yu',
  ヨ: 'yo',

  ら: 'ra',
  り: 'ri',
  る: 'ru',
  れ: 're',
  ろ: 'ro',
  ラ: 'ra',
  リ: 'ri',
  ル: 'ru',
  レ: 're',
  ロ: 'ro',

  わ: 'wa',
  ゐ: 'i',
  ゑ: 'e',
  を: 'o',
  ワ: 'wa',
  ヰ: 'i',
  ヱ: 'e',
  ヲ: 'o',

  // 直音-濁音(ガ～ボ)、半濁音(パ～ポ)
  が: 'ga',
  ぎ: 'gi',
  ぐ: 'gu',
  げ: 'ge',
  ご: 'go',
  ガ: 'ga',
  ギ: 'gi',
  グ: 'gu',
  ゲ: 'ge',
  ゴ: 'go',

  ざ: 'za',
  じ: 'ji',
  ず: 'zu',
  ぜ: 'ze',
  ぞ: 'zo',
  ザ: 'za',
  ジ: 'ji',
  ズ: 'zu',
  ゼ: 'ze',
  ゾ: 'zo',

  だ: 'da',
  ぢ: 'ji',
  づ: 'zu',
  で: 'de',
  ど: 'do',
  ダ: 'da',
  ヂ: 'ji',
  ヅ: 'zu',
  デ: 'de',
  ド: 'do',

  ば: 'ba',
  び: 'bi',
  ぶ: 'bu',
  べ: 'be',
  ぼ: 'bo',
  バ: 'ba',
  ビ: 'bi',
  ブ: 'bu',
  ベ: 'be',
  ボ: 'bo',

  ぱ: 'pa',
  ぴ: 'pi',
  ぷ: 'pu',
  ぺ: 'pe',
  ぽ: 'po',
  パ: 'pa',
  ピ: 'pi',
  プ: 'pu',
  ペ: 'pe',
  ポ: 'po',

  // 拗音-清音(キャ～リョ)
  きゃ: 'kya',
  きゅ: 'kyu',
  きょ: 'kyo',
  しゃ: 'sha',
  しゅ: 'shu',
  しょ: 'sho',
  ちゃ: 'cha',
  ちゅ: 'chu',
  ちょ: 'cho',
  にゃ: 'nya',
  にゅ: 'nyu',
  にょ: 'nyo',
  ひゃ: 'hya',
  ひゅ: 'hyu',
  ひょ: 'hyo',
  みゃ: 'mya',
  みゅ: 'myu',
  みょ: 'myo',
  りゃ: 'rya',
  りゅ: 'ryu',
  りょ: 'ryo',
  キャ: 'kya',
  キュ: 'kyu',
  キョ: 'kyo',
  シャ: 'sha',
  シュ: 'shu',
  ショ: 'sho',
  チャ: 'cha',
  チュ: 'chu',
  チョ: 'cho',
  ニャ: 'nya',
  ニュ: 'nyu',
  ニョ: 'nyo',
  ヒャ: 'hya',
  ヒュ: 'hyu',
  ヒョ: 'hyo',
  ミャ: 'mya',
  ミュ: 'myu',
  ミョ: 'myo',
  リャ: 'rya',
  リュ: 'ryu',
  リョ: 'ryo',

  // 拗音-濁音(ギャ～ビョ)、半濁音(ピャ～ピョ)、合拗音(クヮ、グヮ)
  ぎゃ: 'gya',
  ぎゅ: 'gyu',
  ぎょ: 'gyo',
  じゃ: 'ja',
  じゅ: 'ju',
  じょ: 'jo',
  ぢゃ: 'ja',
  ぢゅ: 'ju',
  ぢょ: 'jo',
  びゃ: 'bya',
  びゅ: 'byu',
  びょ: 'byo',
  ぴゃ: 'pya',
  ぴゅ: 'pyu',
  ぴょ: 'pyo',
  // くゎ: "",
  // ぐゎ: "",
  ギャ: 'gya',
  ギュ: 'gyu',
  ギョ: 'gyo',
  ジャ: 'ja',
  ジュ: 'ju',
  ジョ: 'jo',
  ヂャ: 'ja',
  ヂュ: 'ju',
  ヂョ: 'jo',
  ビャ: 'bya',
  ビュ: 'byu',
  ビョ: 'byo',
  ピャ: 'pya',
  ピュ: 'pyu',
  ピョ: 'pyo',
  // クヮ: "",
  // グヮ: "",

  // 小書きの仮名、符号
  ぁ: 'a',
  ぃ: 'i',
  ぅ: 'u',
  ぇ: 'e',
  ぉ: 'o',
  ゃ: 'ya',
  ゅ: 'yu',
  ょ: 'yo',
  ゎ: 'wa',
  ァ: 'a',
  ィ: 'i',
  ゥ: 'u',
  ェ: 'e',
  ォ: 'o',
  ャ: 'ya',
  ュ: 'yu',
  ョ: 'yo',
  ヮ: 'wa',
  ヵ: 'ka',
  ヶ: 'ke',
  ん: 'n',
  ン: 'n',
  // ー: "",
  '　': ' ',

  // 外来音(イェ～グォ)
  // いぇ: "",
  // うぃ: "",
  // うぇ: "",
  // うぉ: "",
  // きぇ: "",
  // くぁ: "",
  // くぃ: "",
  // くぇ: "",
  // くぉ: "",
  // ぐぁ: "",
  // ぐぃ: "",
  // ぐぇ: "",
  // ぐぉ: "",
  // イェ: "",
  // ウィ: "",
  // ウェ: "",
  // ウォ: "",
  ヴ: 'b'
  // ヴァ: "",
  // ヴィ: "",
  // ヴェ: "",
  // ヴォ: "",
  // ヴュ: "",
  // ヴョ: "",
  // キェ: "",
  // クァ: "",
  // クィ: "",
  // クェ: "",
  // クォ: "",
  // グァ: "",
  // グィ: "",
  // グェ: "",
  // グォ: "",

  // 外来音(シェ～フョ)
  // しぇ: "",
  // じぇ: "",
  // すぃ: "",
  // ずぃ: "",
  // ちぇ: "",
  // つぁ: "",
  // つぃ: "",
  // つぇ: "",
  // つぉ: "",
  // てぃ: "",
  // てゅ: "",
  // でぃ: "",
  // でゅ: "",
  // とぅ: "",
  // どぅ: "",
  // にぇ: "",
  // ひぇ: "",
  // ふぁ: "",
  // ふぃ: "",
  // ふぇ: "",
  // ふぉ: "",
  // ふゅ: "",
  // ふょ: "",
  // シェ: "",
  // ジェ: "",
  // スィ: "",
  // ズィ: "",
  // チェ: "",
  // ツァ: "",
  // ツィ: "",
  // ツェ: "",
  // ツォ: "",
  // ティ: "",
  // テュ: "",
  // ディ: "",
  // デュ: "",
  // トゥ: "",
  // ドゥ: "",
  // ニェ: "",
  // ヒェ: "",
  // ファ: "",
  // フィ: "",
  // フェ: "",
  // フォ: "",
  // フュ: "",
  // フョ: ""
}