const { GetSecretValueCommand, SecretsManagerClient } = require('@aws-sdk/client-secrets-manager')

const getSecretValue = async (secretName) => {
  if (secretName != null) {
    const client = new SecretsManagerClient()
    const response = await client.send(
      new GetSecretValueCommand({
        SecretId: secretName
      })
    )

    if (response.SecretString) {
      return response.SecretString
    } else {
      return null
    }
  } else {
    return null
  }
}

const getSecretKeyValue = async (secretName, key) => {
  const secretValue = JSON.parse(await getSecretValue(secretName)) || null
  if (secretValue != null && secretValue[key] != null) {
    console.log(secretValue[key])
    return secretValue[key]
  }
  return null
}

module.exports = getSecretKeyValue
