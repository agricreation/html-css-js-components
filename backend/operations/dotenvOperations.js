import path from 'path';
require('dotenv').config({ path: path.join(__dirname, '../.env') });


const getEnvFileInfo = secret => process.env[secret];

export {getEnvFileInfo};