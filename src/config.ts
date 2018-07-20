export const config = {
  airbnb: {
    hosts: ['www.airbnb.com.au', 'www.airbnb.com'],
    extractor: {
      reviews: xml =>  xml.querySelector('#undefined_count').firstChild.textContent,
      name: xml => {
        const title = xml.querySelector('title').textContent;
        const end = title.indexOf('\'');
        return title.substring(0, end);
      },
      country: xml => xml.querySelector('#site-content')
        .querySelector('a.link-reset').textContent,
      joined: xml => xml.querySelector('#site-content')
        .querySelector('span.text-normal').textContent.trim().slice(10),
      verified: xml => {
        const nodelist = xml.querySelector('#user').parentElement
          .querySelector('ul[title]').childNodes;
        
        const labels = []

        for(var i = 0; i < nodelist.length; i++) {
          if (nodelist[i].nodeName == 'LI') 
            labels.push(nodelist[i].childNodes[1].textContent.trim().toLowerCase())
        }
        
        return labels.join(', ')
      }
    }
  },
  
  ebay: {
    hosts: ['www.ebay.com.au', 'www.ebay.com'],
    extractor: {
      name: xml => xml.querySelector('#user_info')
          .querySelector('a.mbg-id').lastChild.textContent.trim(),
      feedback: xml => { 
        const fb = xml.querySelector('#user_info')
          .querySelector('a[title]').lastChild.textContent.trim()
        return `(${fb})`
      },
      positive: xml => xml.querySelector('#user_info')
          .querySelector('div.perctg').textContent.trim(),
      rating: xml => { 
        const positive = xml.querySelector('#feedback_ratings')
          .querySelector('a[title=Positive]')
          .querySelector('span.num').textContent.trim();
        const neutral = xml.querySelector('#feedback_ratings')
          .querySelector('a[title=Neutral]')
          .querySelector('span.num').textContent.trim();
        const negative = xml.querySelector('#feedback_ratings')
          .querySelector('a[title=Negative]')
          .querySelector('span.num').textContent.trim();
        return `positive ${positive}  neutral ${neutral}  negative ${negative}`
      }
    }
  }
};
