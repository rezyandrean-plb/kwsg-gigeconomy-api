export default {
  routes: () => import('./routes/vendor'),
  controllers: () => import('./controllers/vendor'),
  services: () => import('./services/vendor'),
}; 