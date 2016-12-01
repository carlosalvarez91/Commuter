module.exports = function (User) {





  User.updateBalance = function (ammount, userID, cb) {
    User.findById(userID, function (err, model) {
      console.log(model);
      if (err) {
        cb(err);
      } else {
        var newBalance = model.balance + ammount;
        if (newBalance < 0) {
          cb(new Error("Insuficient Balance"), newBalance);
        } else {
          model.updateAttributes({ balance: newBalance }, function (err) {
            cb(err, newBalance);
          })
        }
      }
    })
  }

  User.remoteMethod('updateBalance', {
    //issStatic:false,
    accepts: [{ arg: 'ammount', type: 'number' }, { arg: 'userID', type: 'number' },],
    returns: { arg: 'newBalance', type: 'number' }
  });

};
