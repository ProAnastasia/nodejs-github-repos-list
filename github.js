const https = require('https');

function getRepos(username, done) {
  if (!username) return done(new Error('Необходимо указать имя пользователя'));

  const options = {
    hostname: 'api.github.com',
    path: `/users/${username}/repos`,
    headers: {
      'User-Agent': username
    }
  };

  const request = https.get(options, response => {
    let body = '';

    if (response.statusCode !== 200) return done(new Error(`Не удалось получить данные от сервера (${response.statusCode} ${response.statusMessage})`));

    response.setEncoding('utf-8');

    response.on('data', (data) => {
      body += data;
    });

    response.on('end', () => {
      try {
        const result = JSON.parse(body);

        done(null, result);
      } catch (error) {
        done (new Error(`Не удалось обработать данные (${error.message})`))
      }
    });
  });

  request.on('error', error => done(new Error(`Не удалось отправить запрос (${error.message})`)));
}

module.exports = {
  getRepos
};