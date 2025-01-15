const getSecretKeyValue = require('./SecretsManager')
const NotifyClient = require('notifications-node-client').NotifyClient

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
  console.log('hit1')
  let apiKey = await getApiKey()
  console.log('hit2', apiKey)
  const notifyClient = new NotifyClient(apiKey)

  console.log('hit4', notifyClient)

  notifyClient
    .sendEmail(templateId, emailAddress, {
      personalisation: personalisation,
      reference: reference,
      oneClickUnsubscribeURL: '',
      emailReplyToId: emailReplyToId
    })
    .then(
      (response) => console.log('3', response)

      //update this to log success in server logs
    )
    .catch((err) => console.error(err))
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
      (response) => console.log(response)
      //update this to log success in server logs
    )
    .catch((err) => console.error(err))
}

module.exports = { sendEmailNotification }
