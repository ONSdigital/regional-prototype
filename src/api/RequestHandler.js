// Get codes for Local Authorities

export function getCodes() {
  return fetch(`https://api.beta.ons.gov.uk/v1/code-lists/local-authority/editions/2016/codes`)

    .then((response) => response.json())
    .then(console.log('getCodes'))
    .catch((error) => {
      console.error(error);
    });
}

// Get Geo Data

export function getGeoData() {
  return fetch('https://ons-inspire.esriuk.com/arcgis/rest/services/Administrative_Boundaries/Local_Authority_Districts_May_2018_Boundaries/MapServer/4/query?where=1%3D1&outFields=*&outSR=4326&f=json')
    .then(console.log('geoData'))
    .then((response) => response.json())
    .catch((error) => {
    console.error(error);
  });
}

// Get Population Data

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

// Get Full Time Earnings

export function getEarnings(code) {
  return fetch(`https://api.beta.ons.gov.uk/v1/datasets/ashe-table-7-earnings/editions/time-series/versions/1/observations?Time=*&Earnings=annual-pay-gross&Sex=all&Workingpattern=full-time&Statistics=median&Geography=${code}`)
    .then(console.log('getEarnings'))
    .then((response) => response.json())
    .catch((error) => {
    console.error(error);
  });
}

export function getEarningsMale(code) {
  return fetch(`https://api.beta.ons.gov.uk/v1/datasets/ashe-table-7-earnings/editions/time-series/versions/1/observations?Time=*&Earnings=annual-pay-gross&Sex=male&Workingpattern=full-time&Statistics=median&Geography=${code}`)
    .then(console.log('getEarningsMale'))
    .then((response) => response.json())
    .catch((error) => {
    console.error(error);
  });
}

export function getEarningsFemale(code) {
  return fetch(`https://api.beta.ons.gov.uk/v1/datasets/ashe-table-7-earnings/editions/time-series/versions/1/observations?Time=*&Earnings=annual-pay-gross&Sex=female&Workingpattern=full-time&Statistics=median&Geography=${code}`)
    .then(console.log('getEarningsFemale'))
    .then((response) => response.json())
    .catch((error) => {
    console.error(error);
  });
}

// Get Part Time Earnings

export function getPartTimeEarnings(code) {
  return fetch(`https://api.beta.ons.gov.uk/v1/datasets/ashe-table-7-earnings/editions/time-series/versions/1/observations?Time=*&Earnings=annual-pay-gross&Sex=all&Workingpattern=part-time&Statistics=median&Geography=${code}`)
    .then(console.log('getPartTimeEarnings'))
    .then((response) => response.json())
    .catch((error) => {
    console.error(error);
  });
}

export function getPartTimeEarningsMale(code) {
  return fetch(`https://api.beta.ons.gov.uk/v1/datasets/ashe-table-7-earnings/editions/time-series/versions/1/observations?Time=*&Earnings=annual-pay-gross&Sex=male&Workingpattern=part-time&Statistics=median&Geography=${code}`)
    .then(console.log('getPartTimeEarningsMale'))
    .then((response) => response.json())
    .catch((error) => {
    console.error(error);
  });
}

export function getPartTimeEarningsFemale(code) {
  return fetch(`https://api.beta.ons.gov.uk/v1/datasets/ashe-table-7-earnings/editions/time-series/versions/1/observations?Time=*&Earnings=annual-pay-gross&Sex=female&Workingpattern=part-time&Statistics=median&Geography=${code}`)
    .then(console.log('getPartTimeEarningsFemale'))
    .then((response) => response.json())
    .catch((error) => {
    console.error(error);
  });
}

// Get Well-Being data

export function getUKWellBeing(measure) {
  return fetch(`https://api.beta.ons.gov.uk/v1/datasets/wellbeing-year-ending/editions/time-series/versions/1/observations?time=January%202017%20-%20December%202017&geography=K02000001&estimate=*&allmeasuresofwellbeing=${measure}`)
    .then(console.log(`getUK/${measure}`))
    .then((response) => response.json())
    .catch((error) => {
    console.error(error);
  });
}

export function getLocalWellBeing(code, measure) {
  return fetch(`https://api.beta.ons.gov.uk/v1/datasets/wellbeing-local-authority/editions/time-series/versions/1/observations?time=2017-18&geography=${code}&estimate=*&allmeasuresofwellbeing=${measure}`)
    .then(console.log(`getLocal/${measure}`))
    .then((response) => response.json())
    .catch((error) => {
    console.error(error);
  });
}

// Get Gender Pay Gap data

export function getHourlyEarnings(code, hours, gender) {
  return fetch(`https://api.beta.ons.gov.uk/v1/datasets/ashe-table-7-earnings/editions/time-series/versions/1/observations?Time=*&Earnings=hourly-pay-excluding-overtime&Sex=${gender}&Workingpattern=${hours}&Statistics=median&Geography=${code}`)
    .then(console.log(`getHourlyEarnings/${gender}/${hours}`))
    .then((response) => response.json())
    .catch((error) => {
    console.error(error);
  });
}
