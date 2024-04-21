// authRouter.js
const axios = require('axios');
const GitHubUser = require('../models/user.model');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const {jsonStatus, jsonStatusError, jsonStatusSuccess} = require('../operations/errorhandlingOperations');
const {getUserInformationsByName} = require('../controller/userProfile.controller');
const { response } = require('express');

const JWT_SECRET = process.env.JWT_ACCESS_TOKEN;
const TOKEN_EXPIRE_TIMEOUT = process.env.TOKEN_EXPIRE_TIMEOUT;

async function exchangeGitHubCodeForToken(code) {
  const client_id = process.env.GITHUB_CLIENT_ID;
  const client_secret = process.env.GITHUB_CLIENT_SECRET;
  const params = `?client_id=${client_id}&client_secret=${client_secret}&code=${code}`;
  try {
    const response = await axios.post(
      'https://github.com/login/oauth/access_token' + params,
      null,
      {
        headers: {
          Accept: 'application/json',
        },
      }
    );
    const { access_token } = response.data;
    if (!access_token) {
      console.error('GitHub OAuth code exchange failed. Response:', response.data);
      throw new Error('Bad Verifications Code Exchange');
    }
    return access_token;
  } catch (error) {
    throw error;
  }
}

async function getUserInformationsFromGitApi(githubAccessToken) {
  try {
    const userData = await axios.get('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${githubAccessToken}`,
      },
    });
    const userDataInfo = userData.data;
    return userDataInfo;
  } catch (error) {
    console.error('Error fetching GitHub user data:', error);
    throw error;
  }
}

const getUserInfoFromGit = async (req, res) => {
  const data = req.body;

  if (data) {
    try {
      const authKey = data.authKey;
      const userInfo = await getUserInformationsFromGitApi(authKey);
      const existingUser = await GitHubUser.findOne({ id: userInfo.id });

      if (existingUser) {
        return res.json(jsonStatusSuccess({ message: `Welcome Back ${userInfo.name}`, response: userInfo }));
      }

      const githubUser = new GitHubUser(userInfo);
      await githubUser.save();
      
      res.json(jsonStatusSuccess({ message: `Hi ! ${userInfo.name}`, response: userInfo }));
    } catch (error) {
      res.json(jsonStatusError({ response: userInfo, errorStatus: true, statusCode: 11000, message: error.message }));
    }
  } else {
    res.status(400).json({ error: 'Bad Request' });
  }
};

const signup_or_login_with_git = async (req,res)=>{

  // it will create a new account if account not already existis or creates a new account

  const { code } = req.body;
  
  try {
    // #TODO Upadate a auth token where authanticated by user 
    const githubAccessToken = await exchangeGitHubCodeForToken(code);

    const userInformations = await getUserInformationsFromGitApi(githubAccessToken);

    //get user profile info with github oauth 
    const gitUserId = userInformations.id;
    const existingUser = await GitHubUser.findOne({ id: gitUserId });

      // #TODO test if not an existing user (Test the app behaviour) and update the code (high priyority)
      if (!existingUser) {
        const githubUser = new GitHubUser(userInformations);
        await githubUser.save();
        const response ={ 
          "token": createTokens({user_id: githubUser._id, name: githubUser.name}),
          "user": githubUser,
          "components": []
        }
        return res.json(jsonStatusSuccess({ message: `New Account created ${githubUser.name}`, response: response }));
      }


    getUserInformationsByName(existingUser.name, async (error, userProfileWithComponents) => {
      if (error) {
          return res.status(500).send(`Internal Server Error ${error}`);
      } else {
        userProfileWithComponents['token'] = createTokens({user_id: existingUser._id, name: existingUser.name});
        return res.json(jsonStatusSuccess({ message: `Welcome Back ${existingUser.name}`, response: await userProfileWithComponents }));
      }
  });
    // req.session.githubAccessToken = await githubAccessToken;

  } catch (error) {
    console.error('Error during GitHub OAuth:', error);
    return res.json(jsonStatusError({message: error.message}))
  }
}

const createTokens = (user)=>{
   // Assume user is authenticated via GitHub and obtain user info
  //  const { userId, username } = req.body;

   // Create JWT token
   const token = jwt.sign({ user }, JWT_SECRET, { expiresIn: TOKEN_EXPIRE_TIMEOUT });
 
   // Set HTTPOnly cookie with JWT token
  //  res.cookie('jwt', token, { httpOnly: true, secure: true });
 
   return token;
}

const validateToken = (req,res)=>{

  const authHeader = req.headers['authorization'];
  console.log(req.headers);

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1];

  try {
      // Verify JWT token
      const decoded = jwt.verify(token, JWT_SECRET);
      console.log(decoded);

      // Access protected resource
      res.status(200).json({ message: 'Token validated', user: decoded });
  } catch (err) {
      // Token verification failed
      res.status(401).json({ message: 'Unauthorized' });
  }
}


module.exports = { exchangeGitHubCodeForToken , getUserInformationsFromGitApi, getUserInfoFromGit, createTokens, validateToken, signup_or_login_with_git};

