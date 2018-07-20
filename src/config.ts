export const config = {
  airbnb: {
    hosts: ['www.airbnb.com.au'],
    extractor: {
      reviews: xml =>  xml.querySelector('#undefined_count').firstChild.textContent,
      name: xml => {
        const title = xml.querySelector('title').textContent;
        const end = title.indexOf('\'');
        return title.substring(0, end);
      }
      
    }
  }
};
