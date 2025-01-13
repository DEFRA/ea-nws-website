const geoSafeToWebContact = (geoSafeContact) => {
  const contact = {
    id: geoSafeContact?.id,
    enabled: geoSafeContact?.enabled,
    firstname: geoSafeContact?.firstname,
    lastname: geoSafeContact?.lastname,
    emails: geoSafeContact?.emails,
    mobilePhones: geoSafeContact?.mobilePhones,
    homePhones: geoSafeContact?.homePhones,
    language: geoSafeContact?.language,
    position: geoSafeContact?.position,
    unit: geoSafeContact?.unit,
    service: geoSafeContact?.service,
    comments: geoSafeContact?.comments,
    additionals: {
      lastAccessedUrl: null,
      signUpComplete: null,
      businessName: null,
      jobTitle: null,
      keywords: null
    },
    unverified: geoSafeContact?.unverified,
    metatdata: geoSafeContact?.metatdata,
    pois: geoSafeContact?.pois,
    role: geoSafeContact?.role,
    pendingRole: geoSafeContact?.pendingRole
  }

  const additionals = geoSafeContact?.additionals
  additionals?.forEach((additional) => {
    if (additional.id === 'keywords') {
      let keywords
      try {
        keywords = JSON.parse(additional.value?.s)
      } catch (e) {
        keywords = []
      }
      contact.additionals.keywords = keywords
    } else {
      contact.additionals[additional.id] = additional.value?.s
    }
  })

  return contact
}

const webToGeoSafeContact = (webContact) => {
  const contact = {
    id: webContact.id,
    enabled: webContact.enabled,
    firstname: webContact.firstname,
    lastname: webContact.lastname,
    emails: webContact.emails,
    mobilePhones: webContact.mobilePhones,
    homePhones: webContact.homePhones,
    language: webContact.language,
    position: webContact.position,
    unit: webContact.unit,
    service: webContact.service,
    comments: webContact.comments,
    additionals: [
      {
        id: 'lastAccessedUrl',
        value: { s: webContact.additionals?.lastAccessedUrl }
      },
      {
        id: 'signUpComplete',
        value: { s: webContact.additionals?.signUpComplete }
      },
      {
        id: 'businessName',
        value: { s: webContact.additionals?.businessName }
      },
      { id: 'jobTitle', value: { s: webContact.additionals?.jobTitle } },
      {
        id: 'keywords',
        value: { s: JSON.stringify(webContact.additionals?.keywords) }
      }
    ],
    unverified: webContact.unverified,
    metatdata: webContact.metatdata,
    pois: webContact.pois,
    role: webContact.role,
    pendingRole: webContact.pendingRole
  }
  console.log('contact returned', contact)
  return contact
}

module.exports = { webToGeoSafeContact, geoSafeToWebContact }
