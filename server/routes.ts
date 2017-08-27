import * as express from 'express';

import MarkerCtrl from './controllers/marker';
import UserCtrl from './controllers/user';
import Marker from './models/marker';
import User from './models/user';

export default function setRoutes(app) {

  const router = express.Router();

  const markerCtrl = new MarkerCtrl();
  const userCtrl = new UserCtrl();

  router.route('/map/markers').get(markerCtrl.getAll);
  router.route('/map/markers/count').get(markerCtrl.count);
  router.route('/map/marker').post(markerCtrl.insert);
  router.route('/map/marker/:id').get(markerCtrl.getAll);
  router.route('/map/marker/:id').put(markerCtrl.update);
  router.route('/map/marker/:id').delete(markerCtrl.delete);

  // Users
  router.route('/login').post(userCtrl.login);
  router.route('/users').get(userCtrl.getAll);
  router.route('/users/count').get(userCtrl.count);
  router.route('/user').post(userCtrl.insert);
  router.route('/user/:id').get(userCtrl.get);
  router.route('/user/:id').put(userCtrl.update);
  router.route('/user/:id').delete(userCtrl.delete);

  // Apply the routes to our application with the prefix /api
  app.use('/api', router);

}
