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
 * Curated list of Indian domestic market fallback news in case external feed is temporarily unreachable
 */
const FALLBACK_NEWS = [
  {
    id: 'f1',
    title: 'Indian Gold Rates Today: 24K and 22K Prices Steady Across Chennai, Mumbai & Delhi Bullion Hubs',
    source: 'The Economic Times',
    pubDate: new Date().toISOString(),
    link: '#',
    timeAgo: '1 hour ago',
    readTime: '4 MIN READ',
    category: 'DOMESTIC RATE',
    snippet: 'India Bullion and Jewellers Association (IBJA) publishes opening rates for 24K pure gold and 22K hallmarked jewelry gold.',
  },
  {
    id: 'f2',
    title: 'MCX Gold Futures Trade Higher as Domestic Wedding Season Physical Demand Picks Up',
    source: 'LiveMint India',
    pubDate: new Date().toISOString(),
    link: '#',
    timeAgo: '3 hours ago',
    readTime: '5 MIN READ',
    category: 'MCX BULLION',
    snippet: 'Multi Commodity Exchange (MCX) gold contracts showed positive momentum supported by retail jewelry buyer inquiries across major states.',
  },
  {
    id: 'f3',
    title: 'Customs Duty Revisions and Rupee Movement Impact on Local Retail Gold Prices in India',
    source: 'Business Standard',
    pubDate: new Date().toISOString(),
    link: '#',
    timeAgo: '5 hours ago',
    readTime: '6 MIN READ',
    category: 'POLICY UPDATE',
    snippet: 'Domestic gold import duties and USD/INR exchange dynamics continue to define baseline retail pricing for Indian consumers.',
  },
  {
    id: 'f4',
    title: 'Sovereign Gold Bonds (SGB) vs Physical 24K Hallmarked Gold: What Indian Investors Need to Know',
    source: 'Financial Express',
    pubDate: new Date().toISOString(),
    link: '#',
    timeAgo: '8 hours ago',
    readTime: '4 MIN READ',
    category: 'INVESTMENT INSIGHT',
    snippet: 'Comparing tax benefits, liquidity, making charge savings, and 2.5% semi-annual interest between SGBs and physical 999.9 gold.',
  },
]

/**
 * Formats a raw pubDate into relative time (e.g. "2 hours ago")
 */
function getRelativeTime(pubDateStr) {
  try {
    const pubDate = new Date(pubDateStr)
    const now = new Date()
    const diffMs = now - pubDate
    const diffMins = Math.floor(diffMs / (1000 * 60))
    const diffHours = Math.floor(diffMins / 60)
    const diffDays = Math.floor(diffHours / 24)

    if (diffMins < 60) {
      return `${Math.max(1, diffMins)}m ago`
    } else if (diffHours < 24) {
      return `${diffHours}h ago`
    } else {
      return `${diffDays}d ago`
    }
  } catch {
    return 'Recent'
  }
}

/**
 * Fetches live Indian domestic gold and bullion market news from Google News RSS feed
 */
const fetchGoldMarketNews = async () => {
  const now = Date.now()
  if (cachedNews && now - lastFetchTime < CACHE_DURATION_MS) {
    return cachedNews
  }

  try {
    console.log('📡 Fetching live Indian domestic gold market news feed...')
    const feedUrl = 'https://news.google.com/rss/search?q=gold+rate+today+India+OR+gold+price+India+MCX+IBJA+OR+"gold+rates"+India&hl=en-IN&gl=IN&ceid=IN:en'
    const feed = await parser.parseURL(feedUrl)

    if (!feed || !feed.items || feed.items.length === 0) {
      console.warn('⚠️ Empty feed returned, using Indian domestic news fallback.')
      return FALLBACK_NEWS
    }

    const categories = ['DOMESTIC RATE', 'MCX BULLION', 'IBJA BENCHMARK', 'JEWELRY DEMAND', 'POLICY UPDATE']

    const formattedArticles = feed.items.slice(0, 10).map((item, index) => {
      let cleanTitle = item.title || ''
      let sourceName = 'Indian Financial News'

      if (cleanTitle.includes(' - ')) {
        const parts = cleanTitle.split(' - ')
        sourceName = parts.pop().trim()
        cleanTitle = parts.join(' - ').trim()
      }

      return {
        id: `news-${index + 1}`,
        title: cleanTitle,
        source: sourceName,
        link: item.link || '#',
        pubDate: item.pubDate || new Date().toISOString(),
        timeAgo: getRelativeTime(item.pubDate),
        readTime: `${Math.floor(Math.random() * 3) + 4} MIN READ`,
        category: categories[index % categories.length],
        snippet: item.contentSnippet || item.content || 'Latest Indian domestic gold and bullion spot market updates.',
      }
    })

    cachedNews = formattedArticles
    lastFetchTime = now
    console.log(`✅ Loaded ${formattedArticles.length} live Indian domestic gold market news articles.`)
    return formattedArticles
  } catch (error) {
    console.error('❌ Error fetching Indian news feed:', error.message)
    return cachedNews || FALLBACK_NEWS
  }
}

module.exports = {
  fetchGoldMarketNews,
}
