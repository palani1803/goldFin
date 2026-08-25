const Parser = require('rss-parser')
const parser = new Parser({
  customFields: {
    item: ['source', 'pubDate'],
  },
})

// Cache in memory for 15 minutes to prevent redundant requests
let cachedNews = null
let lastFetchTime = 0
const CACHE_DURATION_MS = 15 * 60 * 1000 // 15 mins

/**
 * Curated list of Tamil gold market fallback news in case external feed is temporarily unreachable
 */
const FALLBACK_NEWS = [
  {
    id: 'f1',
    title: 'இன்றைய தங்கம் விலை நிலவரம்: சென்னை & தமிழகத்தில் 22K மற்றும் 24K ஆபரண தங்கம் விலை நிலவரம்',
    source: 'தினமலர் செய்திகள்',
    pubDate: new Date().toISOString(),
    link: '#',
    timeAgo: '1 மணி நேரத்திற்கு முன்',
    readTime: '3 நிமிட வாசிப்பு',
    category: 'இன்றைய விலை',
    snippet: 'சென்னை தங்கம் மற்றும் வைர வியாபாரிகள் சங்கத்தின் இன்றைய அதிகாரப்பூர்வ தொடக்க விலை நிலவரப்படி 22 காரட் ஆபரண தங்கம் மற்றும் 24 காரட் சுத்த தங்க விலை விபரம்.',
  },
  {
    id: 'f2',
    title: 'சுபமுகூர்த்த சீசன் தொடக்கம்: தமிழக சந்தைகளில் ஆபரண தங்க நகைகளுக்கான நேரடி தேவை அதிகரிப்பு',
    source: 'தினத்தந்தி',
    pubDate: new Date().toISOString(),
    link: '#',
    timeAgo: '3 மணி நேரத்திற்கு முன்',
    readTime: '4 நிமிட வாசிப்பு',
    category: 'சந்தை நிலவரம்',
    snippet: 'திருமண மற்றும் முகூர்த்த நாட்களை முன்னிட்டு விருதுநகர், மதுரை, தென்காசி உள்ளிட்ட தென் மாவட்ட நகைக்கடைகளில் வாடிக்கையாளர்கள் தங்கம் முன்பதிவு விறுவிறுப்பு.',
  },
  {
    id: 'f3',
    title: 'மத்திய அரசு தங்க இறக்குமதி சுங்க வரி மாற்றம்: சாமானிய நுகர்வோருக்கு சாதகமான விலை தாக்கம்',
    source: 'புதிய தலைமுறை',
    pubDate: new Date().toISOString(),
    link: '#',
    timeAgo: '5 மணி நேரத்திற்கு முன்',
    readTime: '5 நிமிட வாசிப்பு',
    category: 'அரசு கொள்கை',
    snippet: 'இந்திய உள்நாட்டு சந்தையில் தங்கத்தின் மீதான வரி நெறிமுறைகள் மற்றும் டாலருக்கு எதிரான இந்திய ரூபாய் மதிப்பினால் தங்கம் விலை சீராக உள்ளது.',
  },
  {
    id: 'f4',
    title: '916 ஹால்மார்க் & 6 இலக்க HUID முத்திரை: தங்க நகை வாங்கும் போது பொதுமக்கள் கவனிக்க வேண்டியவை',
    source: 'News18 தமிழ்நாடு',
    pubDate: new Date().toISOString(),
    link: '#',
    timeAgo: '8 மணி நேரத்திற்கு முன்',
    readTime: '4 நிமிட வாசிப்பு',
    category: 'விழிப்புணர்வு',
    snippet: 'மத்திய அரசின் BIS ஹால்மார்க் 6 இலக்க HUID முத்திரையை BIS Care செயலி மூலம் சரிபார்த்து தங்க நகைகளின் நம்பகத்தன்மையை உறுதி செய்யும் வழிகாட்டி.',
  },
  {
    id: 'f5',
    title: 'தங்க சேமிப்பு & உடனடி நகைக்கடன்: அவசர தேவைகளுக்கு குறைந்த வட்டியில் ரொக்க உதவி பெறுவது எப்படி?',
    source: 'விகடன் பிசினஸ்',
    pubDate: new Date().toISOString(),
    link: '#',
    timeAgo: '12 மணி நேரத்திற்கு முன்',
    readTime: '4 நிமிட வாசிப்பு',
    category: 'தங்க முதலீடு',
    snippet: 'குடும்ப அவசர நிதி தேவைகளுக்கு உங்கள் தங்க நகைகளை பாதுகாப்பான வங்கி லாக்கர்களில் அடமானம் வைத்து உடனடி ரொக்கம் மற்றும் குறைந்த வட்டி பலன்கள்.',
  }
]

/**
 * Formats a raw pubDate into relative time in Tamil (e.g. "2 மணி நேரத்திற்கு முன்")
 */
function getRelativeTimeTamil(pubDateStr) {
  try {
    const pubDate = new Date(pubDateStr)
    const now = new Date()
    const diffMs = now - pubDate
    const diffMins = Math.floor(diffMs / (1000 * 60))
    const diffHours = Math.floor(diffMins / 60)
    const diffDays = Math.floor(diffHours / 24)

    if (diffMins < 60) {
      return `${Math.max(1, diffMins)} நிமிடங்களுக்கு முன்`
    } else if (diffHours < 24) {
      return `${diffHours} மணி நேரத்திற்கு முன்`
    } else {
      return `${diffDays} நாட்களுக்கு முன்`
    }
  } catch {
    return 'சமீபத்தில்'
  }
}

/**
 * Fetches live Tamil gold market news from Google News RSS feed
 */
const fetchGoldMarketNews = async () => {
  const now = Date.now()
  if (cachedNews && now - lastFetchTime < CACHE_DURATION_MS) {
    return cachedNews
  }

  try {
    console.log('📡 Fetching live Tamil domestic gold market news feed...')
    // Search Tamil news queries for gold rate and jewelry in Tamil Nadu
    const feedUrl = 'https://news.google.com/rss/search?q=%E0%AE%A4%E0%AE%99%E0%AE%95+%E0%AE%B5%E0%AE%BF%E0%AE%B2%E0%AF%88+OR+%E0%AE%A4%E0%AE%99%E0%AE%95%E0%AE%AE%E0%AF%8D+%E0%AE%B5%E0%AE%BF%E0%AE%B2%E0%AF%88+OR+%E0%AE%A4%E0%AE%99%E0%AE%95+%E0%AE%A8%E0%AE%95%E0%AF%88&hl=ta&gl=IN&ceid=IN:ta'
    const feed = await parser.parseURL(feedUrl)

    if (!feed || !feed.items || feed.items.length === 0) {
      console.warn('⚠️ Empty Tamil feed returned, using Tamil domestic news fallback.')
      return FALLBACK_NEWS
    }

    const categories = ['இன்றைய விலை', 'சந்தை நிலவரம்', 'அரசு கொள்கை', 'தங்க முதலீடு', 'விழிப்புணர்வு']

    const formattedArticles = feed.items.slice(0, 10).map((item, index) => {
      let cleanTitle = item.title || ''
      let sourceName = 'தமிழ் செய்தி'

      if (cleanTitle.includes(' - ')) {
        const parts = cleanTitle.split(' - ')
        sourceName = parts.pop().trim()
        cleanTitle = parts.join(' - ').trim()
      }

      return {
        id: `news-ta-${index + 1}`,
        title: cleanTitle,
        source: sourceName,
        link: item.link || '#',
        pubDate: item.pubDate || new Date().toISOString(),
        timeAgo: getRelativeTimeTamil(item.pubDate),
        readTime: '3 நிமிட வாசிப்பு',
        category: categories[index % categories.length],
        snippet: item.contentSnippet || item.content || 'இன்றைய நேரடி தங்கம் விலை மற்றும் ஆபரண சந்தை நிலவரங்கள்.',
      }
    })

    cachedNews = formattedArticles
    lastFetchTime = now
    console.log(`✅ Loaded ${formattedArticles.length} live Tamil gold market news articles.`)
    return formattedArticles
  } catch (error) {
    console.error('❌ Error fetching Tamil news feed:', error.message)
    return cachedNews || FALLBACK_NEWS
  }
}

module.exports = {
  fetchGoldMarketNews,
}
