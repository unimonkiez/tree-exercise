const fetch = require('node-fetch');

module.exports = () => {
  console.log('Fetching app-data...');
  return fetch('https://s3.amazonaws.com/structure.rollout.io/57b592198999c5593ed9ffe5')
  .then(res => {
    console.log('Done fetching app-data.');
    return res.json();
  });
};
