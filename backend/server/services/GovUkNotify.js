const getSecretKeyValue = require('./SecretsManager')
const NotifyClient = require('notifications-node-client').NotifyClient
const { logger } = require ('../plugins/logging')
const getApiKey = async () => {
  return await getSecretKeyValue('nws/notify', 'apiKey')
}

const sendEmailNotification = async (
  templateId,
  emailAddress,
  personalisation,
  reference = '',
  emailReplyToId = ''
) => {
  const apiKey = await getApiKey()
  const notifyClient = new NotifyClient(apiKey)

  let options = {
    personalisation: personalisation,
    reference: reference,
    oneClickUnsubscribeURL: '',
    emailReplyToId: emailReplyToId
  }

  notifyClient
    .sendEmail(templateId, emailAddress, options )
    .then(
      (response) => logger.info(response)
      // update this to log success in server logs
    )
    .catch((err) => logger.error(err))
}

const sendSmsNotification = (
  templateId,
  phoneNumber,
  personalisation,
  reference = '',
  smsSenderId = ''
) => {
  const notifyClient = new NotifyClient(getApiKey)

  notifyClient
    .sendSms(templateId, phoneNumber, {
      personalisation: personalisation,
      reference: reference,
      smsSenderId: smsSenderId
    })
    .then(
      (response) => logger.info(response)
      // update this to log success in server logs
    )
    .catch((err) => logger.error(err))
}

// below link explains how to send a letter to the correct address
// https://docs.notifications.service.gov.uk/node.html#send-a-letter-arguments-personalisation-required
const sendLetter = (templateId, personalisation, reference = '') => {
  const notifyClient = new NotifyClient(getApiKey)

  notifyClient
    .sendLetter(templateId, {
      personalisation: personalisation,
      reference: reference
    })
    .then(
      (response) => logger.info(response)
      // update this to log success in server log
    )
    .catch((err) => logger.error(err))
}

module.exports = { sendEmailNotification, sendSmsNotification, sendLetter }
