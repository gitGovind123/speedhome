import React from 'react'

import Head from '../../components/Common/Head'
import PostComponent from '../../components/Post'
// const Post = dynamic(() => import('../../Post'), {
//   loading: () => (
//     <div className='loading-overlay--post'>
//       <Loader />
//     </div>
//   )
// })

const PostPage = props => {
  return (
    <>
      <Head
        title='Advertise Property for Free, Mudah House for Rent SPEEDHOME'
        description='All Online Fast Free & RM46k protection. Mudah Property For Rent, Find Tenant Looking For House For Rent in KL, Cyberjaya and Malaysia. Post Property Now!'
      >
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: `
                
                  {
                    "@context": "https://schema.org/",
                    "@type": "FAQPage",
                    "mainEntity": [
                      {
                        "@type": "Question",
                        "name": "How my house is protected up to RM42,000?",
                        "acceptedAnswer": {
                          "@type": "Answer",
                          "text": "During your rental period, to provide full peace of mind, our Allianz Insurance will protect you up to RM42,000 against loss of rental, property damage and more. You have maximum protection while maximizing speed to lease out. Who says that you can’t have it both"
                        }
                      },
                      {
                        "@type": "Question",
                        "name": "How Zero Deposit properties get rented out 5X Faster?",
                        "acceptedAnswer": {
                          "@type": "Answer",
                          "text": "Renting out your property with Zero Deposit opens it up to a larger pool of quality tenants. You will gain much greater interest from quality tenants, fast."
                        }
                      },
                      {
                        "@type": "Question",
                        "name": "How to ensure tenants are good quality paymasters?",
                        "acceptedAnswer": {
                          "@type": "Answer",
                          "text": "To ensure that you get good quality paymasters only, we run industry-leading Zero Deposit Eligibility checks on your potential tenant, using Experian. We reject up to 30% of tenants to reduce your risk. Please e-mail us at hello@speedhome.com if you can not find the question/answer you are looking for."
                        }
                      },
                      {
                        "@type": "Question",
                        "name": "How is tenant screening conducted?",
                        "acceptedAnswer": {
                          "@type": "Answer",
                          "text": "we will conduct credit check and get verification documents from tenant, you can read more at our landlord faq"
                        }
                      },
                      {
                        "@type": "Question",
                        "name": "Can I rent out my place short-term / Can a tenant rent short-term?",
                        "acceptedAnswer": {
                          "@type": "Answer",
                          "text": "Yes, you can. SPEEDHOME’s tenancy period starts at a minimum of 3 months and can be extended to a maximum of 12 months."
                        }
                      },
                      {
                        "@type": "Question",
                        "name": "What Other Services Do SPEEDHOME Provide?",
                        "acceptedAnswer": {
                          "@type": "Answer",
                          "text": "We Also Provide Free Services You Need For The Whole Rental Cycle Like Digital Agreement Signing, Homerunners For Viewing, Rental Collection and Eviction Guidance."
                        }
                      }
                    ]
                  }`
          }}
        ></script>
      </Head>
      <PostComponent {...props} />
    </>
  )
}

export default PostPage
