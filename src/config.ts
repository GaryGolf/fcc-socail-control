export const config = {
  airbnb: {
    hosts: ['www.airbnb.com.au'],
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
  }
};
