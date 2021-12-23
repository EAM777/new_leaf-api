import mongoose from 'mongoose';
import { Router } from 'express';
import Account from '../model/account';
import FlwrRooms from '../model/facilityModel/flowerRooms';
import bodyParser from 'body-parser';
import passport from 'passport';
import config from '../config';

import { generatedAccessToken, respond, authenticate } from '../middleware/authMiddleware';

export default ({ config, db }) => {
  let api = Router();

  // '/v1/account'
  api.post('/register', (req, res) => { // integrate register user with create new facility function.
    Account.register(new Account({
      username: req.body.username
    }), req.body.password, function(err, accounts) {
      if (err) {
        res.send(err);

      }
      passport.authenticate(
        'local', {
          session: false
        })(req, res, () => {
          res.status(200).send('Successfully created new account')
      });
    });
  });

  // '/v1/account/login'
  api.post('/login', passport.authenticate(
    'local', {
      session: false,
      scope: []
    }), generatedAccessToken, respond);

  api.get('/', (req, res) => {
    Account.find({},(err, accounts) => {
      if (err) {
        res.send(err);
      }
      res.json(accounts)
    })
  })

api.get('/me', authenticate, (req, res) => {
  Account.find({},(err, account) => {
  //  res.status(200).json(req.user);
    if (err) {
     res.send(err);
    }
    res.status(200).json([req.user])
  })
});

api.get('/user', authenticate, (req, res) => {
  Account.find({}, (err, account) => {
    //  res.status(200).json(req.user);
    if (err) {
      res.send(err);
    }
    res.status(200) //.json(req.user.id)
    console.log("logged in userID:")
    console.log(req.user.id)
    console.log("ARRAY of USERS")
    console.log(account)
  });
  Account.findById(req.user.id, (err, account) => {
    if (err) {
      res.send(err);
    }
    res.json([account])
    console.log("retrieved logged in user:")
    console.log([account])
  });
});

// '/v1/account' - read
api.get('/:id', (req, res) => {
  Account.findById(req.params.id,(err, account) => {
    if (err) {
      res.send(err);
    }
    res.json([account])
  });
});

api.put('/:id', authenticate, (req, res) => {
  Account.findById(req.params.id, (err, accounts) => {
    if (err) {
      res.send(err);
    }
    accounts.facilityName = req.body.facilityName;
    accounts.save(err => {
      if (err) {
        res.send(err);
      }
      res.json({
        message: "Facility Name Updated"
      });
    });
  });
});

  // '/v1/account/logout'

api.get('/logout', authenticate, (req, res) => {
  req.logout();
  res.status(200).send('Successfully logged out');
});

api.post('/flowerRooms/add/:id', authenticate, (req, res) => {
  Account.findById(req.params.id, (err, accounts) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    if (accounts === null) {
      res.status(404).send("Account Not Found");
      return;
    }
    let newFlowerRoom = new FlwrRooms();
    newFlowerRoom.roomName = req.body.roomName;
    newFlowerRoom.accounts = accounts._id;
    newFlowerRoom.save((err, flowerRooms) => {
      if (err) {
        res.send(err);
      }
      accounts.flowerRooms.push(newFlowerRoom);
      accounts.save(err => {
        if (err) {
          res.send(err);
        }
        res.json({
          message: 'FLOWER ROOM saved Successfully'
        });
        console.log("Flower ROOM SAVED");
      });
    });
  });
});

api.get('/getRoom/:id',  (req, res) => {
  FlwrRooms.find({ accounts: req.params.id },(err, flowerRooms) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    if (flowerRooms === null) {
      res.status(404).send("Flower Room Not Found");
      return;
    }
  //  console.log([flowerRooms.flowerRooms])
  //  console.log(flowerRooms.username)
//    console.log(flowerRooms.id)
//    console.log(flowerRooms.__v)
    console.log("getRoom API CALL:")
    console.log(req.params.id)
    console.log(flowerRooms)
    res.json(flowerRooms)

  });
});




  return api;
}
