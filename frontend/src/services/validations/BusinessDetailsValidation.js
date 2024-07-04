const businessDetailsValidation = (businessName, jobTitle) => {    
    const businessNameLength = 50
    const jobTitleLength = 50
    const validationErrorBusiness = (businessName.length > businessNameLength) 
    ? 'Business name must be '+businessNameLength+' charaters or fewer'
    : ''
    const validationErrorJob = (jobTitle.length > jobTitleLength) 
    ? 'Job title must be '+jobTitleLength+' charaters or fewer'
    : ''

    return {validationErrorBusiness, validationErrorJob}
  }
  
  module.exports = { businessDetailsValidation }
  