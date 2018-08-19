const github = require('./github');

const username = process.argv[2]; //Username have to be passed as second argument

github.getRepos(username, (error, repos = []) => {
  if (error) console.error(`Ошибка: ${error.message}`);

repos.forEach(repo => console.log(repo.name));
});
