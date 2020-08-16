# Дипломный проект - 'NEWS-EXPLORER-API' Версия: 1.0.0

### Сервер обладает следующим функционалом: регистрация пользователей, авторизация, создание статей, их просмотр и удаление.

Чтобы развернуть проект у себя на ПК необходимо установить [Git](https://git-scm.com/), [Node.js с NPM](https://nodejs.org/en/)

В терминале Git Bush нужно выполнить следующие команды:
```
git clone https://github.com/zakVolz/news-explorer-backend.git # клонирует данный репозиторий
cd news-explorer-backend # переходим в папку репозитория
npm install # установит все зависимости из package.json
```

Сервер доступен по нескольким адресам:
- На публичном IP-адресе http://84.201.170.81/
- На домене http://api.news-explorer-project.tk/ и https://api.news-explorer-project.tk/

Запросы на сервер удобнее всего отправлять через [Postman](https://www.postman.com/downloads/)
```
На запрос POST /signup сервер создаст пользователя с переданными в теле email, password и name.

POST /signin проверит переданные в теле почту и пароль и выдаст JWT, сроком на 7 дней.

GET /users/me вернёт JSON-объект со профилем залогиненного пользователя.

GET /articles вернёт JSON-объект со всеми статьями в базе данных.

POST /articles создаст новую статью с переданными в теле keyword, title, text, date, source, link и image.

DELETE /articles/articleId удалит статью по введённому ID.
```
