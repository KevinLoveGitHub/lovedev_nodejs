'use strict';

import v1 from './v1';
import api from './api';


export default app => {
  app.use('/v1', v1);
  app.use('/api', api);
}
