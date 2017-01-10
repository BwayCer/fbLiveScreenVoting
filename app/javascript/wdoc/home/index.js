
define( 'my/home', [
    'jzTree/htm'
],
function ( htm ) {
    "use strict";

    var p;
    var docuBody = document.body;

    var helStyle = htm.tagStyle( {
        'html': {
            boxSizing: 'border-box',
            width: '100%',
            height: '100%',
            margin: '0',
            padding: '0',
            background: 'url("/image/background.png") no-repeat center fixed', /* YOUR BACKGROUND URL HERE */
            WebkitBackgroundSize: 'cover',
            backgroundSize: 'cover',
        },
        '*, *:before, *:after': {
            boxSizing: 'inherit',
        },
        'body': {
            margin: '0',
            fontFamily: '"Open Sans", sans-serif',
            color: '#333',
            width: '100%',
            height: '100%',
            background: 'rgba(0,0,0,0.3)',
        },
        'header': {
            textAlign: 'center',

            '.logo': {
                position: 'relative',
                margin: '100px auto 20px',
                width: '120px',
            },
        },
        'h1, h2': {
            textAlign: 'center',
            width: '100%',
            margin: '0',
            color: '#fff',
        },
        'h1': {
            fontSize: '50px',
            padding: '30px 0 10px 0',
        },
        'h2': {
            fontSize: '36px',
            padding: '10px 0 30px 0',
        },
        '.tc': {
            textAlign: 'center',
            fontSize: '3rem',
            fontWeight: 'bold',
        },
        '.wf': {
            width: '29.3%',
            float: 'left',
            margin: '30px 2%',
            border: 'solid 1px #eee',
            background: '#fff',
            borderRadius: '8px',
            position: 'relative',
            textAlign: 'center',

            'img.emoji':  {
                width: '34px',
                display: 'inline-block',
                marginRight: '20px',
            }
        },
    } );

    var markHel = {};
    var arrMain = htm.tag( markHel, function ( t ) {
        t.NodeList(
            t( 'header',
                // YOUR LOGO URL HERE
                t( 'img', { className: 'logo', src: '/image/logo.png' } ),
                // YOUR TITLE HERE
                t( 'h1', '起床氣象站' ),
                t( 'h2', '何不說說今天的起床心情？' )
            ),
            t( 'div', { className: 'tc wf' },
                t( 'img', { className: 'emoji', src: '/image/emojis/like.png' } ),
                t( 'span*giveLike' )
            ),
            t( 'div', { className: 'tc wf' },
                t( 'img', { className: 'emoji', src: '/image/emojis/love.png' } ),
                t( 'span*giveLove' )
            ),
            t( 'div', { className: 'tc wf' },
                t( 'img', { className: 'emoji', src: '/image/emojis/haha.png' } ),
                t( 'span*giveHaha' )
            ),
            t( 'div', { className: 'tc wf' },
                t( 'img', { className: 'emoji', src: '/image/emojis/wow.png' } ),
                t( 'span*giveWow' )
            ),
            t( 'div', { className: 'tc wf' },
                t( 'img', { className: 'emoji', src: '/image/emojis/sad.png' } ),
                t( 'span*giveSad' )
            ),
            t( 'div', { className: 'tc wf' },
                t( 'img', { className: 'emoji', src: '/image/emojis/angry.png' } ),
                t( 'span*giveAngry' )
            )
        );
    } );

    docuBody.appendChild( helStyle );
    for ( p in arrMain ) docuBody.appendChild( arrMain[ p ] );

    return markHel;
} );

