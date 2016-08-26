// required for accessing fh.db
var fh = require('fh-mbaas-api');
var _ = require('underscore');
var async = require('async');

module.exports = {
  bootstrapData: function () {
    // First we check to see if our collection is empty
    fh.db({
      act: "list",
      type: "assets"
    }, function(err, listResult){
      if(err){
        console.log(err, 'error listing');
      } else {
        if (!listResult.count) {
          // There is no data, so we need to populate it
          var assets = require('./assets.json');

          assets =  _.map(assets, function(assetName, index){
            return {
              key: index,
              value: assetName,
              selected: false
            };
          });

          /**
           * Creating Asset Entries For The Data Browser.
           */
          for (var i = 0; i < assets.length; i++){
            fh.db({
              act: "create",
              type: "assets",
              fields: assets[i]
            }, function(err, data){
              if(err){
                console.log(err, 'error creating');
              } else {
                console.log(data);
              }
            });
          }
        }
      }
    });
  }
};