import React from 'react'

class AppleSiteLink extends React.Component {
  static async getInitialProps ({ res }) {
    res.setHeader('Content-Type', 'text/json')
    res.write(AppleSiteJSON())
    res.end()
  }
}

export default AppleSiteLink

const AppleSiteJSON = () => {
  return `{
    "applinks": {
      "apps": [],
      "details": [
        {
          "appID": "LNGE4M5BS8.com.speedrent",
          "paths": [
            "/chat/*",
            "/post/*",
            "/referral/*",
            "/rent/*",
            "/buy/*",
            "/ads/*",
            "/quicklink/property/reactivate/*"
          ]
        }
      ]
    }
  }
  `
}
