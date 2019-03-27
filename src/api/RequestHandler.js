// Get codes for Local Authorities

export function getCodes() {
  return fetch(`https://api.beta.ons.gov.uk/v1/code-lists/local-authority/editions/2016/codes`)

    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
    });
}

// Get Geo Data

export function getGeoJSON() {
  return fetch('https://opendata.arcgis.com/datasets/b2d5f4f8e9eb469bb22af910bdc1de22_3.geojson')
    .then((response) => response.json())
    .catch((error) => {
    console.error(error);
  });
}

// Get Population Data

export function getMalePop(code) {
  return fetch(`https://api.beta.ons.gov.uk/v1/datasets/mid-year-pop-est/editions/time-series/versions/4/observations?time=2017&geography=${code}&sex=1&age=*`)
    .then((response) => response.json())
    .catch((error) => {
    console.error(error);
  });
}

export function getFemalePop(code) {
  return fetch(`https://api.beta.ons.gov.uk/v1/datasets/mid-year-pop-est/editions/time-series/versions/4/observations?time=2017&geography=${code}&sex=2&age=*`)
    .then((response) => response.json())
    .catch((error) => {
    console.error(error);
  });
}

export function getPop(time, code, sex) {
  return fetch(`https://api.beta.ons.gov.uk/v1/datasets/mid-year-pop-est/editions/time-series/versions/4/observations?time=${time}&geography=${code}&sex=${sex}&age=total`)
    .then((response) => response.json())
    .catch((error) => {
    console.error(error);
  });
}

// Get Earnings

export function getAllEarnings(code, sex, pattern, table) {
  return fetch(`https://api.beta.ons.gov.uk/v1/datasets/ashe-table-${table}-earnings/editions/time-series/versions/1/observations?Time=2017&Earnings=annual-pay-gross&Sex=${sex}&Workingpattern=${pattern}&Statistics=mean&Geography=${code}`)
    .then((response) => response.json())
    .catch((error) => {
    console.error(error);
  });
}

// Get Full Time Earnings

export function getEarnings(code, table) {
  return fetch(`https://api.beta.ons.gov.uk/v1/datasets/ashe-table-${table}-earnings/editions/time-series/versions/1/observations?Time=*&Earnings=annual-pay-gross&Sex=all&Workingpattern=full-time&Statistics=mean&Geography=${code}`)
    .then((response) => response.json())
    .catch((error) => {
    console.error(error);
  });
}

export function getEarningsMale(code, table) {
  return fetch(`https://api.beta.ons.gov.uk/v1/datasets/ashe-table-${table}-earnings/editions/time-series/versions/1/observations?Time=*&Earnings=annual-pay-gross&Sex=male&Workingpattern=full-time&Statistics=mean&Geography=${code}`)
    .then((response) => response.json())
    .catch((error) => {
    console.error(error);
  });
}

export function getEarningsFemale(code, table) {
  return fetch(`https://api.beta.ons.gov.uk/v1/datasets/ashe-table-${table}-earnings/editions/time-series/versions/1/observations?Time=*&Earnings=annual-pay-gross&Sex=female&Workingpattern=full-time&Statistics=mean&Geography=${code}`)
    .then((response) => response.json())
    .catch((error) => {
    console.error(error);
  });
}

// Get Part Time Earnings

export function getPartTimeEarnings(code, table) {
  return fetch(`https://api.beta.ons.gov.uk/v1/datasets/ashe-table-${table}-earnings/editions/time-series/versions/1/observations?Time=*&Earnings=annual-pay-gross&Sex=all&Workingpattern=part-time&Statistics=mean&Geography=${code}`)
    .then((response) => response.json())
    .catch((error) => {
    console.error(error);
  });
}

export function getPartTimeEarningsMale(code, table) {
  return fetch(`https://api.beta.ons.gov.uk/v1/datasets/ashe-table-${table}-earnings/editions/time-series/versions/1/observations?Time=*&Earnings=annual-pay-gross&Sex=male&Workingpattern=part-time&Statistics=mean&Geography=${code}`)
    .then((response) => response.json())
    .catch((error) => {
    console.error(error);
  });
}

export function getPartTimeEarningsFemale(code, table) {
  return fetch(`https://api.beta.ons.gov.uk/v1/datasets/ashe-table-${table}-earnings/editions/time-series/versions/1/observations?Time=*&Earnings=annual-pay-gross&Sex=female&Workingpattern=part-time&Statistics=mean&Geography=${code}`)
    .then((response) => response.json())
    .catch((error) => {
    console.error(error);
  });
}

// Get Well-Being data

export function getUKWellBeing(measure) {
  return fetch(`https://api.beta.ons.gov.uk/v1/datasets/wellbeing-local-authority/editions/time-series/versions/1/observations?time=2017-18&geography=K02000001&estimate=*&allmeasuresofwellbeing=${measure}`)
    .then((response) => response.json())
    .catch((error) => {
    console.error(error);
  });
}

export function getLocalWellBeing(code, estimate, measure) {
  return fetch(`https://api.beta.ons.gov.uk/v1/datasets/wellbeing-local-authority/editions/time-series/versions/1/observations?time=2017-18&geography=${code}&estimate=${estimate}&allmeasuresofwellbeing=${measure}`)
    .then((response) => response.json())
    .catch((error) => {
    console.error(error);
  });
}

// Get Gender Pay Gap data

export function getHourlyEarnings(code, hours, gender) {
  return fetch(`https://api.beta.ons.gov.uk/v1/datasets/ashe-table-7-earnings/editions/time-series/versions/1/observations?Time=*&Earnings=hourly-pay-excluding-overtime&Sex=${gender}&Workingpattern=${hours}&Statistics=median&Geography=${code}`)
    .then((response) => response.json())
    .catch((error) => {
    console.error(error);
  });
}

// Get Life Expectancy data

export function getLifeExpectancy(cohort) {
  return fetch(`https://api.beta.ons.gov.uk/v1/datasets/life-expectancy-local-authority/editions/time-series/versions/1/observations?lifeexpectancyvariable=life-expectancy&time=2015-17&geography=*&birthcohort=birth-${cohort}`)
    .then((response) => response.json())
    .catch((error) => {
    console.error(error);
  });
}


// CMD Link

export function getCMDLink(query) {
  return fetch(`https://api.beta.ons.gov.uk/v1/filters?submitted=true`,
    {
      mode: 'cors',
      method: 'post',
      body: query
    })
      .then((response) => response.json())
      .catch((error) => {
        console.log(error);
      })
}
