const mandatory = ['Location name']
const Address = ['Full address','Postcode']
const coords = ['X coordinates','Y coordinates']

// if X and Y ignore address and use X and Y
// if not X and Y, must contain Adress and Postcode, use this and calculate X and Y
// else reject 