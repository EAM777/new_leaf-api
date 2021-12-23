'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _middleware = require('../middleware');

var _middleware2 = _interopRequireDefault(_middleware);

var _db = require('../db');

var _db2 = _interopRequireDefault(_db);

var _clone = require('../controller/facilityControl/flwrControl/farmControl/strainControl/cloneControl/clone');

var _clone2 = _interopRequireDefault(_clone);

var _strain = require('../controller/facilityControl/flwrControl/farmControl/strainControl/strain');

var _strain2 = _interopRequireDefault(_strain);

var _farm = require('../controller/facilityControl/flwrControl/farmControl/farm');

var _farm2 = _interopRequireDefault(_farm);

var _flowerRooms = require('../controller/facilityControl/flwrControl/flowerRooms');

var _flowerRooms2 = _interopRequireDefault(_flowerRooms);

var _account = require('../controller/account');

var _account2 = _interopRequireDefault(_account);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _express2.default)();

// connect to db
(0, _db2.default)(function (db) {

  // internal middle MIDDLEWARE
  router.use((0, _middleware2.default)({ config: _config2.default, db: db }));
  // api routes v1 (/v1)
  router.use('/account/flowerRooms/farms/strain/cloneData', (0, _clone2.default)({ config: _config2.default, db: db }));
  router.use('/account/flowerRooms/farms/strain', (0, _strain2.default)({ config: _config2.default, db: db }));
  router.use('/account/flowerRooms/farms', (0, _farm2.default)({ config: _config2.default, db: db }));
  router.use('/account/flowerRooms', (0, _flowerRooms2.default)({ config: _config2.default, db: db }));
  router.use('/account', (0, _account2.default)({ config: _config2.default, db: db }));
});

exports.default = router;
//# sourceMappingURL=index.js.map