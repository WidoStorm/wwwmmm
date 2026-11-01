/**
 * Sample content for every section of the site.
 *
 * Everything the pages render comes from this file, so a later milestone can
 * replace these arrays with database queries without touching the UI.
 * Text uses `Localized`: Spanish is required, other locales fall back to it.
 */
import type { Locale, Localized } from '@/lib/i18n'

export const SITE = {
  name: 'www',
  handle: '@widostorm',
  email: 'w@wido.jp',
  since: 2015,
}

export type ImageAsset = {
  id: string
  src: string
  width: number
  height: number
  /** Filename shown in the viewer title bar, macOS Preview style. */
  filename: string
}

const img = (
  id: string,
  width: number,
  height: number,
  src: string,
  dir = '',
  filename = src,
): ImageAsset => ({
  id,
  src: (`/img/${dir ? `${dir}/` : ''}${src}`),
  width,
  height,
  filename,
})



export const IMAGES = {
  'cover-01': img('cover-01', 1024, 1024, 'frost_final_v3.jpg'),
  'cover-02': img('cover-02', 1024, 1024, 'red-circle_collage.jpg'),
  'cover-03': img('cover-03', 1024, 1024, 'rooftop_dusk.jpg'),
  'header-01': img('header-01', 1376, 768, 'header_powerlines.jpg'),
  'header-02': img('header-02', 1376, 768, 'header_chrome_halftone.jpg'),
  'illus-01': img('illus-01', 896, 1200, 'white_room.jpg'),
  'live-01': img('live-01', 1376, 768, 'live_screen_IMG_0412.jpg'),
  'process-01': img('process-01', 1200, 896, 'thumbnails_tracing.jpg'),
  'ref-01': img('ref-01', 1023, 1280, 'ref-01.jpg', 'refs/revenge-x-aeri'),
  'screenshot1': img('screenshot1', 1002, 634, 'screenshot1.jpg', 'refs/revenge-x-aeri'),
  
} satisfies Record<string, ImageAsset>

export type ImageId = keyof typeof IMAGES

/* ------------------------------------------------------------------ */
/* Galería                                                             */
/* ------------------------------------------------------------------ */

export const ART_TYPES = ['cover', 'header', 'illustration', 'visual', 'poster'] as const
export type ArtType = (typeof ART_TYPES)[number]

export type GalleryItem = {
  id: string
  code: string
  title: Localized
  type: ArtType
  year: number
  image: ImageId
  medium: Localized
}

export const GALLERY: GalleryItem[] = [
  { id: 'g01', code: 'G-014', title: { es: 'Frost', ja: 'フロスト', ko: '프로스트', zh: '霜' }, type: 'cover', year: 2026, image: 'cover-01', medium: { es: 'Foto + edición digital', en: 'Photo + digital edit', ja: '写真＋デジタル加工', ko: '사진 + 디지털 편집', zh: '摄影 + 数字后期' } },
  { id: 'g02', code: 'G-013', title: { es: 'Tendido eléctrico', en: 'Power lines', ja: '電線', ko: '전선', zh: '电线' }, type: 'header', year: 2026, image: 'header-01', medium: { es: 'Pintura digital', en: 'Digital painting', ja: 'デジタルペイント', ko: '디지털 페인팅', zh: '数字绘画' } },
  { id: 'g03', code: 'G-012', title: { es: 'Sala blanca', en: 'White room', ja: '白い部屋', ko: '하얀 방', zh: '白色房间' }, type: 'illustration', year: 2026, image: 'illus-01', medium: { es: 'Ilustración digital', en: 'Digital illustration', ja: 'デジタルイラスト', ko: '디지털 일러스트', zh: '数字插画' } },
  { id: 'g04', code: 'G-011', title: { es: 'Círculo rojo', en: 'Red circle', ja: '赤い円', ko: '붉은 원', zh: '红圈' }, type: 'cover', year: 2025, image: 'cover-02', medium: { es: 'Collage analógico, escaneado', en: 'Analog collage, scanned', ja: 'アナログコラージュ、スキャン', ko: '아날로그 콜라주, 스캔', zh: '模拟拼贴，扫描' } },
  { id: 'g05', code: 'G-010', title: { es: 'Cromo / trama', en: 'Chrome / halftone', ja: 'クローム／網点', ko: '크롬 / 망점', zh: '铬 / 网点' }, type: 'header', year: 2025, image: 'header-02', medium: { es: '3D + trama', en: '3D + halftone', ja: '3D＋網点', ko: '3D + 망점', zh: '3D + 网点' } },
  { id: 'g06', code: 'G-009', title: { es: 'Azotea al atardecer', en: 'Rooftop at dusk', ja: '夕暮れの屋上', ko: '해질녘 옥상', zh: '黄昏屋顶' }, type: 'cover', year: 2025, image: 'cover-03', medium: { es: 'Ilustración digital', en: 'Digital illustration', ja: 'デジタルイラスト', ko: '디지털 일러스트', zh: '数字插画' } },
  { id: 'g07', code: 'G-008', title: { es: 'Pantalla / glitch', en: 'Screen / glitch', ja: 'スクリーン／グリッチ', ko: '스크린 / 글리치', zh: '屏幕 / 故障' }, type: 'visual', year: 2025, image: 'live-01', medium: { es: 'Visual en bucle, 4K', en: 'Looping visual, 4K', ja: 'ループ映像 4K', ko: '루프 비주얼, 4K', zh: '循环视觉，4K' } },
  { id: 'g08', code: 'G-007', title: { es: 'Fachada', en: 'Facade', ja: 'ファサード', ko: '파사드', zh: '立面' }, type: 'poster', year: 2024, image: 'ref-02', medium: { es: 'Póster, risografía', en: 'Poster, risograph', ja: 'ポスター、リソグラフ', ko: '포스터, 리소그래프', zh: '海报，孔版印刷' } },
]

/* ------------------------------------------------------------------ */
/* Works — piezas usadas de verdad                                     */
/* ------------------------------------------------------------------ */

export type Work = {
  id: string
  code: string
  title: Localized
  client: string
  role: Localized
  usedOn: string
  link?: string
  year: number
  image: ImageId
  note: Localized
}

export const WORKS: Work[] = [
  {
    id: 'w01',
    code: 'W-006',
    title: { es: '“Frost” — single', en: '“Frost” — single', ja: '「Frost」シングル', ko: '“Frost” — 싱글', zh: '《Frost》单曲' },
    client: 'Haru Vale',
    role: { es: 'Portada + canvas', en: 'Cover + canvas', ja: 'ジャケット＋Canvas', ko: '커버 + 캔버스', zh: '封面 + Canvas' },
    usedOn: 'Spotify / Apple Music',
    link: 'https://open.spotify.com',
    year: 2026,
    image: 'cover-01',
    note: {
      es: 'Foto tomada a través de un cristal empañado. El canvas de Spotify es la misma imagen respirando lentamente.',
      en: 'Shot through fogged glass. The Spotify canvas is the same image slowly breathing.',
      ja: '曇ったガラス越しに撮影。SpotifyのCanvasは同じ画像がゆっくり呼吸する映像。',
      ko: '김 서린 유리 너머로 촬영. Spotify 캔버스는 같은 이미지가 천천히 숨쉬는 영상.',
      zh: '隔着起雾的玻璃拍摄。Spotify Canvas 是同一张图像缓慢呼吸的版本。',
    },
  },
  {
    id: 'w02',
    code: 'W-005',
    title: { es: 'Gira “Señal” — visuales', en: '“Signal” tour — visuals', ja: '「Signal」ツアー映像', ko: '“Signal” 투어 — 비주얼', zh: '“Signal” 巡演视觉' },
    client: 'NOISE//GARDEN',
    role: { es: 'Visuales para pantalla LED', en: 'LED screen visuals', ja: 'LEDスクリーン映像', ko: 'LED 스크린 비주얼', zh: 'LED 屏幕视觉' },
    usedOn: 'Live — Sala Apolo, BCN',
    year: 2025,
    image: 'live-01',
    note: {
      es: 'Doce bucles sincronizados al BPM de cada tema. Foto desde el público, noche 2.',
      en: 'Twelve loops synced to each track’s BPM. Photo from the crowd, night 2.',
      ja: '各曲のBPMに同期した12本のループ。2日目、客席から撮影。',
      ko: '곡마다 BPM에 맞춘 12개의 루프. 둘째 날 관객석에서 촬영.',
      zh: '十二段循环，与每首歌的 BPM 同步。第二晚台下拍摄。',
    },
  },
  {
    id: 'w03',
    code: 'W-004',
    title: { es: '“Rojo sobre negro” — EP', en: '“Red on black” — EP', ja: '「Red on Black」EP', ko: '“Red on Black” — EP', zh: '《黑上之红》EP' },
    client: 'Mirei K.',
    role: { es: 'Portada + vinilo', en: 'Cover + vinyl', ja: 'ジャケット＋レコード', ko: '커버 + 바이닐', zh: '封面 + 黑胶' },
    usedOn: 'Spotify / Bandcamp / 12"',
    link: 'https://bandcamp.com',
    year: 2025,
    image: 'cover-02',
    note: {
      es: 'Collage hecho a mano y escaneado a 1200 ppp para que el papel se notara en el vinilo.',
      en: 'Hand-made collage scanned at 1200 dpi so the paper shows on the vinyl.',
      ja: '手作りのコラージュを1200dpiでスキャンし、レコードで紙の質感が出るように。',
      ko: '손으로 만든 콜라주를 1200dpi로 스캔해 바이닐에서 종이 질감이 보이도록.',
      zh: '手工拼贴，以 1200 dpi 扫描，让纸张质感在黑胶上显现。',
    },
  },
  {
    id: 'w04',
    code: 'W-003',
    title: { es: '“Azotea” — single', en: '“Rooftop” — single', ja: '「屋上」シングル', ko: '“옥상” — 싱글', zh: '《屋顶》单曲' },
    client: 'sora no oto',
    role: { es: 'Portada + header de lanzamiento', en: 'Cover + release header', ja: 'ジャケット＋リリースヘッダー', ko: '커버 + 발매 헤더', zh: '封面 + 发行头图' },
    usedOn: 'Spotify / YouTube',
    link: 'https://open.spotify.com',
    year: 2025,
    image: 'cover-03',
    note: {
      es: 'La misma escena se recortó en cuadrado para la portada y en 16:9 para el vídeo.',
      en: 'The same scene was cropped square for the cover and 16:9 for the video.',
      ja: '同じシーンをジャケット用に正方形、動画用に16:9でトリミング。',
      ko: '같은 장면을 커버용 정사각형, 영상용 16:9로 크롭.',
      zh: '同一场景，封面裁为正方形，视频裁为 16:9。',
    },
  },
]

/* ------------------------------------------------------------------ */
/* Archivo — procesos                                                   */
/* ------------------------------------------------------------------ */

export const ARCHIVE_STATUSES = ['published', 'unpublished', 'archived'] as const
export type ArchiveStatus = (typeof ARCHIVE_STATUSES)[number]

export type ArchiveEntry = {
  id: string
  code: string
  title: Localized
  date: string
  status: ArchiveStatus
  images: ImageId[]
  note: Localized
  tags: string[]
}

export const ARCHIVE: ArchiveEntry[] = [
  {
    id: 'a01',
    code: 'A-031',
    title: { es: 'R', en: 'Frost — thumbnails and tests', ja: 'Frost — サムネイルと試作', ko: 'Frost — 썸네일과 테스트', zh: 'Frost — 缩略稿与测试' },
    date: '2026-09-12',
    status: 'published',
    images: ['process-01', 'cover-01'],
    note: {
      es: 'Catorce miniaturas a lápiz antes de llegar a la foto. La composición final es la número 9.',
      en: 'Fourteen pencil thumbnails before landing on the photo. The final layout is number 9.',
      ja: '写真に辿り着くまでに14枚の鉛筆サムネイル。最終案は9番。',
      ko: '사진에 이르기까지 14장의 연필 썸네일. 최종안은 9번.',
      zh: '在确定照片前画了十四张铅笔缩略稿。最终构图是第 9 张。',
    },
    tags: ['cover', 'sketch'],
  },
  {
    id: 'a02',
    code: 'A-030',
    title: { es: 'Header cromado — descartes', en: 'Chrome header — rejects', ja: 'クロームヘッダー — ボツ案', ko: '크롬 헤더 — 탈락안', zh: '铬质头图 — 废稿' },
    date: '2026-07-03',
    status: 'unpublished',
    images: ['header-02'],
    note: {
      es: 'Versiones que nunca enseñé. Me gusta más la trama de esta que la final.',
      en: 'Versions I never showed. I like this halftone more than the final one.',
      ja: '見せなかったバージョン。最終版より、この網点の方が好き。',
      ko: '보여주지 않은 버전들. 최종본보다 이 망점이 더 좋다.',
      zh: '从未展示过的版本。比起终稿，我更喜欢这一版的网点。',
    },
    tags: ['header', '3d'],
  },
  {
    id: 'a03',
    code: 'A-029',
    title: { es: 'Sala blanca — bocetos de figura', en: 'White room — figure sketches', ja: '白い部屋 — 人物スケッチ', ko: '하얀 방 — 인물 스케치', zh: '白色房间 — 人物草图' },
    date: '2026-05-21',
    status: 'archived',
    images: ['illus-01'],
    note: {
      es: 'No pienso subirlo. Lo guardo porque aquí entendí cómo usar el vacío.',
      en: 'Not planning to post it. Keeping it because this is where I understood how to use emptiness.',
      ja: '公開する予定はない。余白の使い方がわかった作品なので残しておく。',
      ko: '올릴 생각은 없다. 여백을 쓰는 법을 이해한 작업이라 남겨둔다.',
      zh: '不打算发布。留着它，是因为在这里我明白了如何使用留白。',
    },
    tags: ['illustration'],
  },
  {
    id: 'a04',
    code: 'A-028',
    title: { es: 'Señal — storyboard de visuales', en: 'Signal — visuals storyboard', ja: 'Signal — 映像ストーリーボード', ko: 'Signal — 비주얼 스토리보드', zh: 'Signal — 视觉分镜' },
    date: '2025-11-02',
    status: 'published',
    images: ['live-01', 'header-01'],
    note: {
      es: 'Mapa de colores por canción y referencias de ritmo para cada bucle.',
      en: 'Color map per song and rhythm references for each loop.',
      ja: '曲ごとのカラーマップと、各ループのリズム参考。',
      ko: '곡별 컬러 맵과 각 루프의 리듬 레퍼런스.',
      zh: '每首歌的色彩地图与各循环的节奏参考。',
    },
    tags: ['visual', 'live'],
  },
  {
    id: 'a05',
    code: 'A-027',
    title: { es: 'Collage — papel suelto', en: 'Collage — loose paper', ja: 'コラージュ — 紙片', ko: '콜라주 — 낱장 종이', zh: '拼贴 — 散纸' },
    date: '2025-08-17',
    status: 'archived',
    images: ['cover-02'],
    note: {
      es: 'Recortes que sobraron del EP. Solo archivo.',
      en: 'Leftover cut-outs from the EP. Archive only.',
      ja: 'EPの残りの切り抜き。アーカイブのみ。',
      ko: 'EP에서 남은 조각들. 보관 전용.',
      zh: 'EP 剩下的剪纸。仅存档。',
    },
    tags: ['collage'],
  },
]

/* ------------------------------------------------------------------ */
/* Refs — publicaciones                                                 */
/* ------------------------------------------------------------------ */

/**
 * Post bodies are an array of paragraphs. Inside a paragraph, `[[image-id|text]]`
 * marks a citation: the text becomes clickable and opens that image in the viewer.
 */
export type RefPost = {
  slug: string
  code: string
  title: Localized
  date: string
  tags: string[]
  cover: ImageId
  excerpt: Localized
  body: { es: string[] } & Partial<Record<Exclude<Locale, 'es'>, string[]>>
}

export const REFS: RefPost[] = [
  {
    slug: 'REVENGE x AERI',
    code: 'R-01',
    title: {
      es: 'REVENGE x AERI',
      en: 'REVENGE x AERI',
      ja: 'REVENGE x AERI',
      ko: 'REVENGE x AERI',
      zh: 'REVENGE x AERI',
    },
    date: '31-10-2026',
    tags: ['fashion', 'merch'],
    cover: 'ref-01',
    excerpt: {
      es: 'esto más que un articulo es un test para probar la visualización de la página, tengo bastante tiempo que no escribo artículos, así que si sueno medio aweonao, ya saben',
      en: 'Why power lines show up in so many summer scenes, and what they do with empty space.',
      ja: 'なぜ電線は多くの夏の情景に現れるのか、そして余白に何をもたらすのか。',
      ko: '왜 전선은 수많은 여름 장면에 등장하는지, 그리고 빈 공간에 무엇을 하는지.',
      zh: '为什么电线出现在那么多夏日场景中，它们又如何处理空白。',
    },
    body: {
      es: [
        'No soy alguien que esté metido en la moda / ropa porque tampoco es que me interese estarlo, pero, por joyas como esta lo recapacito',
        'Lo primero que me salió [[screenshot1|en mi feed de ig fue la collab de REVENGE x AERI,]] y ya era hora, desde hace bastante se le veía utilizando prendas de REVENGE y me extrañaba que no se llegasen a cruzar',
        'Cómo dije, no soy un experto mamador en la materia para dar una opinión de no mames, simplemente me gusta la collab y cómo se Aeri en las fotos, oficialmente es una modelo emo🗣, personalmente mi prenda favorita es PHOTOBOOTH ZIP WHITE aunque ni en pedo me gasto 118 cucufloros por una chaqueta no mamen, además, quién su sano juicio compraría una prenda por cuotas?😭',

      ],
      en: [
        'For weeks I’ve been noticing the [[header-01|power lines]] in summer scenes. They slice the sky into strips; without them, the sky would just be a color.',
        'Same thing in the [[cover-03|rooftop at dusk]]: the antennas are what make the sky feel huge. One thin line is enough to give scale.',
        'Note for the next header: less painted sky, more lines that measure it.',
      ],
    },
  },
]
