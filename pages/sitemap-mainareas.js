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
        <loc>https://speedhome.com/rent/cyberjaya		</loc>
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
        <loc>https://speedhome.com/rent/petaling-jaya		</loc>
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
        <loc>https://speedhome.com/rent/shah-alam		</loc>
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
        <loc>https://speedhome.com/rent/cheras</loc>
        <lastmod>2021-02-28</lastmod>
        <changefreq>weekly</changefreq>
        <priority>1</priority>
  </url>
  </urlset>
        `
}
