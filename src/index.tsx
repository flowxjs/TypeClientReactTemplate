import './index.css';
import React, { Fragment } from 'react';
import { bootstrp, usePopStateHistoryMode } from '@typeclient/core';
import { ReactApplication } from '@typeclient/react';
import { CustomController } from './custom/custom.controller';
import * as serviceWorker from './serviceWorker';

// use `popstate` model
usePopStateHistoryMode();

const app = new ReactApplication({
  el: document.getElementById('root'),
  prefix: '/'
});

export const Slot = app.createSlotter();

app.setController(CustomController);

app.onError((err, ctx?) => {
  return <Fragment>
    <h1>TypeClient Catch Error:</h1>
    { ctx ? <p>Path: {ctx.req.pathname}</p> : null }
    <p><strong>Message</strong></p>
    <pre>{err.stack}</pre>
  </Fragment>
});

app.onNotFound(req => {
  return <Fragment>
    <h1>Sorry, Page not found:</h1>
    <p>Path: {req.pathname}</p>
  </Fragment>
});

bootstrp();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
