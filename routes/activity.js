'use strict';


exports.login = function( req, res ) {
    console.log( 'req.body: ', req.body ); 
    res.redirect( '/' );
};