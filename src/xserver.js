/* eslint no-console: 0 */
import React from 'react';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import express from 'express';
import handlebars from 'express-handlebars';
import path from 'path';
import { compose, mainCompose } from './server/compose';
import { routes } from './routes';
import configureStore from './store/configureStore';

import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpackConfig from '../webpack.config'

const app = express();
require('node-jsx').install();

app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, '/views'));

app.set('port', (process.env.PORT || 3001));

// Use this middleware to set up hot module reloading via webpack.
const compiler = webpack(webpackConfig)
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: webpackConfig.output.publicPath }))
app.use(webpackHotMiddleware(compiler))

// Express only serve static assets in production.
if (true || process.env.NODE_ENV === 'production') { // eslint-disable-line no-constant-condition
  app.use(express.static(path.join(__dirname, '/static')));
}

// app.get('/api/main', (req, res) => {
//   mainCompose((mainContent) => {
//     console.log(mainContent);
//     res.send(mainContent);
//   });
// });

// app.get('/api/:jurisdiction/:topic', (req, res) => {
//   compose(req.params.jurisdiction, req.params.topic, (content) => {
//     // Content is an object of the form:
//     // {
//     //   config: {Merge of all the config files} ,
//     //   common: {All the common topic info},
//     //   jurisdiction: {All the topic info for the specified jurisdiction (county)}
//     // }
//     res.send(content);
//   });
// });

app.get('*', (req, res) => {
  // routes is our object of React routes defined above
  match({ routes, location: req.url }, (err, redirectLocation, props) => {
    if (err) {
      // something went badly wrong, so 500 with a message
      res.status(500).send(err.message);
    } else if (redirectLocation) {
      // we matched a ReactRouter redirect, so redirect from the server
      console.log('***Redirect***');
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    }
    // else if (props) {
    //   if (props.params.jurisdiction && props.params.topic) {
    //     compose(props.params.jurisdiction, props.params.topic, (content) => {
    //       const preloadedState = { content };
    //       preloadedState.stringify = JSON.stringify(preloadedState);
    //
    //       const store = configureStore(preloadedState);
    //
    //       const markup = renderToString(
    //         <Provider store={store}>
    //           <RouterContext {...content}/>
    //         </Provider>
    //       );
    //       // render `/view/main.handlebars`, but pass in the markup we want it to display
    //       res.render('main', {
    //                             app: markup,
    //                             preloadedState: preloadedState
    //                           });
    //     });
    //   }
    //   else {
    //     // TODO: Include and call mainCompose from compose.js to handle home and contact us routes.
    //     // globalCompose(props.location.pathname, (content) => {
    //       // const preloadedState = { content };
    //     mainCompose((content) => {
    //       const preloadedState = { content };
    //       preloadedState.stringify = JSON.stringify(preloadedState);
    //
    //       const store = configureStore(preloadedState);
    //
    //     const markup = renderToString(
    //       <Provider store={store}>
    //         <RouterContext {...content} />
    //       </Provider>
    //     );
    //     // render `/view/main.handlebars`, but pass in the markup we want it to display
    //     res.render('main', {
    //                           app: markup,
    //                           preloadedState: preloadedState
    //                         });
    //     });
    //   }
    // }
    else {
      // no route match, so 404. In a real app you might render a custom
      // 404 view here
      console.log(`***404 - ${req.url} ***`);
      res.sendStatus(404);
    }
  });
});

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`);
});
