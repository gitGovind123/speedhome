import React from 'react'
import NextHead from 'next/head'

var path = ''

const Head = props => {
  const {
    title,
    description,
    keywords,
    location,
    coverpicture,
    isHomepage = false,
    rel,
    hrf
  } = props

  if (process.browser) {
    path = window.location.href.toLowerCase()
  }

  return (
    <NextHead>
      <meta charSet='UTF-8' />
      <title>{title || 'SPEEDHOME'}</title>
      <meta name='og:title' content={title || 'SPEEDHOME'} />
      <meta name='og:description' content={description || ''} />
      <meta property='og:image' content={coverpicture || ''} />
      <meta property='og:image:url' content={coverpicture || ''} />
      <meta name='keywords' content={keywords || ''} />
      <meta name='description' content={description || ''} />
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <link rel='icon' type='image/x-icon' href={'/img/favicon.ico'} />
      <link rel={rel} href={hrf} />

      {location ? (
        <link
          rel='canonical'
          href={location.includes('https') ? location : `https://${location}`}
        />
      ) : null}
      <script
        dangerouslySetInnerHTML={{
          __html: `

  var _paq = window._paq = window._paq || [];

 _paq.push(['trackPageView']);

 _paq.push(['enableLinkTracking']);


  (function() {

    var setCookie = function(value) {

      var expiresAttr = '';

      var date = new Date();

      date.setTime(date.getTime() + 5184000000);

      expiresAttr = '; expires=' + date.toGMTString();

      document.cookie = 'ajreferral=' + value + expiresAttr + '; path=/';

  };

  var getCookie = function(name) {

      var cookies = document.cookie ? document.cookie.split('; ') : [],

          i = 0;

      for (; i < cookies.length; i++) {

          var parts = cookies[i].split('=');

          var cookieName = parts[0].replace(/^\\s+|\\s+$/gm, '');

          if (cookieName === name) {

              var value = parts.slice(1).join('=');

              if (value.charAt(0) === '"') {

                  value = value.slice(1, -1);

              }

              return value;

          }

      }

      return undefined;

  };

  var getParameterByName = function(name) {

      name = name.replace(/[\\[]/, "\\\\[").replace(/[\\]]/, "\\\\]");

      var regex = new RegExp("[\\\\?&]" + name + "=([^&#]*)"),

          results = regex.exec(location.search);

      return results === null ? "" : decodeURIComponent(results[1].replace(/\\+/g, " "));

  };

  var param = getParameterByName("aj_kwd");

  if (param) {

      setCookie(param);

  }
  _paq.push(['setSiteId', 'nk34QG31wJdW']);

  var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];

  g.type='text/javascript'; g.async=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);


})();

`
        }}
      />
      {path.includes('rent/ara-damansara') ? (
        <script
          defer
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: `
            
          {
            "@context": "https://schema.org/",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Is the connectivity good in Ara Damansara?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, Ara Damansara is surrounded by matured areas. You can reach Bandar Utama, Sunwaymas, Damansara Jaya, Damansara Utama, Kelana Jaya, and Subang Jaya just within 10 to 15-minute driving. Besides that, Ara Damansara is accessible via New Pantai Expressway (NPE), New Klang Valley Expressway (NKVE), Lebuhraya-Damansara Puchong (LDP) and Federal Highway. Living in Ara Damansara also can easily get to the Airport which is Subang Airport."
                }
              },
              {
                "@type": "Question",
                "name": "Does living in Ara Damansara easily get me to KL?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, there is a direct train which LRT departs from KL Sentral to Ara Damansara. The journey takes approximately 27 min. The cost of taking LRT between KL and Ara Damansara is just from RM2 to RM7. So, if you get to work on KL without driving a car, LRT can solve your problem. It is cheap and fast. The LRT service departs every 5minutes and operates every day."
                }
              },
              {
                "@type": "Question",
                "name": "What is the cost of living in Ara Damansara?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "According to research, for a 3 to 4 person family, their monthly cost of living in Ara Damansara is around RM7000 without renting a house. Besides that, a single person will only monthly costs around RM2500 without rent. Rent prices in Ara Damansara are lower than Kuala Lumpur."
                }
              },
              {
                "@type": "Question",
                "name": "Is there any entertainment in Ara Damansara?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "There are some funny things to do in Ara Damansara. First is Citta Mall. CITTA Mall is a shopping mall that includes a concept that nourishes the heart and feeds the mind. Built to resemble the quintessential American strip mall, CITTA Mall adopts an open-air configuration with an emphasis on space, integrating seamlessly with the surrounding community by providing visitors a wealth of food and entertainment options. Besides that, Evolve Concept Mall is also a good place to visit in Ara Damansara. The style in EVOLVE Concept Mall is no longer a one-size fits all formula dictated by cloned offerings of the same things in the same order day after day."
                }
              },
              {
                "@type": "Question",
                "name": "Is there any delicious food in Ara Damansara?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Ara Damansara has plenty of choices for you to choose what to eat. All the delicious food shops are coming with many parking spaces so that you will not need to scare about the parking when eating. Ara Damansara is surrounded by food court, hawker centres, and restaurant, offering a range of cuisines. For example, Pun Chun Noodle House is one of the famous noodle restaurants in Ara Damansara. Ara Damansara also has plenty of cafes which offer all day breakfast with smooth lattes. If you are a coffee lovers or a food hunter, it is worth for you to living in Ara Damansara."
                }
              }
            ]
          }`
          }}
        ></script>
      ) : null}

      {path.includes('/rent/bandar-utama') ? (
        <script
          defer
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: `
          {
            "@context": "https://schema.org/",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Any entertainment in Bandar Utama?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "There are many entertainments in Bandar Utama. For example, in Bandar Utama they have the world's first Helipad Cinema. The world's first Helipad Cinema HeliPad Cinema is a unique outdoor and fun experience because they do classic film screening under the stars. Besides that, HeliPad Cinema is a unique outdoor and fun experience. In Bandar Utama, there is also Secret Sky Garden. This 'Garden in the Sky' is rumoured to have been developed in secret for five years before being opened for public viewing. Located on the rooftop of 1 Utama, the Secret Garden occupies 30,000 sq ft, displays 600 species of rare and tropical plants, and is currently Southeast Asia's largest rooftop garden. One Utama shopping mall is also one of the entertainments for the people who live in Bandar Utama."
                }
              },
              {
                "@type": "Question",
                "name": "How can I get to KL from bandar Utama?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "In Bandar Utama, there is a MRT station. The MRT station is a direct train departing from Muzium Negara and arriving at Mutiara Damansara. You can take the MRT at Mutiara Damansara station to get to KL. It just takes you about 18min to reach KL."
                }
              },
              {
                "@type": "Question",
                "name": "What is the distance between KL and Bandar Utama? How long will it take if I drive from Bandar Utama to KL?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The road distance between KL and Bandar Utama is 15km. Driving from Bandar Utama to KL may take around 13min. It depends on the road traffic situation."
                }
              },
              {
                "@type": "Question",
                "name": "What are the education facilities in Bandar Utama?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "For primary institutions, there are 4 national schools in Bandar Utama,  a Chinese primary school (Puay Chai 2), SK Bandar Utama Damansara, Sekolah Kebangsaan Tropicana and a Tamil primary school (SJK (T) Effingham). For the secondary school, there are SMK Bandar Utama,SMK Bandar Utama Damansara (4), SMK Bandar Utama Damansara (3), SMK Bandar Utama Damansara (2), SMK Tropicana and SMK Damansara Jaya. Some parents who stay outside of Bandar Utama Damansara tend to send their children to the Tropicana primary or secondary school highly reputed primary and secondary schools at Damansara Utama and Damansara Jaya. For tertiary institution, there are Wawasan Open University (WOU) and First City University College, formerly known as KBU International College (KBU) that located in Bandar Utama, a private tertiary institution and the British International School, Kuala Lumpur that follows the British educational curriculum in Malaysia."
                }
              },
              {
                "@type": "Question",
                "name": "What are the residential area around bandar Utama?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Bandar Utama is surrounded by many other highly populated residential areas such as Taman Tun Dr. Ismail, Damansara Utama, Damansara Jaya and SS2."
                }
              }
            ]
          }`
          }}
        ></script>
      ) : null}

      {path.includes('rent/bangsar') ? (
        <script
          defer
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: `
          {
            "@context": "https://schema.org/",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What makes Bangsar become one of the best neighbourhoods in Kuala Lumpur?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "People living in this part of the city because it has a community-based atmosphere with the bustle of an active neighbourhood. There are plenty of local and mid-range restaurants, cafes, and bars along with a few shopping centres. With the number of restaurants and cafes scattered across, there are also plenty of choices if you ever wanted a good workout such as Monarchy MMA gym, Crazy Monkey Defense. Aside from that, yoga and pilates studio are still other choices in Bangsar if hand to hand combat is not your choice.It also has many private clinics and local hospitals spread throughout Bangsar to meet the health needs of the residents."
                }
              },
              {
                "@type": "Question",
                "name": "How is the accessibility in Bangsar?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Bangsar Is easily access to the New Pantai Expressway (NPE) which connects to the south of Subang Jaya neighbourhood where the Sprint Expressway can lead to Bukit Damansara, Jalan Duta, Sri Hartamas and several suburbs in Petaling Jaya."
                }
              },
              {
                "@type": "Question",
                "name": "What is the public transport in Bangsar?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Bangsar is well served by public transport, the LRT Bangsar is connected to the LRT Kelana Jaya Line. It also provides a hub for onward travel in Bangsar with taxi and RapidKL buses. A shuttle bus is provided to Midvalley from Bangsar LRT, therefore it is very convenient for people who want to work in the Mid Valley area."
                }
              },
              {
                "@type": "Question",
                "name": "What are the eateries in Bangsar?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Bangsar has a lot of eateries from Telawi to Jalan Kemuja. If you are hungry, you shall order the signature of Restoran Mahbub, Nasi Briyani Ayam Madu. The sticky sweet chicken is tender and flavourful, served atop fluffy and fragrant biryani rice cause the long rows of the entrance of this popular mamak. Instead of trying Nasi Briyani, you can go for the banana leaf rice which just cost you under Rm10 at the Fierce Curry House together with their classic side dishes such as chicken tikka masala, mutton varuval and tandoori tiger prawns. For dinner, we highly recommend the truffle yakiniku don, slow-braised oyster blade, and the Botanica burger of Botanica + Co. Restaurant & Bar  where you can enjoy the wide range of local and international dishes whilst being surrounded by lush greenery in Bangsara South City."
                }
              },
              {
                "@type": "Question",
                "name": "Is Bangsar safe to live?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Most of the landed and high-rise property in Bangsar are under the gated and guarded residential projects. These areas are safe, especially for the families that are looking for a good start. The crime rate has been kept at a minimum with the well designed proper fencing, ample lighting and CCTV around every corner."
                }
              }
            ]
          }`
          }}
        ></script>
      ) : null}

      {path.includes('rent/bukit-jalil') ? (
        <script
          defer
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: `
          {
            "@context": "https://schema.org/",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Is Bukit Jalil a good place to live?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, because Bukit Jalil is a suburb of Kuala Lumpur. Living in Bukit Jalil can reach everywhere easily. At the east of Bukit Jalil is the National Sports Complex, if you want to go to Shah Alam, there is a Shah Alam Expressway on the north. Besides that, sometimes you want to go to the city boundaries, which are located on the west of Bukit Jalil and the Puchong-Sungai Besi Highway as well as city boundaries to the south. Based on the reason above, living in Bukit Jalil can easily get to working places and education hotspots."
                }
              },
              {
                "@type": "Question",
                "name": "What is the cost of living in Bukit Jalil ?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Bukit Jalil is a suburb of Kuala Lumpur so the cost of living is the same as living in Kuala Lumpur. Living in Bukit Jalil for a four-person family will cost around RM7000++ without any renting house. For a single person without rent, the monthly cost may be around RM2400++. Cost of living in Bukit Jalil is ranked 324th out of 490 cities in the world."
                }
              },
              {
                "@type": "Question",
                "name": "What are amenities and facilities having in Bukit Jalil?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Bukit Jalil is easily accessible and well connected via an existing network of highways example Bukit Jalil Highway, KESAS Highway and Maju Expressway. Besides that, in Bukit Jalil, they have their landmark Bukit Jalil National Sports Complex, Bukit Jalil Recreational Park, Bukit Jalil Golf & Country Resort. In Bukit Jalil, there also have some school, market, and office example Medical University, SJK (C) Lai Meng school, Giant hypermarket, SIRIM centre, Calvary Convention Centre and Astro hub."
                }
              },
              {
                "@type": "Question",
                "name": "How far is between Bukit Jalil and KL? What public transport can I take to KL Sentral Station in Bukit Jalil?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The road distance between KL and Bukit Jalil 14.2 km. There is a Rapid LRT station at Bukit Jalil called Bukit Jalil station. The LRT can directly bring you to KL Sentral Station in 30 min and it only cost you below RM19."
                }
              },
              {
                "@type": "Question",
                "name": "What are the recommended foods in Bukit Jalil?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "There are many delicious foods in Bukit Jalil such as Say Cheese Malaysia. If you are a cheese lover coming to this place you make you happy by saying cheese and feeling delicious with their food. Besides that, there is also some Japanese food for the Japanese food lover in Bukit Jalil such as Rinjin Shokudo. It is a Japanese style restaurant and homey feel for the customer. Japanese food lovers, you cannot miss this. There are many best foods in Bukit Jalil waiting for you to find out. Don't worry about food in Bukit Jalil, it will make you surprised when looking at food in Bukit Jalil."
                }
              }
            ]
          }`
          }}
        ></script>
      ) : null}

      {path.includes('rent/cheras') ? (
        <script
          defer
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: `
        {
          "@context": "https://schema.org/",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "What is the quickest way to get to Cheras by public transport?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "There are 2 ways to get from Cheras to Kuala Lumpur. The first way is by MRT station. The MRT line runs along Jalan Cheras in Kuala Lumpur, down the Cheras-Kajang expressway in Selangor, from Cochrane station to the Taman Koperasi Cuepacs station. This can help to avoid getting stuck in traffic congestion. Besides that, they do also have buses departing from Cheras to Pasar Seni, Kuala Lumpur."
              }
            },
            {
              "@type": "Question",
              "name": "Is there any shopping mall and entertainment in Cheras?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "There are plenty of shopping malls in Cheras. For example, Cheras Leisure Mall, Eko Cheras Mall, AEON Cheras Selatan, Sunway Velocity, MyTown Shopping mall and Ikea Cheras. All shopping malls above can be reached by public transport. In these shopping malls, there are many food and drink outlets. Besides that, they also boast many restaurants and cafes alongside a huge number of entertainment outlets, for example cinema ice rink and games zone. If you are planning to buy some furniture, Ikea Cheras can help you solve the problem. There many furniture you can buy in Ikea Cheras."
              }
            },
            {
              "@type": "Question",
              "name": "Is it convenient to get to Kuala Lumpur and Selangor from Cheras?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Cheras sits in both KL and Selangor. This means that living in Cheras is easy to get to Selangor. Besides that, if you are working in the KL area, living in Cheras can help you easily get to a working place."
              }
            },
            {
              "@type": "Question",
              "name": "Any hospital in Cheras?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Cheras have many hospitals. Cheras is a place that is good in a range of public and private hospitals. There are multiple choices for the Cheras residents to choose for their healthcare. In Cheras there are small clinic such as Klinik Kesihatan Cheras. Besides that, Cheras also has larger university hospitals such as Universiti Kebangsaan Malaysia Medical Centre, larger hospitals such as Columbia Asia Hospital, Pantai Hospital etc. These hospitals provide healthcare for the residents."
              }
            },
            {
              "@type": "Question",
              "name": "Cheras have many hospitals. Cheras is a place that is good in a range of public and private hospitals. There are multiple choices for the Cheras residents to choose for their healthcare. In Cheras there are small clinic such as Klinik Kesihatan Cheras. Besides that, Cheras also has larger university hospitals such as Universiti Kebangsaan Malaysia Medical Centre, larger hospitals such as Columbia Asia Hospital, Pantai Hospital etc. These hospitals provide healthcare for the residents.",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Cheras have provided many local places of worship. Surau At-Taqwa mosque, Masjid Al-Mubarakah, Surau al-Faizin, and Surau At-Taqwa, are just a few of the mosques located in the northern area of the neighbourhood. With mosques such as Ashabus Solihin Mosque, Masjid Taman Cheras Jaya, and Surau Al-Ansar just a few of those serving the southern end of the suburb. Cheras is also home to a number of Hindu temples. Temples such as Sri Hari Haran Kodiyur Aiyanar Bagawan Temple and Cheras Sri Thohaiyadi Vinayagar Temple can be found serving the northern ends of the suburb, and Sri Maha Moondagakanniamman and Sri Raghavendra Swamy Brindavan amongst those serving the south. Buddhists are equally well served with places to worship within the area. 4 Faces Buddha Temple, Kuan Tei Temple, and Tai Kuk Wah Si Buddhist Temple cater to residents of the local area, with a large number of other places of worship for the community. Christians of diverse denominations will also find convenient access to churches throughout Cheras. Church of St. Francis of Assisi is conveniently located to serve the Catholic community, with Cheras Baptist Church, Mahkota Cheras Methodist Church, and a variety of other churches serving their own local communities."
              }
            }
          ]
        }`
          }}
        ></script>
      ) : null}

      {path.includes('rent/cyberjaya') ? (
        <script
          defer
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: `
        {
          "@context": "https://schema.org/",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "Is Cyberjaya safe?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "The crime rate in Cyberjaya is low according to numbeo.com, it is safe to stay at Cyberjaya."
              }
            },
            {
              "@type": "Question",
              "name": "Is Cyberjaya a good place to stay?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Cyberjaya is surrounded by some famous areas such as Puchong, Putrajaya, Kajang, and Bangi. Besides that, from Cyberjaya to KLCC only takes around 25 minutes. For those who work at KLIA area, choosing Cyberjaya to stay is also a good choice because from Cyberjaya to KLIA and KLIA 2 is just around 25 minutes."
              }
            },
            {
              "@type": "Question",
              "name": "How far is Cyberjaya from KL? Is there any direct public transport between Cyberjaya and KL?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "The road distance between Kuala Lumpur and Cyberjaya is 31.7 km. Yes, there is a direct bus and train from Cyberjaya to KL Sentral. The best way to get from Kuala Lumpur to Cyberjaya is to train which takes 18 minutes and costs around RM 23-40. Alternatively, you can take the bus, however, it takes time."
              }
            },
            {
              "@type": "Question",
              "name": "Are there any facilities in Cyberjaya?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "There is a shopping mall in Cyberjaya which is called D’Pulze Shopping Centre.    They have Jaya Grocer which allows residents to buy groceries in Cyberjaya. Besides that, you also can buy DIY equipment at ACE Hardware and get books at MPH and so much more. For the bank, in Cyberjaya, there have some bank branches there which are Maybank, HSBC, CIMB, Hong Leong Bank and Bank Rakyat."
              }
            },
            {
              "@type": "Question",
              "name": "Is Cyberjaya living cost high?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Cost of living index in Cyberjaya will be lower than Kuala Lumpur. Kuala Lumpur has a 51.76% higher cost of living index than living in Cyberjaya. Besides that, rental prices in Cyberjaya are lower than rental prices in Kuala Lumpur."
              }
            },
            {
              "@type": "Question",
              "name": "What are the education facilities in Cyberjaya?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "There are a primary school (Sekolah Kebangsaan Cyberjaya) and secondary public schools (Sekolah Menengah Cyberjaya) are built for the children of the general population in Cyberjaya. For tertiary education institutions that are located in Cyberjaya including Multimedia University, Limkokwing University of Creative Technology, University Malaysia of Computer Science & Engineering, Heriot-Watt University, Cyberjaya University College of Medical Sciences, Cyber Putra College and Kirkby International College."
              }
            }
          ]
        }`
          }}
        ></script>
      ) : null}
      {path.includes('rent/damansara') ? (
        <script
          defer
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: `
        {
          "@context": "https://schema.org/",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "What is the average rent price in Damansara Perdana?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "According to the houses and studios posted in speedhome.com, where the average prices of a studio that fully furnished is Rm 1300. The average rental price for a fully furnished 3 bedroom is RM 1500."
              }
            },{
              "@type": "Question",
              "name": "Any public transport can reach Damansara Uptown?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "There are 3 ways to reach Damansara Uptown. First is by taking Rapid Bus. The number of Rapid Bus to Damansara Uptown is  Rapid KL T784, Rapid KL 800, Rapid KL 780 and Rapid KL 802. Second you also can take Mrt to TTDI and change to take MRT feeder bus T813."
              }
            },
            {
              "@type": "Question",
              "name": "What are the eateries In Damansara?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Nasi Lemak is Malaysia's famous food. In Damansara, there is a famous Nasi Lemak shop called  Nasi Lemak @ Village Park. The food tastes like it came out of a kitchen run by someone who really enjoys cooking for those who love to eat. It is good for people who love nasi lemak. Besides that, there are also many foods good in Damansara such as Fried Chicken Chop at Steven’s Corner, Comfort Food at The Good Batch, A Pie Thing, Thai Restaurant at Baan Rao and etc. Living in Damansara is the most happy thing because it is surrounded by many good foods to eat."
              }
            },
            {
              "@type": "Question",
              "name": "What are the facilities and amenities around  Damansara Perdana?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Damansara Perdana is surrounded by high-end neighbourhoods such as Mutiara Damansara, TTDI and Tropicana. The shopping and entertainment centres like 1U, The Curve, IKEA and Sunway Giza Mall are reachable within 20 minutes from Damansara Perdana. Besides that, the township also consists of PJ Trade Centre, Empire Damansara and Empire City. PJ Trade Centre is the Grade A office development and consists of 4 office towers of 20 to 21 storeys. Empire Damansara is a nice and cozy area where many studios can be rented in this area and a lot of eateries are near to the mall and apartment as well."
              }
            },
            {
              "@type": "Question",
              "name": "Why there are many township called Damansara?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Damansara is the name of a small river. Thus any area near the river can claim to use the word Damansara. Besides that. Damansara is a suburb in Petaling Jaya, this area is home to several townships. It includes the following townships: •        Damansara Impian (SS 20) •        Damansara Kim (SS 20) •        Damansara Utama (SS 21) •        Damansara Jaya (SS 22) •        Ara Damansara (previously known as Ladang Pilmoor , or Pilmoor Estate in English) (PJU 1A) •        Aman Suria Damansara (PJU 1A) •        Damansara Idaman (PJU 1A) •        Damansara Lagenda (PJU 1A) •        Pelangi Damansara (PJU 3) •        Tropicana Golf & Country Resort (PJU 3) •        Tropicana Indah (previously known as Damansara Indah) (PJU 3) •        Sunway Damansara (PJU 5) •        Kota Damansara (PJU 5) •        Damansara Emas (PJU 5) •        Bandar Utama Damansara (PJU 6) •        Mutiara Damansara (PJU 7) •        Damansara Perdana (PJU 8) •        Bukit Lanjan (PJU 8) •        Flora Damansara (PJU 8) •        ForestHill Damansara (PJU 8) •        Bandar Sri Damansara (PJU 9) •        Damansara Damai (PJU 10) •        Sutera Damansara (PJU 10) •        Saujana Damansara (PJU 10)"
              }
            }
          ]
        }`
          }}
        ></script>
      ) : null}

      {path.includes('rent/gombak') ? (
        <script
          defer
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: `
          {
            "@context": "https://schema.org/",
            "@type": "FAQPage",
            "mainEntity": [
               {
                "@type": "Question",
                "name": "What is the average rental price Gombak?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "According to numeo.com., the average rental for an apartment with 1 bedroom near to the city centre is RM 700, while for an apartment with 1 bedroom that far away from the city centre of gombak is under RM 600. The average rental of an apartment with 3 bedrooms that is near to the city centre can go up to RM 2000 in Gombak, if you stay outside of the city centre with the same amount of bedroom, it can goes to Rm 1500."
                }
              },{
                "@type": "Question",
                "name": "How to reach KL from Gombak by using public transport?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "In Gombak, there is a train station called Gombak LRT Station. Taking the LRT at Gombak station can directly reach KL. It may take around 31minutes."
                }
              },
              {
                "@type": "Question",
                "name": "How far is Gombak to KL?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The distance between Gombak to KL is 16.9km."
                }
              },
              {
                "@type": "Question",
                "name": "Is there any school or university in Gombak?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "There were 53 national type primary schools, eight national types (Chinese) primary schools, seven national types (Tamil) primary schools, 30 national type secondary schools (SMK), two national type secondary boarding schools (SM Berasrama Penuh), two national types secondary Islam religious school (SM Agama) and two national type secondary vocational schools (Kolej Vokasional) in Gombak."
                }
              },
              {
                "@type": "Question",
                "name": "Is there any public transport in Gombak other than LRT?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "There are several KTM stations in Gombak. For example, Batu Caves station, Kepong Sentral station, Sungai Buloh station, Rawang station and Kuang station. Besides that, in Sungai Buloh station there also have MRT train services from Sungai Buloh to Kajang Line."
                }
              }
            ]
          }`
          }}
        ></script>
      ) : null}

      {path.includes('rent/kajang') ? (
        <script
          defer
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: `
        {
          "@context": "https://schema.org/",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "What is the average rental price for Kajang property?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "According to the property that posted in the speedhome.com, the average rental price for a 3 bedroom unit is around RM 1100."
              }
            },{
              "@type": "Question",
              "name": "Is Kajang safe to live?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "According to the numbeo.com, the level of crime in Kajang is moderate. Kajang has taken 5 critical and immediate steps such as separation of areas from walkways to the main road, affixing bollards, clearing public areas blocked by overgrown foliage and  brightening up pedestrian bridges, tunnels, car parks and public areas. Some residential areas have  responsible residents got together and formed a Rukun Tetangga and engaged security guards during the recent festival holidays."
              }
            },{
              "@type": "Question",
              "name": "Is there any public transport in Kajang?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "The transportation systems include the public bus service, KTM and the newly installed MRT. With the opening of MRT Sungai Buloh-Kajang line, MRT feeder bus has begun operating linking the station with several housing areas. The station is the southern terminal of the MRT line. It is also an interchange station to KTM Seremban Line and KTM ETS."
              }
            },
            {
              "@type": "Question",
              "name": "What is the accessibility of Kajang?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Kajang is surrounded by four major highways which are, Kajang Dispersal Link Expressway (SILK), Kajang-Seremban Highway (Lekas), Southern Kajang Valley Expressway (SKVE) and Cheras-Kajang Expressway (CKE). To alleviate the daily traffic congestion, the government has introduced the Kajang SILK Highway that directly connects to another major highway, this provides a convenient way to reduce travelling time to the people who make to and from Kuala Lumpur, Cheras, Sg. Long and Balakong, Putrajaya, Semenyih, Bangi, KL International Airport and Seremban."
              }
            },
            {
              "@type": "Question",
              "name": "What are the education facilities in Kajang?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "There is a full range of schools in Kajang catering to students of all ages. At school level in Kajang, there are Chinese national school, local primary and secondary school, boarding schools as well as a few international schools such as Tanarata International Schools. For tertiary education,  there are a few colleges in Kajang town, such as University Tunku Abdul Rahman (UTAR), University Putra Malaysia (UPM), New Era College, University of Nottingham Malaysia Campus. There are also other international schools in the vicinity."
              }
            }
          ]
        }`
          }}
        ></script>
      ) : null}

      {path.includes('rent/kelana-jaya') ? (
        <script
          defer
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: `
        {
          "@context": "https://schema.org/",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "What are the recreational facilities in Kelana Jaya?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Paradigm Mall is located right at the centre of Kelana Jaya and it is meant to cater to the local and residents. There are a variety of shops and restaurants in the mall. It is conveniently accessible by shuttle bus and from Kelana Jaya LRT station. Kelana Jaya Lake Park is also popular which attracts the people from neighbouring areas to come to this park to relax and unwind after a long day at work as well as fishing at the largest lake in the park."
              }
            },
            {
              "@type": "Question",
              "name": "Where to stay in Kelana Jaya?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Kelana Jaya is a suburb in Petaling Jaya, It comprises mainly landed properties with a few high rises as well. Most property of Kelana Jaya is located in SS3, SS4, SS5, SS6 and SS7 neighbourhoods."
              }
            },
            {
              "@type": "Question",
              "name": "What is the cheapest way to get from Kuala Lumpur Airport to Kelana Jaya?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Kelana Jaya is well served by public transport. The cheapest way to get from Kuala Lumpur Airport to Kelana Jaya is by bus which costs around RM12 and takes an hour. There is a direct bus departing from Kuala Lumpur International Airport 2 and arriving at Paradigm mall."
              }
            },
            {
              "@type": "Question",
              "name": "What are the eateries in Kelana Jaya?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "As Kelana Jaya is a dense area with high-rise buildings and commercial centres, many restaurants are opening within the area. Pig Out cafe which is located at the Park Lane Commercial Centre, serves the prime belly cut of the pig that roasted to perfection. Moreover, you can also enjoy 7 types of grilled fish from iKna Kembung to stingrays which are offered by Fend Ikan Bakar in SS5. If you want to try something different, you also can go to the night market at ss@ to enjoy stinky tofu."
              }
            },
            {
              "@type": "Question",
              "name": "Where are the commercial areas in Kelana Jaya?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "There are several commercial centre in Kelana Jaya, such as , PJ21 Commercial centre, Kelana Business Centre, NZX Commercial Centre, Parklane Commercial Hub, Sunwaymas Commercial Centre Management Office and Da Vinci Sunway Mas Commercial Centre. Many large companies has chosen Kelana Jaya area to set up their office, such as Malaysia Airlines."
              }
            }
          ]
        }`
          }}
        ></script>
      ) : null}

      {path.includes('rent/kepong') ? (
        <script
          defer
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: `
        {
          "@context": "https://schema.org/",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "What is the average rental price in Kepong?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "According to the information in speedhome, for a whole unit with 3 bedrooms with 1 to 2 bathrooms, the average rental is RM 1300 in Kepong."
              }
            },{
              "@type": "Question",
              "name": "How to access to Kepong?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "The main access roads to Kepong are Damansara-Puchong Expressway, Jalan Kuching, MRR II and Jalan Ipoh. RapidKL bus and Metro bus provides transport here. Kepong is also served by KTM komuter line, where the station is located in the northern area of Kuala Lumpur along the Rawang - Seremban route. There are 4 stations that will pass through Kepong for upcoming MRT 2 Sungai Buloh-Serdang-Putrajaya which will make Kepong more accessible upon it completion."
              }
            },
            {
              "@type": "Question",
              "name": "Where is the residential area of Kepong?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Kepong is one of the earliest townships in Kuala Lumpur’s history. The oldest area in Kepong like Bandar Menjalara, Taman Indah Perdana, Taman Kemacahaya, Taman Kepong, Kepong Baru, Desa Aman Puri, Desa Jaya, Jinjang Utara, Jinjang Selatan, Taman Bukit Maluri, Taman Bukit Desa and Taman Ehsan are home to thousands of low-,medium and high-end houses as well as traditional and heritage shops. With the development, Kepong now has become known as the place has beautiful and affordable homes. There are some apartments and condominiums suitable for working adults and students, such as Kepong Sentral Condominium, Casa Prima, Greenview Apartment, The Henge Residence and others."
              }
            },
            {
              "@type": "Question",
              "name": "What are the amenities in Kepong ?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Amenities in the vicinity include local and international schools, college, shopping malls, hypermarket, wet market, banks, eateries, restaurants and hospitals"
              }
            },
            {
              "@type": "Question",
              "name": "Any delicious food in Kepong?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "In Kepong there have a famous foodtruck name Authentic Thai Food Foodtruck. The foodtruck is selling Authentic Thai Food.If you are a Thaifood lover, this place you cannot miss. Besides that, there also has a famous Nasi Lemak which always has a long queue. Kepong still has many famous food restaurants or places such as Old School Style Ice Kacang, Salt-baked Chicken, Handmade Pan Mee and more."
              }
            }
          ]
        }`
          }}
        ></script>
      ) : null}

      {path.includes('rent/klang') ? (
        <script
          defer
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: `
        {
          "@context": "https://schema.org/",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "What are the eateries around klang?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Klang is known for its Ba Kut Teh, Seng Huat Ba Kut Teh and Teluk Pulai Pottery Ba Kut Teh are the well-known restaurant in Klang and has many years of history. Instead of ba Kut Teh, you also can try the korean dishes of well known korean restaurant, Myung-Ga Korean Restaurant, they serve salmon fried fish ball, bibimbap, jajang myon as well as toppoki. The most significant Malay food spot in Klang is at Emporium Makan which is located at the opposite of Pasar Jawa."
              }
            },
            {
              "@type": "Question",
              "name": "What is the distance from Klang to Kuala Lumpur and the fastest way to travel between both places?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Distance from KL to Klang is 29km. There are 2 ways to get to KL from Klang. The first way is taking the bus and the second way is to take the train. Both public transport will take about 1 hour above to reach the destination. The fastest way is taking a taxi which costs RM 75- RM 95 and it only takes around 35minutes."
              }
            },
            {
              "@type": "Question",
              "name": "What is the best in Klang?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Klang has inevitable shopping centres such as Aeon Bukit Tinggi, Aeon Bukit Raja, Centro Mall, Giant Hypermarket (at Bandar Bukit Tinggi and Klang Sentral) and GM Klang Wholesale City (Bandar Botanic). Klang is also home to Port Klang, the busiest port in the country. Because of the port, Klang is a booming industrial property hotspot. Furthermore, Klang consists of a few hospitals and medical centres that ensure the residents can receive better care such as Pantai Hospital Klang which offers a selection of room and services with high quality and personalised care to the Klang neighbourhood."
              }
            },
            {
              "@type": "Question",
              "name": "What are the public transport and accessibility in Klang?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Klang is served by three light rapid transit (LRT) lines, two commuter rail lines, one monorail line, one bus rapid transit line, one mass rapid transit (MRT) line and three airport rail links, two to the Kuala Lumpur International Airport and one to the Sultan Abdul Aziz Shah Airport. Klang is connected to the rest of the Klang Valley via the Federal Highway, the New Klang Valley Expressway, South Klang Valley Expressway, the North Klang Straits Bypass (New North Klang Straits Bypass) as well as the KESAS Highway."
              }
            },
            {
              "@type": "Question",
              "name": "Is there any medical center around Klang?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "There are several medical centers or hospitals for the resident in Klang. For example, in Jalan Langat there is a big Hospital called Hospital Tengku Ampuan Rahimah (Klang General Hospital). Besides that, Bandar Bukit Tinggi also has a Big Hospital named Manipal Hospitals Klang. In Klang there are almost 11 hospitals. If you are living in Klang there are no worries about Hospital because the Hospital is surrounded all around Klang."
              }
            },
            {
              "@type": "Question",
              "name": "Is Klang dangerous?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Klang claimed to be the 5th dangerous Asian city in 2016, it consists of a large number of criminal gangs reported to operating in Klang. The level of crime rates in Klang is high according to the numbeo.com."
              }
            }
          ]
        }`
          }}
        ></script>
      ) : null}

      {path.includes('rent/kota-damansara') ? (
        <script
          defer
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: `
        {
          "@context": "https://schema.org/",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "Is Kota Damansara a good place to stay?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Kota Damansara is a great place to stay as it is a location far enough from the rush hours within the city centre. It is a peaceful location and very near to the leisure and shopping mall such as The Curve, Tesco and IKEA. Encorp Strand Mall and Sunway Giza Mall are just right in front of the Kota Damansara train station. For education facilities, SEGI University is perfectly located near the MRT as well, therefore many students can look for the house near to the uni such as Cova Vila, Cova Suit, De Rozelle, Sunsuria, D' Rimba Apartment and Sunway Nexis SOHO apartment."
              }
            },
            {
              "@type": "Question",
              "name": "Any public transport in Kota Damansara?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "The MRT train has just launched in Kota Damansara which benefits the residents to access to another place. Buses are provided to the people to reach the Kelana Jaya LRT station from the residential area."
              }
            },
            {
              "@type": "Question",
              "name": "What are the recommended restaurant around Kota Damansara?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Fifth Palate specializes in asian fusion, serving breakfast and brunch food. Beside that,  you can also try the Shell Out Seafood, they serve crabs, clams, crayfish and other creatures of the sea.  The seafood comes served with an array of fiery flavourful sauces or mild buttery ones that surprise the senses with every dip and dash.  After a heavy meal, a dessert course helps digest the meal, you can enjoy cakes, cookies and intricately decorated tower of toasts at Dreamz Bakery in Kota Damansara. People also enjoy the food at The Strand, Sunway Giza Mall and Cascades."
              }
            },
            {
              "@type": "Question",
              "name": "Any houses to rent in Kota Damansara?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, there are several whole units to rent with the average rental price, RM 2200 at Emporis, Cova Suite and I Residence in Kota Damansara."
              }
            },
            {
              "@type": "Question",
              "name": "What is the living cost in Kota Damansara?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "The cost of living is around RM 960 according to the costof.live. It will be affordable for working adults with RM 3000 salary per month."
              }
            }
          ]
        }`
          }}
        ></script>
      ) : null}

      {path.includes('rent/kuala-lumpur') ? (
        <script
          defer
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: `
        {
          "@context": "https://schema.org/",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "What is the average rental in Kuala Lumpur?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "By referring to the house rental in speedhome, the average rental for one bedroom apartment near to the city centre is around RM2,200, whereas outside of the city centre could be around RM 1,300.  For a three bedroom family home in city centre, the average rental is around RM4500 and outside of the city centre, it could be around RM 1,600."
              }
            },
            {
              "@type": "Question",
              "name": "Why is Kuala Lumpur famous? Is it worth to stay?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Kuala Lumpur is the ideal destination for both short visits or longer stays. It is Malaysia's capital city and one of Asia's most dynamic cities. This bustling metropolis is a melting pot of races and cultures and is home to a population of 1.6 million people. Transportation in KL is just great. The entire city can be explored by taxi, bus, train and metro. However, the main junctions in KL city centre are often extremely crowded during the peak before and after working hours."
              }
            },
            {
              "@type": "Question",
              "name": "How much do you need to live comfortably in Kuala Lumpur?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "According to numbeo.com, the cost of living for a single person is around  RM 2083.04 without rent, whereas for a four-person family monthly cost is RM 7403.75 without rent.  Kuala Lumpur has the cost of living rank 325th out of 491 cities in the world. Most of the expenses that might be used while living in Kuala Lumpur are for the rental and transportation."
              }
            },
            {
              "@type": "Question",
              "name": "How do you get around in Kuala Lumpur?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Kuala Lumpur has a comprehensive rail transportation system, serviced by KL Monorail, Rapid Kl, Light Rail Transit (LRT) as well as the KTM commuter train. More parts of Kuala Lumpur are now connected by rails. The trains pass through the city and are able to reach out of the commercial area. Buses are provided as well to reach out of the residential area. Taxi and Grab are probably the most convenient ways to travel from one place to another place in a short period."
              }
            },
            {
              "@type": "Question",
              "name": "Which district is under Kuala Lumpur?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "There are 11 districts under Kuala Lumpur, the districts include Bukit Bintang, Titiwangsa, Setiawangsa, Wangsa Maju, Batu, Kepong, Segambut, Lembah Pantas, Seputeh, Bandar Tun Razak and Cheras."
              }
            }
          ]
        }`
          }}
        ></script>
      ) : null}

      {path.includes('rent/old-klang-road') ? (
        <script
          defer
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: `
        {
          "@context": "https://schema.org/",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "What amenities and facilities are included in Old Klang Road?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Old Klang Road gives you easy access to shopping malls like Mid Valley City, Pearl Point shopping mall and OUG Plaza, not to mention access to several government schools, an international school, institutions of higher education, hotels shopping complexes, government institutions and a wide choice of eateries."
              }
            },
            {
              "@type": "Question",
              "name": "What is the road condition in Old Klang Road?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "The area is densely populated and it acts as a major intersection between cities.The Old Klang Road is directly linked to a number of freeways including Federal Highway. SPRINT Highway, New Pantai Expressway (NPE), Damansara - Puchong Expressway (LDP) and KL- Seremban Expressway. Therefore, with the good connectivity, the traffic congestion is bound to happen."
              }
            },
            {
              "@type": "Question",
              "name": "How to get to old klang road in Kuala Lumpur by Bus, Metro or Train?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "In terms of public transport, Rapid KL buses are provided that move along this main road. The closest KTM station is at Mid Valley."
              }
            },
            {
              "@type": "Question",
              "name": "Where do people stay and what is the average rental price in Old Klang Road?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "People in Old Klang Road usually stay at high-rise such as ViVo Residential Suites, Scott Garden, OUG Parklane, CitiZen, Riverville Residences and Southbank Residence, while for landed property, people usually stay at OUG, Happy Garden, Taman Lian Hoe, Taman Desa and Taman United.  The average rental price for a 3 bedroom unit is around RM 1800."
              }
            },
            {
              "@type": "Question",
              "name": "What are the recommended food in old klang road?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Old Klang Road as one of the oldest roads in Kuala Lumpur which link to the city center, there are a lot of restaurants along the way on Old Klang Road, for example BBQ Thai Street food, Coco Steamboat and Ishin Japanese Restaurant. You can also enjoy a variety of street food despite the development here, such as Cao Cao Grilled Lamb & Wantan Mee stalls, Big Tree Fried Pan Mee, Asam Laksa in the OUG and Happy Garden Pasar Malam despite the rapid development here."
              }
            }
          ]
        }`
          }}
        ></script>
      ) : null}

      {path.includes('rent/petaling-jaya') ? (
        <script
          defer
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: `
        {
          "@context": "https://schema.org/",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "How far is Petaling Jaya from KL? What is the fastest way to get to KL from Petaling Jaya?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Total distance from Petaling Jaya to Kuala Lumpur is 10.81km. Petaling Jaya is surrounded by major highways such as the LDP, Federal Highway, Sprint and DUKE and all of these highways offer easy access to Kuala Lumpur and other parts of Selangor. So, if you have a car, getting to KL from Petaling Jaya is easy. Besides that, in Petaling Jaya, there also have RAPID KL LRT station which can reach the city centre, Bangsar or even to Subang Jaya or Shah Alam. Petaling Jaya also have MRT station where can reach from Kajang to Sungai Buloh."
              }
            },
            {
              "@type": "Question",
              "name": "Is Petaling Jaya safe?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Petaling Jaya had the highest crime in Selangor in 2016, due it is the thriving business community which probably by criminals are attracted to it. However, currently, most of the residential area has provided security service, CCTVs are situated at various locations around Petaling Jaya in 2017 as well."
              }
            },
            {
              "@type": "Question",
              "name": "What is the living cost in Petaling Jaya?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "For a four-person family monthly costs maybe around RM7,677.00 without rent and for an individual the monthly living cost is around RM2144.00 following the internet research. Cost of living index in Petaling Jaya is 2.09% higher than in Kuala Lumpur. Although the cost of living index in Petaling Jaya is higher than Kuala Lumpur the rent cost in Petaling Jaya is lower than Kuala Lumpur. According to the research, the cost of living in Petaling Jaya is ranked 313th out of 487 cities in the world."
              }
            },
            {
              "@type": "Question",
              "name": "Any shopping mall in Petaling Jaya?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "There are plenty of shopping malls in Petaling Jaya. The most famous shopping mall in Petaling Jaya is 1 Utama shopping mall. Besides that, there are smaller neighbourhood malls such as Paradigm Mall, Atria Shopping Gallery and the newly opened Starling Mall in Damansara Uptown."
              }
            },
            {
              "@type": "Question",
              "name": "What are the recommended food in Petaling Jaya?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "There are many good foods in Petaling Jaya. For example Nasi KuKus Ilham. This restaurant is very special because it only serves one dish which is nasi kukus. Their nasi kukus special is because of their flavorful gulai, well marinated chicken and pineapple chunks. Besides that , in Petaling Jaya also have many good foods such as Nasi Lemak Goreng Chef Fauzey, Sri Ganapathi Mess, Aunty Christina Laksa, Nasi Kandar Zainul and etc."
              }
            }
          ]
        }`
          }}
        ></script>
      ) : null}

      {path.includes('rent/puchong') ? (
        <script
          defer
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: `
        {
          "@context": "https://schema.org/",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "Is Puchong safe?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Based on the research for the past 3 years, criminal activity in Puchong is around Moderate. You can feel safe living in Puchong."
              }
            },
            {
              "@type": "Question",
              "name": "How far is Puchong from Kuala Lumpur? Any public transport in Puchong?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "The distance from Puchong to Kuala Lumpur is 31.9km. Puchong has 7 LRT stations. All the LRT stations are part of the Ampang or Sri Petaling line. From the LRT station, the LRT also can bring you to other transport networks as well such as MRT, KTM, buses, ETS and KLIA Express. So, you can take a comfortable LRT ride to KL city centre and other locations for work, meetings, attending functions and leisure."
              }
            },
            {
              "@type": "Question",
              "name": "What is there to do in Puchong?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Puchong has all the amenities you would need. There are a few malls, hypermarkets, and supermarkets in Puchong example IOI Mall, AEON Big, Tesco Puchong Jaya, Tesco Extra and etc. You can purchase meat, poultry, fish, and fresh produce in a modern and clean wet market called Puteri Mart in Bandar Puteri. For children education, Puchong has several schools including from SJKC to SMK and several international schools also located in Puchong."
              }
            },
            {
              "@type": "Question",
              "name": "How are the accessibility and connectivity in Puchong?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Puchong has a good connectivity to other famous office areas. Living in Puchong you can accessed through Damansara-Puchong Highway (LDP), Shah Alam Expressway (KESAS), Maju Expressway (MEX), New Pantai Expressway (NPE), North-South Expressway Central Link, South Klang Valley Expressway (SKVE) and Federal Highway to other area. For example, if your working area is at Bukit Jalil. From Puchong to your working area only takes about 16min. It depends on the traffic situation."
              }
            },
            {
              "@type": "Question",
              "name": "Is living in Puchong suitable for a worker?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Puchong is suitable for workers to live this is because Puchong is a location where it is most strategic. It is surrounded by several famous office area example like Subang Jaya, Bandar Sunway, Bukit Jalil, Sri Petaling, Seri Kembangan, Putrajaya, Cyberjaya, KLIA or KLIA2. Surrounding other famous office area make you easily get to work every day."
              }
            }
          ]
        }`
          }}
        ></script>
      ) : null}

      {path.includes('rent/sentul') ? (
        <script
          defer
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: `
        {
          "@context": "https://schema.org/",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "Is Sentul a nice place to stay?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Sentul encompasses Taman Metropolitan Batu to the north, Bandar Sentul Utama and Sentul Pasar, Baru Baru Sentul to the east alongside Sentul East and Sentul West. It is a short distance to the Kuala Lumpur city centre and relatively lower property prices have made it an attractive place to stay."
              }
            },
            {
              "@type": "Question",
              "name": "How is the accessibility of Sentul?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Sentul is easily accessible via not only the KTM commuter but also the Ampang and Sri Petaling LRT line going to both its Sentul and Sentul Timur station. On top of that, Sentul can also be accessed via various highways, namely Jalan Tun Razak, Jalan Ipoh, Jalan Pahang, Mahameru Highway (MRR1), the Duta–Ulu Kelang Highway (DUKE) and the SMART Motorway Tunnel via Jalan Tun Razak."
              }
            },
            {
              "@type": "Question",
              "name": "What are the eateries in Sentul Area?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "You can find many old restaurants offering a wide selection of local food at Jalan Ipoh and Jalan Sentul. If you are looking for a Chinese restaurant in the Sentul area, Lau Heong Seafood Restaurant and Restaurant Ah Yap Hokkien Mee. Both are well-known restaurants that have been around for more than 40 years. If you are a curry lover, Sentul Curry House at Jalan Ipoh shall be your pick, the restaurant serves a wide range of Indian dishes such as Curry Mutton, Sambal Sotong and others."
              }
            },
            {
              "@type": "Question",
              "name": "What is the average rent price in Sentul?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "According to propsocial, the average rental price for non-landed property is RM1,977 while for landed property, the price goes up to RM 2,466."
              }
            }   
          ]
        }`
          }}
        ></script>
      ) : null}

      {path.includes('rent/shah-alam') ? (
        <script
          defer
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: `
        {
          "@context": "https://schema.org/",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "What is good in Shah Alam? (What to do in Shah Alam ? )",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Shah Alam has several shopping malls, including SACC Mall, Plaza Shah Alam, AEON Mall and another hypermarket. Moreover, I-city is one of the attractions of Shah Alam and was developed on the outskirts, it hosts some entertainment centres to attract 1000 customers every weekend. If you like outdoor activities, you can visit Taman Botanica which is a good place for a jog cycle and spending time to enjoy the green forest."
              }
            },
            {
              "@type": "Question",
              "name": "How far is Shah Alam from Kuala Lumpur? ( Is there a public transport between Kuala Lumpur and Shah Alam?)",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Shah Alam is 18 km away from Kuala Lumpur. There is a direct bus and direct train working on the line from KL to Shah Alam. The direct bus which operated by Causeway Link will depart from Pasar Seni to Bulatan Melawati, Federal Highway. The time for the journey only takes approximately 39 min. Besides that, the direct train which is operated by KTM commuter is working on the line from KL Sentral to Batu Tiga and the time takes approximately 43 min."
              }
            },
            {
              "@type": "Question",
              "name": "Is cost of living in Shah Alam is high compared to Petaling Jaya?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "According to research, consumer prices including rent prices in Shah Alam is lower than Petaling Jaya. The rent price in Petaling Jaya is higher than in Shah Alam. Besides that, the food prices and groceries in Shah Alam is lower than Petaling Jaya."
              }
            },
            {
              "@type": "Question",
              "name": "Any education facilities in Shah Alam?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "In Shah Alam, there are many schools and education institutions located in Shah Alam. For example, there is an International School named Tenby International School. Besides that, there also have Chinese Taipei School, Maz International School, REAL International School, Sekolah Seri Cahaya, Management & Science University and KDU University College. All are reachable in Shah Alam."
              }
            },
            {
              "@type": "Question",
              "name": "How is the connectivity of Shah Alam to other areas?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Shah Alam is a well planned place that has great accessibility to a few highways such as Federal Highway. Shah Alam Expressway that is also known as the Kesas Highway, it is an alternative to the congested Federal Highway. It connects to a wide range of highway networks such as the Damansara-Puchong Expressway (LDP), North-South Expressway Central Link (Elite) North-South Expressway (NSE), Maju Expressway (MEX), New Klang Valley Expressway (NKVE), Kemuning-Shah Alam Highway (LKSA) and Kuala Lumpur – Karak Highway. It provides high accessibility which allows people from Shah Alam to travel to the city centre with short travelling time. Furthermore, it is also the first expressway to have a dedicated motorcycle lane that was built for their safety."
              }
            }
          ]
        }`
          }}
        ></script>
      ) : null}

      {path.includes('rent/subang-jaya') ? (
        <script
          defer
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: `
        {
          "@context": "https://schema.org/",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "How far is Subang Jaya from KL? Is there any train service?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "It is around 20km from the city centre of Kuala Lumpur to Subang Jaya, you can take the Light Rail Transit (LRT) from KL Sentral station to reach the Subang Jaya station."
              }
            },
            {
              "@type": "Question",
              "name": "What are the facilities and amenities in Subang Jaya?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Subang Jaya is a complete township with residential, commercial, industrial, and educational components. It consists of the neighbourhood from SS12 to SS19, PJS7/PJS9/PJS11 of Bandar Sunway, UEP Subang Jaya (USJ), Putra Height and Batu Tiga. Living in Subang Jaya allows you access to all the facilities such as well-equipped medical centres, cafe, and eateries as well as entertainment outlets. There are also plenty of shopping malls Subang Parade, Bandar Sunway, Empire Shopping Gallery and One City."
              }
            },
            {
              "@type": "Question",
              "name": "What is the accessibility in Subang Jaya?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Subang jaya has a great accessibility as it is connected to Kuala Lumpur, Shah Alam and Petaling Jaya by networks of expressways and efficient rail transit. Major highways that link to the area include Federal Highway, Shah Alam Expressway (KESAS), NKVE, NPE, North South Expressway and LDP. However, Subang Jaya has bad traffic spills over onto the connecting roads for peak hour."
              }
            },
            {
              "@type": "Question",
              "name": "What is the average rental price in Subang Jaya?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "According to numbeo.com, the average rental for one bedroom apartment near to the city centre is around RM1500, whereas outside of the city centre could be around RM 800.  For a furnished three bedroom apartment in the city centre, the average rental is around RM2500 and outside of the city centre, it could be around RM 2000."
              }
            },
            {
              "@type": "Question",
              "name": "Where to stay in Subang Jaya?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Subang Jaya neighbourhood includes from SS12 to SS19, Taman Wangsa Baiduri, Taman Mutiara Subang and Taman Bukit Pelangi. There is an extension township called UEP Subang Jaya (USJ). USJ is made up of USJ 1 to USJ 27 besides USJ 3A to 3D, Subang Heights and USJ Heights. The common residential area for people who living in Subang Jaya are SS16 and SS15 as well as around Subang Jaya Lake in SS12."
              }
            }
          ]
        }`
          }}
        ></script>
      ) : null}

      {path.includes('rent/wangsa-maju') ? (
        <script
          defer
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: `
        {
          "@context": "https://schema.org/",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "Any public transport in Wangsa Maju?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Wangsa Maju is close to the city centre, it has three existing LRT stations - Sri Rampai Station, Wangsa Maju Station and Setia Wangsa Station. At the LRT station, buses are provided to shorter distances and travel within residential and commercial areas. Under the revised routes, Route T301, which serves areas between Aeon Big (formerly known as Carrefour) and the Wangsa Maju LRT Station via Giant Taman Permata, and Route T304, which currently plies between Taman Melawati and Wangsa Maju LRT Station and passing through Klang Gate, will be combined."
              }
            },
            {
              "@type": "Question",
              "name": "What  are amenities and facilities in wangsa maju?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Wangsa maju are surrounded by recreation and entertainment centres as well as shopping malls such as Setapak Central Mall, AEON Alpha Angle, Melawati Mall, AEON BIG and Wangsa Walk Mall cater for the residents of Wangsa Maju. Education facilities that are located in Wangsa Maju include such as Tunku Abdul Rahman College (TARC), University Tunku Abdul Rahman and Malaysia Institute of Art. Besides that, there are many types of housing areas from low to medium cost houses which are suitable for those who work or study near the Wangsa Maju."
              }
            },
            {
              "@type": "Question",
              "name": "What are the road network in Wangsa Maju?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Wangsa Maju is well served by federal routes and expressways. Jalan Genting Klang links downtown Kuala Lumpur with Wangsa Maju and Setapak areas. Motorists from Ampang and Pandan Indah will instead opt for the MRR2. The DUKE E33 cuts through the southern part of Wangsa Maju. The old road to Gombak and Bentong also begins nearby."
              }
            },
            {
              "@type": "Question",
              "name": "Which restaurant is recommended in Wangsa maju?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "In Wangsa Maju there are many delicious food.For breakfast, the Hayaki  is a convenient restaurant where you can enjoy authentic and traditional Kelantanese cuisine. Its signature dish is the Nasi Kerabu Ayam Percik which is served with a grilled chicken drumstick, salted egg, crunchy keropok, and a variety of raw vegetables.  Besides that, there also got Wahab’s Cendol, Nasi Kak Wok Selera, Stiq and  Kaw Kaw Burger. You can also try the Thai food from Restoran Sri Ayutthaya. Wangsa Maju has many kind of delicacies."
              }
            },
            {
              "@type": "Question",
              "name": "Where are the housing area in Wangsa Maju?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Wangsa Maju is one of the largest townships in Kuala Lumpur, the section that is under Wangsa Maju are Section 1,2,4,5,6 and 10. The housing area in Wangsa Maju include Wangsa Melawati, Desa Setapak, Taman Sri Rampai and Taman Bunga Raya."
              }
            }
          ]
        }`
          }}
        ></script>
      ) : null}
      {props.children}
    </NextHead>
  )
}

export default Head
