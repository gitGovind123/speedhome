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
          <loc>https://speedhome.com/rent/ampang</loc>
          <changefreq>always</changefreq>
      </url>
      <url>
          <loc>https://speedhome.com/rent/cheras</loc>
          <changefreq>always</changefreq>
      </url>
      <url>
          <loc>https://speedhome.com/rent/klang</loc>
          <changefreq>always</changefreq>
      </url>
      <url>
          <loc>https://speedhome.com/rent/kuala-lumpur</loc>
          <changefreq>always</changefreq>
      </url>
      <url>
          <loc>https://speedhome.com/rent/petaling-jaya</loc>
          <changefreq>always</changefreq>
      </url>
      <url>
          <loc>https://speedhome.com/rent/puchong</loc>
          <changefreq>always</changefreq>
      </url>
      <url>
          <loc>https://speedhome.com/rent/shah-alam</loc>
          <changefreq>always</changefreq>
      </url>
      <url>
          <loc>https://speedhome.com/rent/glenmarie-cove</loc>
          <changefreq>always</changefreq>
      </url>
      <url>
          <loc>https://speedhome.com/rent/subang-jaya</loc>
          <changefreq>always</changefreq>
      </url>
      <url>
          <loc>https://speedhome.com/rent/cyberjaya</loc>
          <changefreq>always</changefreq>
      </url>
      <url>
          <loc>https://speedhome.com/rent/bangsar</loc>
          <changefreq>always</changefreq>
      </url>
  
      <url>
          <loc>https://speedhome.com/my/sewa/ampang</loc>
          <changefreq>always</changefreq>
      </url>
      <url>
          <loc>https://speedhome.com/my/sewa/cheras</loc>
          <changefreq>always</changefreq>
      </url>
      <url>
          <loc>https://speedhome.com/my/sewa/klang</loc>
          <changefreq>always</changefreq>
      </url>
      <url>
          <loc>https://speedhome.com/my/sewa/kuala-lumpur</loc>
          <changefreq>always</changefreq>
      </url>
      <url>
          <loc>https://speedhome.com/my/sewa/petaling-jaya</loc>
          <changefreq>always</changefreq>
      </url>
      <url>
          <loc>https://speedhome.com/my/sewa/puchong</loc>
          <changefreq>always</changefreq>
      </url>
      <url>
          <loc>https://speedhome.com/my/sewa/shah-alam</loc>
          <changefreq>always</changefreq>
      </url>
      <url>
          <loc>https://speedhome.com/my/sewa/glenmarie-cove</loc>
          <changefreq>always</changefreq>
      </url>
      <url>
          <loc>https://speedhome.com/my/sewa/subang-jaya</loc>
          <changefreq>always</changefreq>
      </url>
      <url>
          <loc>https://speedhome.com/my/sewa/cyberjaya</loc>
          <changefreq>always</changefreq>
      </url>
      <url>
          <loc>https://speedhome.com/my/sewa/bangsar</loc>
          <changefreq>always</changefreq>
      </url>
  </urlset>
        `
}
