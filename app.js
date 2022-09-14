const express = require(`express`);
const path = require(`path`);
const logger = require(`morgan`);
const wrap = require(`express-async-wrap`);
const _ = require(`lodash`);
const scrapbox = require(`./scrapbox.api`);

const sendError = function (res, error) {
  const err = error.response || error;
  let code = err.status || err.statusCode || (_.isNumber(err.code) ? err.code : null) || 500;
  code = code > 300 ? code : 500;
  let message = err.message || err.error || `Something goes wrong...`;
  if (!_.isEmpty(err.errors)) {
      const first = _.first(err.errors);
      message = first.message || `Something goes wrong...`;
  }
  res.status(code);
  res.json({code, message});
};

const promiseToResponse = (res, promise) => {
  promise
    .then((r) => res.json(r))
    .catch((err) => {
      sendError(res, err);
    });
};

const app = express();
app.use(logger(`dev`));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get(`/logo`, (req, res) => res.sendFile(path.resolve(__dirname, `logo.svg`)));

const appConfig = require(`./config.app.json`);

app.get(`/`, (req, res) => res.json(appConfig));

app.post(`/validate`, wrap(async (req, res) => {
    const user = await scrapbox.validate(req.body.fields.sid);
    if(user.name){
      res.json({name: user.name})
    }else{
      res.json(user)
    }
}));

app.post(`/api/v1/synchronizer/config`, (req, res) => {
  if (_.isEmpty(req.body.account)) {
    throw new Error(`account should be provided`);
  }
  promiseToResponse(res, scrapbox.config(req.body));
});
  
app.post(`/api/v1/synchronizer/schema`, (req, res) => {
  return promiseToResponse(res, scrapbox.schema(req.body))
});

app.post(`/api/v1/synchronizer/datalist`, wrap(async (req, res) => {
  const items = ['updated','created','accessed','linked','views','title','updatedbyMe'].map(e => {
    return {"title": e, "value": e}
  });
  return res.json({items});
}));

app.post(`/api/v1/synchronizer/data`, wrap(async (req, res) => {
  let result = await scrapbox.getPages(req.body);
  return res.json(result);
}));

app.post('/api/v1/synchronizer/filter/validate', (req, res) => {
  return res.json({"status": "ok"});
});

app.use(function (req, res, next) {
    const error = new Error(`Not found`);
    error.status = 404;
    next(error);
});

app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    console.log(err);
    res.json({message: err.message, code: err.status || 500});
});

module.exports = app;
