export function getCodes() {
  return fetch(`https://api.beta.ons.gov.uk/v1/code-lists/local-authority/editions/2016/codes`)

    .then((response) => response.json())
    .then(console.log('getCodes'))
    .catch((error) => {
      console.error(error);
    });
}

export function getGeoData() {
  return fetch('https://ons-inspire.esriuk.com/arcgis/rest/services/Administrative_Boundaries/Local_Authority_Districts_May_2018_Boundaries/MapServer/4/query?where=1%3D1&outFields=*&outSR=4326&f=json')
    .then(console.log('geoData'))
    .then((response) => response.json())
    .catch((error) => {
    console.error(error);
  });
}

export function getMalePop(code) {
  return fetch(`https://api.beta.ons.gov.uk/v1/datasets/mid-year-pop-est/editions/time-series/versions/4/observations?time=2016&geography=${code}&sex=1&age=*`)
    .then(console.log('getMalePop'))
    .then((response) => response.json())
    .catch((error) => {
    console.error(error);
  });
}

export function getFemalePop(code) {
  return fetch(`https://api.beta.ons.gov.uk/v1/datasets/mid-year-pop-est/editions/time-series/versions/4/observations?time=2016&geography=${code}&sex=2&age=*`)
    .then(console.log('getFemalePop'))
    .then((response) => response.json())
    .catch((error) => {
    console.error(error);
  });
}

export function getPop(code) {
  return fetch(`https://api.beta.ons.gov.uk/v1/datasets/mid-year-pop-est/editions/time-series/versions/4/observations?time=2016&geography=${code}&sex=0&age=*`)
    .then(console.log('getPop'))
    .then((response) => response.json())
    .catch((error) => {
    console.error(error);
  });
}
