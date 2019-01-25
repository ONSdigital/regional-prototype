export function getCodes() {
  return fetch(`https://api.beta.ons.gov.uk/v1/code-lists/local-authority/editions/2016/codes`)
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
    });
}

export function getGeoData() {
  return fetch('https://ons-inspire.esriuk.com/arcgis/rest/services/Administrative_Boundaries/Local_Authority_Districts_May_2018_Boundaries/MapServer/4/query?where=1%3D1&outFields=*&outSR=4326&f=json')
    .then((response) => response.json())
    .catch((error) => {
    console.error(error);
  });
}
