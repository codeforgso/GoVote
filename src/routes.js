import App from './components/App';

const routes = {
  path: '',
  childRoutes: [
    {
      path: '/',
      component: App,
    },
    // {
    //   path: '/:jurisdiction/:topic',
    //   component: App,
    // },
    // {
    //   path: '/contact',
    //   component: Contact,
    // },
  ],
};

export { routes };
