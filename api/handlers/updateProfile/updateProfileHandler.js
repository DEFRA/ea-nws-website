async function getUpdateProfile(context, req) {
  console.log('payload', req.payload)
  return { test: 'works' }
}

module.exports = { getUpdateProfile }
