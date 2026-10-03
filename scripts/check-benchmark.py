"""Validate the built bilingual benchmark against its frozen JSON: python3 scripts/check-benchmark.py."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlparse, unquote
import json, re, hashlib, gzip

ROOT = Path(__file__).resolve().parents[1]
DIST = ROOT / 'dist'
SOURCE = ROOT / 'src/data/benchmark/homepage-data.json'
# SHA-256 of the original handoff file, not a regenerated serialization.
EXPECTED_SHA256 = 'b06a7d4d0a9ab8ad6418b0f882904e0909fc146072877e30b7dca5e9a9e8aa29'
assert hashlib.sha256(SOURCE.read_bytes()).hexdigest() == EXPECTED_SHA256
assert (DIST/'experiments/llm-quant-benchmark/homepage-data.json').read_bytes() == SOURCE.read_bytes()
data = json.loads(SOURCE.read_text())
class Document(HTMLParser):
    def __init__(self, path):
        super().__init__(); self.path=path; self.ids=set(); self.links=[]; self.metrics={}; self.months={}; self.daily={}; self.terminal={}; self.consistency={}; self.series={}; self.meta={}; self.alternates={}; self.lang=None; self.canonical=None; self.h1=0; self.scripts=0; self.iframes=0; self.active=None
        self.feed(path.read_text())
    def handle_starttag(self,tag,attrs):
        a=dict(attrs)
        if 'id' in a:self.ids.add(a['id'])
        if tag=='html':self.lang=a.get('lang')
        if tag=='h1':self.h1+=1
        if tag=='script':self.scripts+=1
        if tag=='iframe':self.iframes+=1
        if tag in ['a','link','img']:
            url=a.get('href',a.get('src'))
            if url:self.links.append(url)
        if tag=='link' and a.get('rel')=='canonical':self.canonical=a['href']
        if tag=='link' and a.get('rel')=='alternate':self.alternates[a['hreflang']]=a['href']
        if tag=='meta':self.meta[a.get('property',a.get('name'))]=a.get('content')
        if 'data-series' in a:self.series[a['data-series']]=a['points']
        for attr,group in [('data-metric',self.metrics),('data-month',self.months),('data-daily',self.daily),('data-terminal',self.terminal),('data-consistency',self.consistency)]:
            if attr in a:self.active=(tag,group,a[attr],[])
    def handle_data(self,s):
        if self.active:self.active[3].append(s)
    def handle_endtag(self,tag):
        if self.active and self.active[0]==tag:
            _,group,key,parts=self.active; value=''.join(parts).strip()
            if key in group:assert group[key]==value
            group[key]=value; self.active=None

def pct(v):return f'{v*100:+.2f}%' if v>0 else f'{v*100:.2f}%'
routes={'en':'/experiments/llm-quant-benchmark','zh-CN':'/zh/experiments/llm-quant-benchmark'}
docs={p:Document(p) for p in DIST.rglob('*.html')}
all_equity=[p['equity'] for r in data['runs'] for p in r['daily_equity']]
lo,hi=min(all_equity),max(all_equity)
for lang,route in routes.items():
    doc=docs[DIST/route.lstrip('/')/'index.html']
    assert doc.lang==lang and doc.h1==1 and doc.scripts==0 and doc.iframes==0
    assert doc.canonical=='https://montayang.com'+route
    assert doc.alternates=={**{k:'https://montayang.com'+v for k,v in routes.items()},'x-default':'https://montayang.com'+routes['en']}
    assert doc.meta['og:image']=='https://montayang.com/experiments/llm-quant-benchmark/social.png'
    assert doc.meta['twitter:card']=='summary_large_image' and doc.meta['description']
    assert list(doc.series)==[r['strategy_id'] for r in data['runs']]
    for r in data['runs']:
        rid=r['strategy_id']; expected={'rank':str(r['rank']), 'performance.total_return':pct(r['performance']['total_return']), 'performance.sharpe_ratio':f"{r['performance']['sharpe_ratio']:.2f}", 'performance.max_drawdown':pct(r['performance']['max_drawdown']), 'risk.total_turnover':f"{r['risk']['total_turnover']:.1f}×",'trade_count':f"{r['trade_count']:,}"}
        expected.update({f'cashflows.{k}':f'{v:,.2f}' for k,v in r['cashflows'].items()})
        for key,value in expected.items():assert doc.metrics[rid+'/'+key]==value,(lang,rid,key)
        assert doc.consistency[rid]==f"{r['positive_full_months']}/{r['full_months']}"
        for month in r['monthly'][:r['full_months']]:assert doc.months[rid+'/'+month['month']]==pct(month['return'])
        assert doc.terminal[rid]==pct(r['monthly'][-1]['return'])
        points=doc.series[rid].split()
        assert len(points)==len(r['daily_equity'])
        for i,p in enumerate(r['daily_equity']):
            assert float(doc.daily[rid+'/'+p['date']])==p['equity']
            x,y=map(float,points[i].split(','))
            assert abs(x-(82+i/(len(points)-1)*710))<1e-9
            assert abs(y-(280-(p['equity']-lo)/(hi-lo)*245))<1e-9
    assert len(doc.months)==sum(r['full_months'] for r in data['runs'])
    raw=doc.path.read_bytes(); compressed=len(gzip.compress(raw))
    assert compressed<100_000
    print(f'{lang}: all metrics, monthly values, daily samples and SVG geometry match; HTML {len(raw):,} bytes / gzip {compressed:,} bytes.')
for path,doc in docs.items():
    for href in doc.links:
        url=urlparse(href)
        if url.scheme or url.netloc:continue
        target=DIST/unquote(url.path.lstrip('/')) if url.path.startswith('/') else path.parent/unquote(url.path) if url.path else path
        if target.is_dir():target=target/'index.html'
        elif not target.exists() and not target.suffix:target=target/'index.html'
        target=target.resolve()
        assert target.exists(),(path,href,'broken local link')
        if url.fragment and target in docs:assert unquote(url.fragment) in docs[target].ids,(path,href,'broken anchor')
        assert 'event_reports/' not in href or url.scheme=='https'
assert (DIST/'experiments/llm-quant-benchmark/social.png').is_file()
print('PASS: source SHA-256, lossless download, bilingual parity, exact metrics, all local links, SEO and zero landing-page scripts/iframes.')
