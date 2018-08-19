const https = require('https');

function getRepos(username, done) {
  const options = {
    hostname: 'api.github.com',
    path: `/users/${username}/repos`,
    headers: {
      'User-Agent': username
    }
  };

  https.get(options, response => {
    let body = '';

    response.setEncoding('utf-8');
    response.on('data', (data) => {
      body += data;
    });

    response.on('end', () => {
      const result = JSON.parse(body);

      done(null, result);
    });
  });
}

module.exports = {
  getRepos
};