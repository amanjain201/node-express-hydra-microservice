var hydraExpress = require('hydra-express');
var hydra = hydraExpress.getHydra();
var config = require('./config.json');
//var serviceName = hydra.getServiceName();
//var instanceID = hydra.getInstanceID();
function onRegisterRoutes() {
  var express = hydraExpress.getExpress();
  var api = express.Router();
  
  api.get('/greeting', function(req, res) {
      console.log("Health:\n");
      console.log(hydra.getHealth());
      console.log("Services: \n");
//      console.log(hydra.matchRoute('/'));
      hydra.getServiceHealthAll().then(function(result){
          var a = result[0];
          console.log(a.health);
          console.log(a.log);
          console.log(a.presence);
      });
    res.send(
      `hello from ${hydra.getServiceName()} - ${hydra.getInstanceID()}`
    );
  });
  hydraExpress.registerRoutes({
    '': api
  });
}

hydraExpress.init(config, onRegisterRoutes);