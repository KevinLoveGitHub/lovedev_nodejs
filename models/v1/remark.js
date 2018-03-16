'use strict';

import mongoose from 'mongoose';
import remarkData from '../../initData/remark.js';
import chalk from 'chalk';

const Schema = mongoose.Schema;
const remarkSchema = new Schema({
    remarks: []
});

// remark 为表名
const Remark = mongoose.model('remark', remarkSchema);
Remark.findOne((err, data) => {
    console.log(chalk.green(data));
    if (!data) {
        console.log(chalk.green('添加数据'));
        Remark.create(remarkData);
    }
});

export default Remark;