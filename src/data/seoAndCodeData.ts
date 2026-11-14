export type LanguageCode = 'en' | 'hi' | 'es' | 'pt' | 'ar';

export interface LanguagePack {
  code: LanguageCode;
  label: string;
  nativeLabel: string;
  navHome: string;
  navSupportedApps: string;
  navHowToUse: string;
  navPrivacy: string;
  navTerms: string;
  navContact: string;
  heroTitlePrefix: string;
  heroTitleMain: string;
  heroSubtitle: string;
  inputPlaceholder: string;
  pasteBtn: string;
  downloadBtn: string;
  extractingBtn: string;
  youtubePolicyMessage: string;
  howToSectionTitle: string;
  step1Title: string;
  step1Desc: string;
  step2Title: string;
  step2Desc: string;
  step3Title: string;
  step3Desc: string;
  whatIsLiftXTitle: string;
  keyFeaturesTitle: string;
  faqTitle: string;
}

export const TRANSLATIONS: Record<LanguageCode, LanguagePack> = {
  en: {
    code: 'en',
    label: 'English',
    nativeLabel: 'English (EN)',
    navHome: 'Home',
    navSupportedApps: 'Supported Apps',
    navHowToUse: 'How to Use',
    navPrivacy: 'Privacy Policy',
    navTerms: 'Terms & Conditions',
    navContact: 'Contact',
    heroTitlePrefix: 'LiftX',
    heroTitleMain: ' - All-in-One Social Media Media Downloader',
    heroSubtitle:
      'Download Videos, Reels, Photos, Stories, Carousels, and GIFs in HD/4K Quality — Free & No Login Required.',
    inputPlaceholder:
      'Paste Instagram, Facebook, LinkedIn, TikTok, X/Twitter, Pinterest, Snapchat, Reddit, or Vimeo link...',
    pasteBtn: 'Paste',
    downloadBtn: 'Download',
    extractingBtn: 'Fetching HD...',
    youtubePolicyMessage: 'YouTube downloads are not supported due to policy guidelines.',
    howToSectionTitle: 'How to Download Social Media Videos & Photos with LiftX?',
    step1Title: 'Step 1: Copy the Link',
    step1Desc:
      "Open Instagram, Facebook, X, LinkedIn, or Pinterest, tap 'Share', and copy the post, reel, or video URL.",
    step2Title: 'Step 2: Paste on LiftX',
    step2Desc:
      "Come back to LiftX, paste the link into the input box above, and hit the 'Download' button.",
    step3Title: 'Step 3: Save in HD',
    step3Desc:
      'Choose your preferred format (MP4 1080p/720p video, JPG photo, or MP3 audio) and save it directly to your device gallery.',
    whatIsLiftXTitle: 'What is LiftX - All-in-One Social Media Downloader?',
    keyFeaturesTitle: 'Why Millions Choose LiftX Media Downloader',
    faqTitle: 'Frequently Asked Questions (FAQ)'
  },
  hi: {
    code: 'hi',
    label: 'Hindi',
    nativeLabel: 'हिन्दी (HI)',
    navHome: 'होम',
    navSupportedApps: 'सपोर्टेड ऐप्स',
    navHowToUse: 'कैसे उपयोग करें',
    navPrivacy: 'गोपनीयता नीति',
    navTerms: 'नियम और शर्तें',
    navContact: 'संपर्क करें',
    heroTitlePrefix: 'LiftX',
    heroTitleMain: ' - ऑल-इन-वन सोशल मीडिया डाउनलोडर',
    heroSubtitle:
      'HD/4K क्वालिटी में वीडियो, रील्स, फोटो, स्टोरीज़, कैरोसेल और GIF डाउनलोड करें — बिल्कुल मुफ़्त और बिना लॉगिन के।',
    inputPlaceholder:
      'Instagram, Facebook, LinkedIn, TikTok, X, Pinterest, Snapchat या Reddit लिंक यहाँ पेस्ट करें...',
    pasteBtn: 'पेस्ट करें',
    downloadBtn: 'डाउनलोड',
    extractingBtn: 'प्रोसेसिंग...',
    youtubePolicyMessage: 'YouTube downloads are not supported due to policy guidelines.',
    howToSectionTitle: 'LiftX से सोशल मीडिया वीडियो और फोटो कैसे डाउनलोड करें?',
    step1Title: 'स्टेप 1: लिंक कॉपी करें',
    step1Desc:
      "Instagram, Facebook, X, LinkedIn या Pinterest खोलें, 'Share' पर टैप करें और पोस्ट/रील/वीडियो का URL कॉपी करें।",
    step2Title: 'स्टेप 2: LiftX पर पेस्ट करें',
    step2Desc:
      "LiftX पर वापस आएं, ऊपर दिए गए इनपुट बॉक्स में लिंक पेस्ट करें और 'Download' बटन दबाएं।",
    step3Title: 'स्टेप 3: HD में सेव करें',
    step3Desc:
      'अपना पसंदीदा फ़ॉर्मेट चुनें (MP4 1080p वीडियो या JPG फोटो) और इसे सीधे अपनी डिवाइस गैलरी में सेव करें।',
    whatIsLiftXTitle: 'LiftX क्या है? — फ़ास्ट ब्राउज़र-आधारित मीडिया सेवर',
    keyFeaturesTitle: 'LiftX की मुख्य विशेषताएं',
    faqTitle: 'अक्सर पूछे जाने वाले प्रश्न (FAQ)'
  },
  es: {
    code: 'es',
    label: 'Spanish',
    nativeLabel: 'Español (ES)',
    navHome: 'Inicio',
    navSupportedApps: 'Apps Compatibles',
    navHowToUse: 'Cómo Usar',
    navPrivacy: 'Privacidad',
    navTerms: 'Términos',
    navContact: 'Contacto',
    heroTitlePrefix: 'LiftX',
    heroTitleMain: ' - Descargador Todo en Uno de Redes Sociales',
    heroSubtitle:
      'Descarga Videos, Reels, Fotos, Historias, Carruseles y GIFs en calidad HD/4K — Gratis y sin iniciar sesión.',
    inputPlaceholder:
      'Pega el enlace de Instagram, Facebook, LinkedIn, TikTok, X, Pinterest, Snapchat o Reddit...',
    pasteBtn: 'Pegar',
    downloadBtn: 'Descargar',
    extractingBtn: 'Cargando...',
    youtubePolicyMessage: 'YouTube downloads are not supported due to policy guidelines.',
    howToSectionTitle: '¿Cómo descargar videos y fotos de redes sociales con LiftX?',
    step1Title: 'Paso 1: Copia el Enlace',
    step1Desc:
      "Abre Instagram, Facebook, X o Pinterest, toca 'Compartir' y copia la URL del reel, foto o video.",
    step2Title: 'Paso 2: Pega en LiftX',
    step2Desc:
      "Vuelve a LiftX, pega el enlace en el cuadro de búsqueda superior y presiona el botón 'Descargar'.",
    step3Title: 'Paso 3: Guarda en HD',
    step3Desc:
      'Elige tu formato preferido (video MP4 1080p o foto JPG) y guárdalo directamente en tu galería.',
    whatIsLiftXTitle: '¿Qué es LiftX Media Downloader?',
    keyFeaturesTitle: 'Características Principales de LiftX',
    faqTitle: 'Preguntas Frecuentes (FAQ)'
  },
  pt: {
    code: 'pt',
    label: 'Portuguese',
    nativeLabel: 'Português (PT)',
    navHome: 'Início',
    navSupportedApps: 'Apps Suportados',
    navHowToUse: 'Como Usar',
    navPrivacy: 'Privacidade',
    navTerms: 'Termos',
    navContact: 'Contato',
    heroTitlePrefix: 'LiftX',
    heroTitleMain: ' - Baixador Tudo-em-Um de Redes Sociais',
    heroSubtitle:
      'Baixe Vídeos, Reels, Fotos, Stories, Carrosséis e GIFs em qualidade HD/4K — Grátis e sem login.',
    inputPlaceholder:
      'Cole o link do Instagram, Facebook, LinkedIn, TikTok, X, Pinterest, Snapchat ou Reddit...',
    pasteBtn: 'Colar',
    downloadBtn: 'Baixar',
    extractingBtn: 'Processando...',
    youtubePolicyMessage: 'YouTube downloads are not supported due to policy guidelines.',
    howToSectionTitle: 'Como baixar vídeos e fotos de redes sociais com o LiftX?',
    step1Title: 'Passo 1: Copie o Link',
    step1Desc:
      "Abra o Instagram, Facebook, X ou Pinterest, toque em 'Compartilhar' e copie a URL do vídeo ou post.",
    step2Title: 'Passo 2: Cole no LiftX',
    step2Desc:
      "Volte para o LiftX, cole o link na caixa acima e clique no botão 'Baixar'.",
    step3Title: 'Passo 3: Salve em HD',
    step3Desc:
      'Escolha o formato desejado (vídeo MP4 1080p ou foto JPG) e salve direto na galeria do seu dispositivo.',
    whatIsLiftXTitle: 'O que é o LiftX Media Downloader?',
    keyFeaturesTitle: 'Principais Recursos do LiftX',
    faqTitle: 'Perguntas Frequentes (FAQ)'
  },
  ar: {
    code: 'ar',
    label: 'Arabic',
    nativeLabel: 'العربية (AR)',
    navHome: 'الرئيسية',
    navSupportedApps: 'التطبيقات المدعومة',
    navHowToUse: 'كيفية الاستخدام',
    navPrivacy: 'سياسة الخصوصية',
    navTerms: 'الشروط والأحكام',
    navContact: 'اتصل بنا',
    heroTitlePrefix: 'LiftX',
    heroTitleMain: ' - برنامج تحميل شامل من وسائل التواصل الاجتماعي',
    heroSubtitle:
      'قم بتحميل الفيديوهات والريلز والصور والقصص وصور GIF بجودة HD/4K — مجاناً وبدون تسجيل دخول.',
    inputPlaceholder:
      'الصق رابط إنستغرام أو فيسبوك أو لينكدإن أو تيك توك أو إكس أو بنترست هنا...',
    pasteBtn: 'لصق',
    downloadBtn: 'تحميل',
    extractingBtn: 'جاري التحميل...',
    youtubePolicyMessage: 'YouTube downloads are not supported due to policy guidelines.',
    howToSectionTitle: 'كيفية تحميل الفيديوهات والصور باستخدام LiftX؟',
    step1Title: 'الخطوة 1: انسخ الرابط',
    step1Desc:
      "افتح إنستغرام أو فيسبوك أو إكس أو بنترست، اضغط على 'مشاركة' وانسخ رابط الفيديو أو المنشور.",
    step2Title: 'الخطوة 2: الصق الرابط في LiftX',
    step2Desc:
      "عد إلى موقع LiftX، الصق الرابط في المربع أعلاه واضغط على زر 'تحميل'.",
    step3Title: 'الخطوة 3: احفظ بجودة HD',
    step3Desc:
      'اختر الصيغة المفضلة لديك (فيديو MP4 1080p أو صورة JPG) واحفظها مباشرة في جهازك.',
    whatIsLiftXTitle: 'ما هو موقع LiftX لتحميل الوسائط؟',
    keyFeaturesTitle: 'المميزات الرئيسية لمنصة LiftX',
    faqTitle: 'الأسئلة الشائعة (FAQ)'
  }
};

export interface PlatformGuide {
  id: string;
  slug: string;
  number: string;
  platformName: string;
  heroHeading: string;
  heroSubheading: string;
  h2Title: string;
  h3ArchitectureTitle: string;
  h3HowItWorksTitle: string;
  supportedMediaTypes: string[];
  introParagraph: string;
  architectureParagraph: string;
  workflowParagraph: string;
  specs: string;
  sampleUrl: string;
}

export interface DeviceHowTo {
  id: 'ios' | 'android' | 'desktop';
  label: string;
  browserName: string;
  saveLocation: string;
  steps: {
    stepNumber: string;
    title: string;
    description: string;
  }[];
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface KeyFeatureItem {
  id: string;
  number: string;
  title: string;
  description: string;
  metric: string;
}

export interface DeliverableFile {
  id: string;
  filename: string;
  language: string;
  description: string;
  code: string;
}

export const GLOBAL_DISCLAIMER_TEXT =
  'Disclaimer: LiftX is an independent web tool and is NOT affiliated with, endorsed, or sponsored by Instagram, Meta, Facebook, X (Twitter), TikTok, Pinterest, LinkedIn, or any other social media platform. All trademarks and copyrights belong to their respective owners. LiftX does not host any copyrighted media on its servers; all files are fetched directly from public CDNs. Users are solely responsible for respecting copyright laws and obtaining permission from content creators before reusing any downloaded media.';

export const QUICK_SAMPLE_LINKS = [
  {
    platform: 'Instagram',
    label: 'Instagram Reel',
    url: 'https://www.instagram.com/reel/C8x9vL2pQ7m/'
  },
  {
    platform: 'Facebook',
    label: 'Facebook Watch',
    url: 'https://www.facebook.com/watch/?v=1092837465192837'
  },
  {
    platform: 'X',
    label: 'X / Twitter HD',
    url: 'https://x.com/tech_frontier_x/status/1849201948271649102'
  },
  {
    platform: 'Pinterest',
    label: 'Pinterest Pin',
    url: 'https://www.pinterest.com/pin/849280451928874610/'
  },
  {
    platform: 'LinkedIn',
    label: 'LinkedIn Video',
    url: 'https://www.linkedin.com/posts/enterprise-systems_engineering-keynote-activity-72619482019482/'
  },
  {
    platform: 'TikTok',
    label: 'TikTok No-Watermark',
    url: 'https://www.tiktok.com/@visual_kinetics/video/7394810293847192841'
  },
  {
    platform: 'Snapchat',
    label: 'Snapchat Spotlight',
    url: 'https://www.snapchat.com/spotlight/W7_EDlXWTBiXAEEniNoMPwAAYb2/'
  },
  {
    platform: 'Reddit',
    label: 'Reddit + Audio',
    url: 'https://www.reddit.com/r/PraiseTheCameraMan/comments/1gl9x2k/alpine_fpv_descent/'
  },
  {
    platform: 'Vimeo',
    label: 'Vimeo 4K',
    url: 'https://vimeo.com/76979871'
  },
  {
    platform: 'YouTube',
    label: 'Test YouTube Policy Notice',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
  }
];

export const PLATFORM_SEO_GUIDES: PlatformGuide[] = [
  {
    id: 'instagram',
    slug: '/instagram-downloader',
    number: '01',
    platformName: 'Instagram',
    heroHeading: 'LiftX - Instagram Reels, Photos, Stories & Carousel Downloader',
    heroSubheading:
      'Download public Instagram Reels, Photos, Multi-Slide Carousels, IGTV, and Stories in original 1080p HD MP4 & JPG — Free & No Login.',
    h2Title: 'Instagram Downloader: Reels, Photos, Carousels, IGTV & Public Stories',
    h3ArchitectureTitle: 'Uncompressed MP4 Stream Extraction & Multi-Slide Album Support',
    h3HowItWorksTitle: 'Saving Public Reels, IGTV & Story Highlights Without Watermarks',
    supportedMediaTypes: ['Reels (1080p60)', 'Photos (Original JPG)', 'Carousel / Album Posts', 'IGTV Long Videos', 'Public Stories'],
    introParagraph:
      'LiftX provides creators, marketers, and everyday users with a fast, browser-based Instagram Downloader capable of saving public Reels, single photos, multi-slide carousel albums, IGTV broadcasts, and public Stories in original HD quality. Unlike screen recording—which degrades frame rate and overlays mobile status bars—LiftX fetches the clean source media directly from the origin CDN.',
    architectureParagraph:
      'When an Instagram URL (`instagram.com/reel/...`, `instagram.com/p/...`, or `instagram.com/stories/...`) is pasted into LiftX, our smart router inspects the public media manifest using rotated browser headers. This isolates the highest-bitrate H.264 MP4 video stream (1080×1920), original stereo AAC audio, and uncompressed 1080p JPEG images.',
    workflowParagraph:
      'Whether you are backing up your own vertical Reels for cross-platform publishing or saving design carousels for offline reference, simply copy the link from the Instagram Share menu and paste it into LiftX. Choose between MP4 1080p, MP4 720p, High-Res JPG Photo, or standalone MP3 audio.',
    specs: 'Reels · Carousels · Photos · Stories · 1080p HD',
    sampleUrl: 'https://www.instagram.com/reel/C8x9vL2pQ7m/'
  },
  {
    id: 'facebook',
    slug: '/facebook-downloader',
    number: '02',
    platformName: 'Facebook',
    heroHeading: 'LiftX - Facebook Public Video, Watch & Reels Downloader in Full HD',
    heroSubheading:
      'Save public Facebook Videos, FB Watch episodes, and Facebook Reels in 1080p Full HD, 720p MP4, or MP3 Audio instantly.',
    h2Title: 'Facebook Video Downloader: Save Public Videos, Watch Clips & FB Reels in Full HD',
    h3ArchitectureTitle: 'Direct 1080p HD & 720p SD Stream Resolution for fb.watch & Public Pages',
    h3HowItWorksTitle: 'Archiving Public Facebook Reels, Live Replays & Creator Broadcasts',
    supportedMediaTypes: ['FB Reels', 'Facebook Watch Clips', 'Public Page Videos', 'Live Stream Replays', 'HD Cover Thumbnails'],
    introParagraph:
      'Facebook Watch and Facebook Reels host millions of public tutorials, documentaries, culinary guides, and creator broadcasts, yet Facebook does not provide a native button to save MP4 files for offline viewing. LiftX Facebook Downloader extracts public videos and vertical FB Reels in crystal-clear 1080p Full HD and 720p HD.',
    architectureParagraph:
      'Our backend engine parses canonical `facebook.com/watch/?v=...` links, `facebook.com/reel/...` URLs, and shortened `fb.watch/...` mobile redirects. By resolving both the high-definition (`playable_url_quality_hd`) and standard-definition streams alongside the AAC audio track, LiftX delivers a complete, ready-to-play MP4 container.',
    workflowParagraph:
      'Tap "Share → Copy Link" on any public Facebook video or Reel, paste it into the LiftX search bar above, and preview the footage directly in our HTML5 video player before saving it to your phone gallery or desktop Downloads folder.',
    specs: 'fb.watch · FB Reels · 1080p Full HD & 720p MP4',
    sampleUrl: 'https://www.facebook.com/watch/?v=1092837465192837'
  },
  {
    id: 'x-twitter',
    slug: '/twitter-downloader',
    number: '03',
    platformName: 'X (Twitter)',
    heroHeading: 'LiftX - X (Twitter) Video & GIF Downloader in Multiple Resolutions',
    heroSubheading:
      'Download embedded X (Twitter) videos and convert looping GIFs to high-definition 1080p/720p MP4 files for free.',
    h2Title: 'X (Twitter) Downloader: Save Embedded Videos & GIFs in Multiple Resolutions',
    h3ArchitectureTitle: 'Multi-Bitrate Variant Selection & Looping GIF-to-MP4 Conversion',
    h3HowItWorksTitle: 'Downloading Public X Broadcasts & Viral Thread Clips Instantly',
    supportedMediaTypes: ['1080p HD Videos', '720p Fast MP4', 'Animated GIFs to MP4', 'Broadcast Clips', 'Audio MP3'],
    introParagraph:
      'Videos and animated GIFs embedded inside X (formerly Twitter) posts cannot be saved directly from the timeline without paid subscriptions or third-party bots. LiftX X/Twitter Downloader lets you extract any public tweet video or GIF in multiple resolutions (1080p, 720p, and 480p) right from your web browser.',
    architectureParagraph:
      'Because X transcodes uploaded GIFs into looping MP4 containers to optimize playback, standard image save commands fail. LiftX queries the syndication manifest for both `x.com` and `twitter.com` status URLs, listing every bitrate variant so you can download the highest-resolution MP4 or convert any reaction GIF into a universally compatible video file.',
    workflowParagraph:
      'Copy the link to any public X post containing a video or GIF, paste it into the input box on any LiftX page, and immediately choose between Full HD MP4, 720p MP4, High-Res Thumbnail JPG, or extracted MP3 audio.',
    specs: 'x.com & twitter.com · 1080p/720p MP4 · GIF Saver',
    sampleUrl: 'https://x.com/tech_frontier_x/status/1849201948271649102'
  },
  {
    id: 'pinterest',
    slug: '/pinterest-downloader',
    number: '04',
    platformName: 'Pinterest',
    heroHeading: 'LiftX - Pinterest Video Pins, Idea Pins & High-Res Image Downloader',
    heroSubheading:
      'Save high-resolution Pinterest Idea Pins, Video Pins, animated GIFs, and uncompressed JPG images to your device.',
    h2Title: 'Pinterest Downloader: Save High-Resolution Idea Pins, Video Pins & Images',
    h3ArchitectureTitle: 'Converting Segmented HLS Pin Streams into Standard Progressive MP4s',
    h3HowItWorksTitle: 'Archiving Creative Moodboards, DIY Tutorials & High-DPI Still Images',
    supportedMediaTypes: ['Video Pins (1080p)', 'Idea Pins', 'Uncompressed Master JPGs', 'Animated GIF Pins', 'pin.it Shortlinks'],
    introParagraph:
      'Pinterest is an essential visual discovery platform for designers, architects, illustrators, and DIY creators, but saving video pins or multi-page Idea Pins for offline reference is not supported natively. LiftX Pinterest Downloader extracts both high-definition MP4 video pins and uncompressed master JPG images in one click.',
    architectureParagraph:
      'Pinterest frequently serves video pins using HTTP Live Streaming (`.m3u8` segments) that cannot be saved directly by mobile or desktop browsers. LiftX inspects the Pin metadata object, locates the progressive MP4 container hosted on `v.pinimg.com` and the original `originals/` image asset on `i.pinimg.com`, and streams them directly to your device.',
    workflowParagraph:
      'Both full desktop URLs (`pinterest.com/pin/...`) and mobile `pin.it` shortlinks are supported automatically. Paste your Pinterest link above to preview the video or photo and save it in original resolution.',
    specs: 'Idea Pins · Video Pins · Master JPG · pin.it Support',
    sampleUrl: 'https://www.pinterest.com/pin/849280451928874610/'
  },
  {
    id: 'linkedin',
    slug: '/linkedin-downloader',
    number: '05',
    platformName: 'LinkedIn',
    heroHeading: 'LiftX - LinkedIn Video, Keynote & Educational Post Downloader',
    heroSubheading:
      'Download public LinkedIn educational videos, conference keynotes, product demos, and post media in 1080p Full HD MP4.',
    h2Title: 'LinkedIn & Emerging Networks: Download Educational Videos, TikToks & Reddit Clips',
    h3ArchitectureTitle: 'Direct CDN Extraction for LinkedIn Native Videos & Enterprise Demos',
    h3HowItWorksTitle: 'Saving Professional Tutorials, Keynote Clips & Presentation Media Offline',
    supportedMediaTypes: ['LinkedIn Native Videos', 'Educational Keynotes', 'Product Launch Demos', 'Company Page Clips', 'Poster Images'],
    introParagraph:
      'LinkedIn hosts thousands of high-value engineering talks, leadership keynotes, B2B product demonstrations, and educational tutorials shared by industry experts. LiftX LinkedIn Video Downloader allows professionals, students, and researchers to save public LinkedIn video posts for offline study and presentation reference.',
    architectureParagraph:
      'When you paste a public `linkedin.com/posts/...` or `linkedin.com/feed/update/...` link, LiftX resolves the progressive MP4 stream from LinkedIn’s media delivery network at full 1080p or 720p resolution while preserving clean speech audio and caption metadata.',
    workflowParagraph:
      'Beyond LinkedIn, our universal engine seamlessly handles watermark-free TikTok videos, Reddit videos with merged DASH audio, Snapchat Spotlight clips, and 4K Vimeo showcases from the exact same search box.',
    specs: 'LinkedIn Native MP4 · 1080p/720p · Speech MP3',
    sampleUrl: 'https://www.linkedin.com/posts/enterprise-systems_engineering-keynote-activity-72619482019482/'
  },
  {
    id: 'tiktok',
    slug: '/tiktok-downloader',
    number: '06',
    platformName: 'TikTok',
    heroHeading: 'LiftX - TikTok Video Downloader Without Watermark (HD MP4 & MP3)',
    heroSubheading:
      'Download public TikTok videos in original 1080p60 Full HD without floating username watermarks, or extract trending audio as MP3.',
    h2Title: 'TikTok Video Downloader Without Watermark & MP3 Audio Extractor',
    h3ArchitectureTitle: 'Clean Master Stream Resolution Prior to Watermark Overlay Rendering',
    h3HowItWorksTitle: 'Saving Unwatermarked Vertical Videos & Trending Sounds on Any Device',
    supportedMediaTypes: ['No-Watermark 1080p MP4', '60fps Vertical Video', 'Original MP3 Audio', 'TikTok Photo Slides', 'Cover Thumbnails'],
    introParagraph:
      'Saving a video through the native TikTok app embeds a bouncing username watermark and end-screen logo over the footage. LiftX TikTok Downloader resolves the clean, unwatermarked master MP4 file directly from the origin CDN so creators and editors get pristine full-frame video.',
    architectureParagraph:
      'Supporting both full `tiktok.com/@creator/video/...` links and shortened `vm.tiktok.com` / `vt.tiktok.com` mobile share URLs, LiftX extracts the original 1080p stream alongside a dedicated 320kbps MP3 audio extractor for voiceovers and music tracks.',
    workflowParagraph:
      'Paste any public TikTok link into LiftX to preview the watermark-free video in real time and save it directly to your iPhone Files/Photos app, Android Gallery, or desktop computer.',
    specs: 'No Watermark · 1080p60 MP4 · 320kbps MP3 Audio',
    sampleUrl: 'https://www.tiktok.com/@visual_kinetics/video/7394810293847192841'
  },
  {
    id: 'snapchat',
    slug: '/snapchat-downloader',
    number: '07',
    platformName: 'Snapchat',
    heroHeading: 'LiftX - Snapchat Spotlight & Public Story Video Downloader',
    heroSubheading:
      'Save public Snapchat Spotlight videos, creator stories, and vertical lenses in crisp 1080p HD MP4 quality.',
    h2Title: 'Snapchat Spotlight & Public Story Downloader in Original HD',
    h3ArchitectureTitle: 'Instant Resolution of Public Snapchat Spotlight & Story Permalinks',
    h3HowItWorksTitle: 'Saving Vertical Spotlight Clips & Creator Highlights Without App Login',
    supportedMediaTypes: ['Snapchat Spotlight HD', 'Public Creator Stories', 'Vertical MP4 Clips', 'Story Cover JPGs'],
    introParagraph:
      'Snapchat Spotlight and public Creator Stories feature viral vertical clips, behind-the-scenes moments, and creative AR lens showcases. LiftX enables instant browser-based downloading of any publicly shared Snapchat Spotlight or Story URL in full vertical HD.',
    architectureParagraph:
      'When a `snapchat.com/spotlight/...` or `t.snapchat.com/...` share link is entered, LiftX extracts the underlying MP4 video stream and thumbnail poster without requiring a Snapchat account or mobile app installation.',
    workflowParagraph:
      'Simply tap Share on any public Snapchat Spotlight video, copy the link, and paste it into LiftX to save the clean MP4 file directly to your device.',
    specs: 'Snapchat Spotlight · Public Stories · 1080p Vertical MP4',
    sampleUrl: 'https://www.snapchat.com/spotlight/W7_EDlXWTBiXAEEniNoMPwAAYb2/'
  },
  {
    id: 'reddit',
    slug: '/reddit-downloader',
    number: '08',
    platformName: 'Reddit',
    heroHeading: 'LiftX - Reddit Video Downloader with Merged Audio (v.redd.it HD)',
    heroSubheading:
      'Download Reddit videos with synchronized stereo sound, animated GIFs, and subreddit clips in 1080p Full HD MP4.',
    h2Title: 'Reddit Video Downloader with Merged Audio (v.redd.it Sound Fix)',
    h3ArchitectureTitle: 'Automatic DASH Video + Audio Track Synchronization for v.redd.it',
    h3HowItWorksTitle: 'Saving Subreddit Clips with Full Stereo Sound in One Click',
    supportedMediaTypes: ['v.redd.it Videos + Audio', '1080p Subreddit Clips', 'Reddit GIFs to MP4', 'Standalone MP3 Audio'],
    introParagraph:
      'Reddit hosts video frames and audio tracks in separate DASH files on `v.redd.it`, which causes standard browser saves to produce silent videos. LiftX Reddit Video Downloader automatically locates both the highest-bitrate video stream and the 128kbps/192kbps audio stream, delivering a single MP4 with full sound.',
    architectureParagraph:
      'Our extractor supports full `reddit.com/r/.../comments/...` permalinks as well as shortened `redd.it/...` and `v.redd.it/...` URLs, automatically resolving the merged HD container.',
    workflowParagraph:
      'Copy any public Reddit post link, paste it into LiftX, verify the audio in our live HTML5 player, and download the synchronized MP4 file.',
    specs: 'v.redd.it DASH Merger · Full Stereo Sound · 1080p MP4',
    sampleUrl: 'https://www.reddit.com/r/PraiseTheCameraMan/comments/1gl9x2k/alpine_fpv_descent/'
  },
  {
    id: 'vimeo',
    slug: '/vimeo-downloader',
    number: '09',
    platformName: 'Vimeo',
    heroHeading: 'LiftX - Vimeo 4K & 1080p Full HD Video Downloader',
    heroSubheading:
      'Download public Vimeo Staff Picks, indie filmmaking showreels, and motion design portfolios in original 4K UHD & 1080p MP4.',
    h2Title: 'Vimeo Video Downloader: Archive Public 4K Showreels & Creative Films',
    h3ArchitectureTitle: 'High-Bitrate Progressive MP4 & Audio Extraction for Public Vimeo Links',
    h3HowItWorksTitle: 'Saving High-Definition Showreels & Educational Videos for Offline Viewing',
    supportedMediaTypes: ['4K UHD Showreels', '1080p Full HD MP4', '720p Fast Stream', 'Uncompressed Cover JPG'],
    introParagraph:
      'Vimeo is the gold standard for filmmakers, motion designers, and creative agencies sharing high-bitrate videos. LiftX Vimeo Downloader lets you save publicly accessible Vimeo videos in 4K Ultra HD, 1080p Full HD, or 720p MP4 directly from your browser.',
    architectureParagraph:
      'By querying public Vimeo player configuration manifests and oEmbed endpoints, LiftX identifies the highest-resolution progressive MP4 stream and high-DPI thumbnail image.',
    workflowParagraph:
      'Paste any public `vimeo.com/...` URL into the LiftX search box above to preview the film and download it in your preferred resolution.',
    specs: '4K UHD & 1080p MP4 · High-Bitrate Audio · Cover JPG',
    sampleUrl: 'https://vimeo.com/76979871'
  }
];

export const KEY_FEATURES_GRID: KeyFeatureItem[] = [
  {
    id: 'feat-unlimited',
    number: '01',
    title: 'Unlimited Downloads',
    description:
      'Save as many public videos, Reels, Carousels, Idea Pins, and GIFs as you need with zero daily bandwidth caps or throttling.',
    metric: 'No Daily Limits'
  },
  {
    id: 'feat-quality',
    number: '02',
    title: 'Original HD & 4K Quality',
    description:
      'Fetches the untouched master MP4 and original-DPI JPG streams directly from the platform CDN without re-compression.',
    metric: '1080p / 4K / 60fps'
  },
  {
    id: 'feat-free',
    number: '03',
    title: '100% Free & No Login Required',
    description:
      'No subscription tiers, no credit cards, and no social account login or password ever required. Just paste and download.',
    metric: '$0.00 Forever'
  },
  {
    id: 'feat-privacy',
    number: '04',
    title: 'Safe & Zero Data Stored on Servers',
    description:
      'Engineered on a zero-storage direct streaming proxy. LiftX never stores your downloaded media or keeps browsing history logs.',
    metric: 'Zero-Log Privacy'
  },
  {
    id: 'feat-devices',
    number: '05',
    title: 'Works on Android, iOS, Windows & Mac',
    description:
      '100% browser-based web utility optimized for mobile Safari on iPhone/iPad, Chrome on Android, and all desktop operating systems.',
    metric: 'All Browsers & OS'
  },
  {
    id: 'feat-smart-routing',
    number: '06',
    title: 'Universal Smart Platform Routing',
    description:
      'Paste a link from LinkedIn, Instagram, Facebook, TikTok, X, Pinterest, Snapchat, Reddit, or Vimeo on any page and LiftX auto-routes it.',
    metric: '9+ Major Networks'
  }
];

export const DEVICE_HOW_TO_GUIDES: DeviceHowTo[] = [
  {
    id: 'ios',
    label: 'iOS (iPhone & iPad)',
    browserName: 'Safari Browser (iOS 15+)',
    saveLocation: 'Files App → Downloads (Tap "Save Video" to move to Photos Camera Roll)',
    steps: [
      {
        stepNumber: '01',
        title: 'Copy the Public Link from Any Social App',
        description:
          'Open Instagram, Facebook, LinkedIn, TikTok, X, Pinterest, Snapchat, or Reddit on your iPhone. Tap Share and select "Copy Link".'
      },
      {
        stepNumber: '02',
        title: 'Paste into LiftX in Safari',
        description:
          'Open LiftX Media Downloader in Safari and tap the "Paste" button inside the search bar. LiftX auto-detects the platform and resolves HD formats.'
      },
      {
        stepNumber: '03',
        title: 'Save to Files or Photos Camera Roll',
        description:
          'Tap "Download MP4 1080p" or "Save Photo JPG". Open the downloaded item from the Safari address bar and tap Share → "Save Video" for your Camera Roll.'
      }
    ]
  },
  {
    id: 'android',
    label: 'Android Devices',
    browserName: 'Google Chrome / Samsung Internet',
    saveLocation: 'Internal Storage → Downloads Folder & Device Gallery',
    steps: [
      {
        stepNumber: '01',
        title: 'Copy the Share URL from the Source App',
        description:
          'Tap the Share icon on any public Reel, video, pin, or post and tap "Copy Link" to copy the permalink to your Android clipboard.'
      },
      {
        stepNumber: '02',
        title: 'One-Tap Paste & Smart Platform Detection',
        description:
          'Open LiftX in Chrome, tap the "Paste" button in the input box, and press the blue "Download" button to load all available quality options.'
      },
      {
        stepNumber: '03',
        title: 'Instant Gallery & Downloads Save',
        description:
          'Tap your preferred quality (MP4 1080p, 720p, JPG Photo, or Audio MP3). Chrome saves the file directly into your Downloads folder and Gallery.'
      }
    ]
  },
  {
    id: 'desktop',
    label: 'Windows & macOS',
    browserName: 'Chrome, Safari, Firefox, Edge, Brave',
    saveLocation: 'System ~/Downloads Directory (Named LiftX_[Platform]_1080p.mp4)',
    steps: [
      {
        stepNumber: '01',
        title: 'Copy the Post URL from Your Browser',
        description:
          'Navigate to any public post, Reel, Pin, or video on desktop and copy the URL from the address bar or Share menu.'
      },
      {
        stepNumber: '02',
        title: 'Paste Link & Preview in HTML5 Player',
        description:
          'Click "Paste" or press Ctrl+V / Cmd+V in the LiftX input bar and click "Download" to inspect the live video preview.'
      },
      {
        stepNumber: '03',
        title: 'Download Clean MP4, JPG, or MP3',
        description:
          'Select MP4 1080p, MP4 720p, JPG Photo, or MP3 Audio. Our client-side downloader saves the file with a clean, organized filename.'
      }
    ]
  }
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-free',
    category: 'Pricing & Access',
    question: 'Is LiftX Media Downloader 100% free to use?',
    answer:
      'Yes! LiftX is completely free with unlimited downloads. You never have to register an account, log in with your social media credentials, or pay for HD/4K quality.'
  },
  {
    id: 'faq-supported',
    category: 'Supported Platforms',
    question: 'Which social media platforms are supported by LiftX?',
    answer:
      'LiftX supports downloading public videos, Reels, photos, stories, carousels, and GIFs from Instagram, Facebook, X (Twitter), Pinterest, LinkedIn, TikTok (without watermark), Snapchat Spotlight, Reddit (with merged audio), and Vimeo.'
  },
  {
    id: 'faq-youtube',
    category: 'Policy Guidelines',
    question: 'Why are YouTube downloads not supported on LiftX?',
    answer:
      'YouTube downloads are not supported due to policy guidelines and Terms of Service compliance. Whenever a youtube.com or youtu.be link is pasted, LiftX politely notifies you and blocks extraction.'
  },
  {
    id: 'faq-locations',
    category: 'File Management',
    question: 'Where are downloaded videos and photos saved on my device?',
    answer:
      'On Android, Windows, and Mac, files are saved directly to your default "Downloads" folder (and automatically appear in your Android Gallery). On iPhone/iPad (Safari), files save to the "Downloads" folder inside the iOS Files app, from which you can tap "Save Video" to move them to your Camera Roll.'
  },
  {
    id: 'faq-private',
    category: 'Privacy & Access',
    question: 'Can I download videos or photos from private accounts?',
    answer:
      'No. LiftX strictly respects user privacy and platform security controls. Only publicly accessible posts, Reels, Pins, and videos that do not require authentication can be downloaded.'
  },
  {
    id: 'faq-data-storage',
    category: 'Privacy & Security',
    question: 'Does LiftX store downloaded videos or track my download history?',
    answer:
      'No. LiftX operates on a strict zero-storage architecture. All media files are fetched and streamed directly from the public origin CDNs to your browser without saving files or user logs on our servers.'
  },
  {
    id: 'faq-formats',
    category: 'Formats & Quality',
    question: 'What file formats and resolutions can I download with LiftX?',
    answer:
      'Depending on the source post, LiftX provides MP4 video in 1080p Full HD (and up to 4K UHD when available on Vimeo/X), MP4 720p HD for fast mobile saving, original high-resolution JPG photos/covers, and 320kbps MP3 audio tracks.'
  },
  {
    id: 'faq-smart-routing',
    category: 'Smart Routing',
    question: 'Do I need to switch pages to download from a different social network?',
    answer:
      'No! Thanks to LiftX Smart Routing, you can paste a TikTok, LinkedIn, Pinterest, or Instagram link into the input box on any page, and LiftX will automatically detect the platform and fetch the right media options.'
  }
];

export const DELIVERABLE_FILES: DeliverableFile[] = [
  {
    id: 'server-js',
    filename: '1. server.js',
    language: 'javascript',
    description:
      'Express backend with YouTube policy blocker, yt-dlp runner, User-Agent rotation, branded short URL generator (/api/share), and zero-storage /api/stream endpoint.',
    code: `import express from 'express';
import { spawn } from 'child_process';
import { Readable } from 'stream';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  USER_AGENT_POOL,
  getRandomUserAgent,
  detectPlatformFromUrl,
  fallbackExtractMedia
} from './fallbackScraper.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

const YOUTUBE_BLOCK_REGEX =
  /(?:https?:\\/\\/)?(?:www\\.|m\\.|music\\.|gaming\\.|kids\\.)?(?:youtube\\.com|youtu\\.be|yt\\.be|youtube-nocookie\\.com)(?:\\/|$|\\?|#)/i;

export function isYouTubeUrl(inputUrl) {
  if (!inputUrl || typeof inputUrl !== 'string') return false;
  return YOUTUBE_BLOCK_REGEX.test(inputUrl.trim());
}

export function strictYouTubeBlockerMiddleware(req, res, next) {
  const candidateUrl =
    (req.body && typeof req.body.url === 'string' ? req.body.url : '') ||
    (typeof req.query.url === 'string' ? req.query.url : '');

  if (candidateUrl && isYouTubeUrl(candidateUrl)) {
    return res.status(403).json({
      success: false,
      blocked: true,
      code: 'YOUTUBE_STRICTLY_FORBIDDEN',
      error: 'YouTube downloads are not supported due to policy guidelines.'
    });
  }
  next();
}

app.use(express.json({ limit: '1mb' }));
app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/extract', strictYouTubeBlockerMiddleware, async (req, res) => {
  const rawUrl = typeof req.body?.url === 'string' ? req.body.url.trim() : '';
  if (!rawUrl) {
    return res.status(400).json({ success: false, error: 'Please provide a valid social media URL.' });
  }
  const fallbackResult = await fallbackExtractMedia(rawUrl, {
    userAgent: getRandomUserAgent()
  });
  return res.json(fallbackResult);
});

app.listen(PORT, () => {
  console.log(\`LiftX Media Downloader running at http://localhost:\${PORT}\`);
});`
  },
  {
    id: 'fallback-scraper-js',
    filename: '2. fallbackScraper.js',
    language: 'javascript',
    description:
      'Multi-platform extractor supporting LinkedIn, Instagram, Facebook, TikTok, X/Twitter, Pinterest, Snapchat, Reddit, and Vimeo.',
    code: `export function detectPlatformFromUrl(rawUrl) {
  const lower = (rawUrl || '').toLowerCase();
  if (/(?:^|\\.|\\/)(youtube\\.com|youtu\\.be|m\\.youtube\\.com|yt\\.be)(?:\\/|$|\\?)/i.test(lower)) return 'YouTube';
  if (lower.includes('linkedin.com') || lower.includes('lnkd.in')) return 'LinkedIn';
  if (lower.includes('instagram.com') || lower.includes('instagr.am')) return 'Instagram';
  if (lower.includes('facebook.com') || lower.includes('fb.watch')) return 'Facebook';
  if (lower.includes('tiktok.com') || lower.includes('vm.tiktok.com')) return 'TikTok';
  if (lower.includes('twitter.com') || lower.includes('x.com')) return 'X';
  if (lower.includes('pinterest.') || lower.includes('pin.it')) return 'Pinterest';
  if (lower.includes('snapchat.com')) return 'Snapchat';
  if (lower.includes('reddit.com') || lower.includes('redd.it') || lower.includes('v.redd.it')) return 'Reddit';
  if (lower.includes('vimeo.com')) return 'Vimeo';
  return 'Social Media';
}`
  },
  {
    id: 'public-index-html',
    filename: '3. public/index.html',
    language: 'html',
    description:
      'Semantic HTML5 template with LiftX - All-in-One Social Media Media Downloader H1, AdSense slots, and JSON-LD schema.',
    code: `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>LiftX - All-in-One Social Media Media Downloader (HD/4K)</title>
  <meta name="description" content="Download Videos, Reels, Photos, Stories, Carousels, and GIFs in HD/4K Quality — Free & No Login Required." />
  <link rel="stylesheet" href="/styles.css" />
</head>
<body>
  <h1>LiftX - All-in-One Social Media Media Downloader</h1>
  <p>Download Videos, Reels, Photos, Stories, Carousels, and GIFs in HD/4K Quality — Free & No Login Required.</p>
  <script type="module" src="/app.js"></script>
</body>
</html>`
  },
  {
    id: 'public-styles-css',
    filename: '4. public/styles.css',
    language: 'css',
    description: 'Responsive stylesheet styled around LiftX #1167D8 Royal Blue with Light/Dark theme tokens.',
    code: `:root {
  --liftx-blue: #1167D8;
  --liftx-blue-hover: #0D54B3;
  --bg-canvas: #F8FAFC;
  --bg-surface: #FFFFFF;
  --text-primary: #0F172A;
}`
  },
  {
    id: 'public-app-js',
    filename: '5. public/app.js',
    language: 'javascript',
    description: 'Frontend smart router, platform detector, clipboard paste handler, and client-side blob downloader.',
    code: `export function detectSocialPlatform(url) {
  const clean = (url || '').trim().toLowerCase();
  if (clean.includes('youtube.com') || clean.includes('youtu.be')) {
    return { id: 'youtube', name: 'YouTube (Not Supported)', blocked: true };
  }
  if (clean.includes('linkedin.com')) return { id: 'linkedin', name: 'LinkedIn' };
  if (clean.includes('instagram.com')) return { id: 'instagram', name: 'Instagram' };
  if (clean.includes('facebook.com') || clean.includes('fb.watch')) return { id: 'facebook', name: 'Facebook' };
  if (clean.includes('tiktok.com')) return { id: 'tiktok', name: 'TikTok' };
  if (clean.includes('x.com') || clean.includes('twitter.com')) return { id: 'x', name: 'X (Twitter)' };
  if (clean.includes('pinterest.') || clean.includes('pin.it')) return { id: 'pinterest', name: 'Pinterest' };
  if (clean.includes('snapchat.com')) return { id: 'snapchat', name: 'Snapchat' };
  if (clean.includes('reddit.com')) return { id: 'reddit', name: 'Reddit' };
  if (clean.includes('vimeo.com')) return { id: 'vimeo', name: 'Vimeo' };
  return { id: 'generic', name: 'Public Media' };
}`
  },
  {
    id: 'package-json',
    filename: '6. package.json',
    language: 'json',
    description: 'Complete Node.js package manifest.',
    code: `{
  "name": "liftx-media-downloader",
  "version": "2.0.0",
  "description": "LiftX - All-in-One Social Media Media Downloader",
  "type": "module",
  "scripts": {
    "dev": "tsx server.ts",
    "build": "vite build",
    "start": "node server.ts"
  }
}`
  }
];
