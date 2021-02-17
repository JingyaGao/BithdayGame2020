const express = require('express');
const asyncMiddleware = require('../middleware/asyncMiddleware');
const UserModel = require('../models/userModel');
const passport = require('passport');
const jwt = require('jsonwebtoken');
 
const tokenList = {};
const router = express.Router();
 
router.get('/status', (req, res, next) => {
  res.status(200);
  res.json({ 'status': 'ok' });
});

router.post('/addCode', passport.authenticate('signup', { session: false }), async (req, res, next) => {
  res.status(200).json({ message: 'signup successful' });
});
 
router.post('/login', async (req, res, next) => {
  passport.authenticate('login', async (err, user, info) => {
    try {
      if (err || !user) {
        const error = new Error('An Error occured');
        return next(error);
      }
      req.login(user, { session: false }, async (error) => {
        if (error) return next(error);
        const body = {
          _id: user._id,
          accessCode: user.accessCode
        };
 
        const token = jwt.sign({ user: body }, 'top_secret', { expiresIn: 300 });
        const refreshToken = jwt.sign({ user: body }, 'top_secret_refresh', { expiresIn: 86400 });
 
        // store tokens in cookie
        res.cookie('jwt', token);
        res.cookie('refreshJwt', refreshToken);
 
        // store tokens in memory
        tokenList[refreshToken] = {
          token,
          refreshToken,
          accessCode: user.accessCode,
          _id: user._id
        };
 
        //Send back the token to the user
        return res.status(200).json({ token, refreshToken });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});
 
router.post('/token', (req, res) => {
  const { accessCode, refreshToken } = req.body;
 
  if ((refreshToken in tokenList) && (tokenList[refreshToken].accessCode === accessCode)) {
    const body = { accessCode, _id: tokenList[refreshToken]._id };
    const token = jwt.sign({ user: body }, 'top_secret', { expiresIn: 300 });
 
    // update jwt
    res.cookie('jwt', token);
    tokenList[refreshToken].token = token;
 
    res.status(200).json({ token });
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
});
 
router.post('/logout', (req, res) => {
  if (req.cookies) {
    const refreshToken = req.cookies['refreshJwt'];
    if (refreshToken in tokenList) delete tokenList[refreshToken]
    res.clearCookie('refreshJwt');
    res.clearCookie('jwt');
  }
 
  res.status(200).json({ message: 'logged out' });
});


// router.post('/addCode', asyncMiddleware( async (req, res, next) => {
//   const { accessCode, name } = req.body;
//   await UserModel.create({ accessCode, name });
//   res.status(200).json({ 'status': 'ok' });
// }));
 
// router.post('/login', asyncMiddleware(async (req, res, next) => {
//   const { accessCode, name } = req.body;
//   console.log("given credencials: " + req.body.accessCode + " " + req.body.name);
//   const user = await UserModel.findOne({ accessCode });
//   if (!user) {
//     res.status(401).json({ 'message': 'unauthenticated' });
//     return;
//   }
//   res.status(200).json({ 'status': 'ok' });
// }));
 
// router.post('/logout', (req, res, next) => {
//   res.status(200);
//   res.json({ 'status': 'ok' });
// });
 
// router.post('/token', (req, res, next) => {
//   res.status(200);
//   res.json({ 'status': 'ok' });
// });


 
module.exports = router;