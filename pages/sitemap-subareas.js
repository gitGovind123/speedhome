import React from 'react'

class Sitemap extends React.Component {
  static async getInitialProps ({ res }) {
    res.setHeader('Content-Type', 'text/xml')
    res.write(sitemapXML())
    res.end()
  }
}

export default Sitemap

const sitemapXML = () => {
  return `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
        <loc>https://speedhome.com/rent/kuala-lumpur/studio			</loc>
        <lastmod>2021-02-28</lastmod>
        <changefreq>weekly</changefreq>
        <priority>1</priority>
  </url>
  <url>
        <loc></loc>
        <lastmod>2021-02-28</lastmod>
        <changefreq>weekly</changefreq>
        <priority>1</priority>
  </url>
  <url>
        <loc>https://speedhome.com/rent/kuala-lumpur/condo			</loc>
        <lastmod>2021-02-28</lastmod>
        <changefreq>weekly</changefreq>
        <priority>1</priority>
  </url>
  <url>
        <loc></loc>
        <lastmod>2021-02-28</lastmod>
        <changefreq>weekly</changefreq>
        <priority>1</priority>
  </url>
  <url>
        <loc>https://speedhome.com/rent/kuala-lumpur/house			</loc>
        <lastmod>2021-02-28</lastmod>
        <changefreq>weekly</changefreq>
        <priority>1</priority>
  </url>
  <url>
        <loc></loc>
        <lastmod>2021-02-28</lastmod>
        <changefreq>weekly</changefreq>
        <priority>1</priority>
  </url>
  <url>
        <loc>https://speedhome.com/rent/kuala-lumpur/apartment			</loc>
        <lastmod>2021-02-28</lastmod>
        <changefreq>weekly</changefreq>
        <priority>1</priority>
  </url>
  <url>
        <loc></loc>
        <lastmod>2021-02-28</lastmod>
        <changefreq>weekly</changefreq>
        <priority>1</priority>
  </url>
  <url>
        <loc>https://speedhome.com/rent/kuala-lumpur/room			</loc>
        <lastmod>2021-02-28</lastmod>
        <changefreq>weekly</changefreq>
        <priority>1</priority>
  </url>
  <url>
        <loc></loc>
        <lastmod>2021-02-28</lastmod>
        <changefreq>weekly</changefreq>
        <priority>1</priority>
  </url>
  <url>
        <loc>https://speedhome.com/rent/kuala-lumpur/terrace			</loc>
        <lastmod>2021-02-28</lastmod>
        <changefreq>weekly</changefreq>
        <priority>1</priority>
  </url>
  <url>
        <loc></loc>
        <lastmod>2021-02-28</lastmod>
        <changefreq>weekly</changefreq>
        <priority>1</priority>
  </url>
  <url>
        <loc>https://speedhome.com/rent/cyberjaya/studio			</loc>
        <lastmod>2021-02-28</lastmod>
        <changefreq>weekly</changefreq>
        <priority>1</priority>
  </url>
  <url>
        <loc></loc>
        <lastmod>2021-02-28</lastmod>
        <changefreq>weekly</changefreq>
        <priority>1</priority>
  </url>
  <url>
        <loc>https://speedhome.com/rent/cyberjaya/apartment</loc>
        <lastmod>2021-02-28</lastmod>
        <changefreq>weekly</changefreq>
        <priority>1</priority>
  </url>
  </urlset>
        `
}
