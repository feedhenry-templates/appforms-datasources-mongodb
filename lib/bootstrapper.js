// required for accessing fh.db
var fh = require('fh-mbaas-api');

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
            console.log(listResult);
            if (!listResult.count) {
                // There is no data, so we need to populate it

                fh.db({
                  act: "create",
                  type: "assets",
                  fields: {
                        assets: require('./assets.json')
                    }
                }, function(err, data){
                  if(err){
                    console.log(err, 'error creating');
                  } else {
                    console.log(data);
                  }
                });
            }
          }
        });
    }
};
