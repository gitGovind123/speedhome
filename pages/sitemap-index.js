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
  <urlset
          xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
              http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">

      <url>
          <loc>https://speedhome.com/</loc>
          <changefreq>always</changefreq>
      </url>
      <url>
          <loc>https://speedhome.com/sitemap-ads</loc>
          <changefreq>always</changefreq>
      </url>
      <url>
          <loc>https://speedhome.com/sitemap-location</loc>
          <changefreq>always</changefreq>
      </url>
  </urlset>
        `
}
