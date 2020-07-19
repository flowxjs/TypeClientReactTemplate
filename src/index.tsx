import './index.css';
import React from 'react';
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

app.on('Application.onError', (err, ctx) => <p>Error: {err.message}</p>);
app.on('Application.onNotFound', (req) => <p>Not Found: {req.pathname}</p>);

bootstrp();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
