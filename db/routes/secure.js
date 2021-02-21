const express = require('express');
const asyncMiddleware = require('../middleware/asyncMiddleware');
const UserModel = require('../models/userModel');
 
const router = express.Router();

var internalAccessCodes = ["00000000", "00000001", "00000002", "00000003", "00000004", "00000005", "00000006", "00000007", "00000008", "00000009", "00000010", "00000011", "00000012", "00000013",];
 
router.post('/submit-score', asyncMiddleware(async (req, res, next) => {
  const { accessCode, score } = req.body;
  if(!internalAccessCodes.includes(accessCode)) {
  	await UserModel.updateOne({ accessCode }, { "$set": { highScore: score, used: true }});
  } else {
  	await UserModel.updateOne({ accessCode }, { "$set": { highScore: score, used: false }});
  }
  
  res.status(200).json({ status: 'ok' });
}));
 
router.get('/scores', asyncMiddleware(async (req, res, next) => {
  const users = await UserModel.find({}, 'name highScore -_id').sort({ highScore: -1}).limit(10);
  res.status(200).json(users);
}));
 
module.exports = router;