# simple-sentiment-chat

### Deployed to Heroku
https://stark-reef-65359.herokuapp.com/

### Steps to deploy
```
heroku create
heroku buildpacks:set heroku/nodejs
git push heroku master
heroku open
```
### Database
dbUrl 
```
mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@ds133137.mlab.com:33137/${process.env.DB_USER}
```
