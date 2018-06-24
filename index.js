'use strict';
// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const stripe = require('stripe')('sk_test_U2AkcSoLt5TKfZ4hJRpstfHF');

exports.handler = (event, context, callback) => {
  const requestBody = JSON.parse(event.body);

  return stripe.charges.create({
    amount: requestBody.amount,
    currency: requestBody.currency,
    description: 'Serverless Stripe Test charge',
    source: requestBody.tokenId
  }).then((charge) => { // Success response
    const response = {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        message: `Charge processed succesfully!`,
        charge,
      }),
    };
    callback(null, response);
  })
  .catch((err) => { // Error response
    const response = {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        error: err.message,
      }),
    };
    callback(null, response);
  })
};