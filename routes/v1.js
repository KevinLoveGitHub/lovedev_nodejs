'use strict';

import express from 'express'

import Remark from '../controller/v1/remark'

const router = express.Router();

router.get('/remarks', Remark.getRemarks);

export default router