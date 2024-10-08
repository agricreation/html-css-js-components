import {Router} from 'express';
const userProfileRouter = Router()

import {
  getUserProfileInformations,
  getUserInformationsByName,
  getUserInformationsByNameFromDb,
  getprofileinfoprotect,
  getLikedComponents,
} from '../../controller/user_management/userProfile.controller.js';

import {authanticateJwtToken} from '../../middleware/Auth.js';
import {authenticatePublicApi} from '../../middleware/Auth.js';

userProfileRouter.post('/getuserprofileinfo', getUserProfileInformations);
userProfileRouter.get('/getprofileinfoprotect', authanticateJwtToken, getprofileinfoprotect );
userProfileRouter.post('/getprofileinfo', getUserInformationsByNameFromDb);
userProfileRouter.get('/liked', authanticateJwtToken, getLikedComponents);

export {userProfileRouter};
