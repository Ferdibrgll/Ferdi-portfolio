// Medium / Hashnode akışlarını okur, her yazının kendi kapak görselini (og:image) bulur
// ve data/posts.json dosyasını üretir. Node 20+ (yerleşik fetch) yeterlidir.
import { writeFile, mkdir } from 'node:fs/promises';

const FEEDS = [
  { platform: 'Medium', url: 'https://medium.com/feed/@ferdibirgul' },
  { platform: 'Hashnode', url: 'https://ferdibirgul.hashnode.dev/rss.xml' },
  // Başka bir platform eklemek için: { platform: 'Dev.to', url: 'https://dev.to/feed/kullanici' },
];
const MAX_POSTS = 6;
const UA = 'Mozilla/5.0 (compatible; PortfolioBot/1.0)';

const decode = (s = '') => s
  .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
  .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
  .replace(/&quot;/g, '"').replace(/&#0?39;/g, "'");
const stripHtml = (s = '') => decode(s).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
const pick = (xml, tag) => { const m = xml.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, 'i')); return m ? m[1] : ''; };

async function get(url) {
  const res = await fetch(url, { headers: { 'user-agent': UA, accept: 'text/html,application/xml,*/*' }, redirect: 'follow' });
  if (!res.ok) throw new Error(`${url} -> ${res.status}`);
  return res.text();
}

function metaImage(html, base) {
  const tags = html.match(/<meta[^>]+>/gi) || [];
  for (const key of ['og:image:secure_url', 'og:image', 'twitter:image']) {
    for (const t of tags) {
      if (new RegExp(`(?:property|name)=["']${key}["']`, 'i').test(t)) {
        const c = t.match(/content=["']([^"']+)["']/i);
        if (c) { try { return new URL(decode(c[1]), base).href; } catch {} }
      }
    }
  }
  return '';
}

async function readFeed({ platform, url }) {
  const xml = await get(url);
  return (xml.match(/<item>[\s\S]*?<\/item>/gi) || []).map((item) => {
    let link = decode(pick(item, 'link')).trim();
    try { const u = new URL(link); u.search = ''; link = u.href; } catch {}
    const body = pick(item, 'content:encoded') || pick(item, 'description');
    const rssImg = (decode(body).match(/<img[^>]+src=["']([^"']+)["']/i) || [])[1] || '';
    const enclosure = (item.match(/<enclosure[^>]+url=["']([^"']+)["']/i) || [])[1] || '';
    const cat = stripHtml(pick(item, 'category')).split(/\s+/).slice(0, 2).join(' ');
    return {
      title: stripHtml(pick(item, 'title')),
      url: link,
      date: new Date(decode(pick(item, 'pubDate')) || 0).getTime() || 0,
      description: stripHtml(body).slice(0, 170).replace(/\s+\S*$/, '') + '…',
      rssImage: enclosure || rssImg,
      category: (cat || platform).toUpperCase(),
      platform,
    };
  }).filter((p) => p.title && p.url.startsWith('https://'));
}

const all = [];
for (const feed of FEEDS) {
  try { all.push(...await readFeed(feed)); } catch (e) { console.warn('Akış okunamadı:', e.message); }
}
if (!all.length) { console.warn('Hiç yazı bulunamadı; mevcut posts.json korunuyor.'); process.exit(0); }

all.sort((a, b) => b.date - a.date);
const posts = [];
for (const p of all.slice(0, MAX_POSTS)) {
  let image = '';
  try { image = metaImage(await get(p.url), p.url); } catch (e) { console.warn('Sayfa okunamadı:', p.url, e.message); }
  posts.push({
    title: p.title, url: p.url, platform: p.platform, category: p.category,
    description: p.description, image: image || p.rssImage || '',
    date: new Date(p.date).toISOString(),
  });
}

await mkdir('data', { recursive: true });
await writeFile('data/posts.json', JSON.stringify(posts, null, 2) + '\n');
console.log(`${posts.length} yazı yazıldı.`);
