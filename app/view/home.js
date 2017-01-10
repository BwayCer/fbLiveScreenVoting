
define( 'view/home',
[
    'jzTree/htm'
],
function ( htm ) {
    "use strict";

    var strAns = '<!DOCTYPE HTML>';

    strAns += htm.tag( function ( t ) {
        t( 'html',
            t( 'head',
                t( 'meta', { charset: 'utf-8' } ),
                t( 'title', '起床氣象站' )
            ),
            t( 'body',
                t( 'script', { src: '/js/jzTree/initAMD' } ),
                t( 'script', { src: '/js/jzTree/support' } ),
                t( 'script', { src: '/js/jzTree/log' } ),
                t( 'script', { src: '/js/jzTree/htm' } ),
                t( 'script', { src: '/js/my/view/home' } )
            )
        );
    } );

    return strAns;
}
);

