'use strict';

module.exports = function(req){
    let body = '';
    req.on('data',function(){
        body += data.toString();
    });
    req.on('end',function(){
       try{
        req.body = JSON.parse(req.body);
        callback(null, req.body);
       }catch(err){
           callbackify(err);
       };
    });
};