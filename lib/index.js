"use strict";

require( './rootearth/initAMD' );

// orig
define( 'http', require( 'http' ) );
define( 'fs', require( 'fs' ) );
define( 'url', require( 'url' ) );
define( 'path', require( 'path' ) );


// jzTree
require( './pure/htm' );
require( '../app/view/home' );


// sever
define( 'sever/routeList', {
    '/favicon.ico':                  __dirname + '/../app/logo.ico',
    '/js/jzTree/initAMD':            __dirname + '/rootearth/initAMD_wdoc.js',
    '/js/jzTree/support':            __dirname + '/rootearth/support.js',
    '/js/jzTree/log':                __dirname + '/rootearth/log.js',
    '/js/jzTree/htm':                __dirname + '/pure/htm.js',
    '/js/my/view/home':              __dirname + '/../app/javascript/wdoc/home/index.js',
    '/image/logo.png':               __dirname + '/../app/image/logo.png',
    '/image/background.png':         __dirname + '/../app/image/background.png',
    '/image/emojis/like.png':        __dirname + '/../app/image/emojis/like.png',
    '/image/emojis/love.png':        __dirname + '/../app/image/emojis/love.png',
    '/image/emojis/haha.png':        __dirname + '/../app/image/emojis/haha.png',
    '/image/emojis/wow.png':         __dirname + '/../app/image/emojis/wow.png',
    '/image/emojis/sad.png':         __dirname + '/../app/image/emojis/sad.png',
    '/image/emojis/angry.png':       __dirname + '/../app/image/emojis/angry.png',
} );
require( './node/serverHome' );

