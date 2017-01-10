
define( 'sever/home',
[
    'http', 'fs', 'url', 'path',
    'sever/routeList',
    'view/home'
],
function ( http, fs, url, path, routeList, viewHome ) {
    "use strict";

    var homeServer;
    var homeHOST = '0.0.0.0';
    var homePORT = 8081;

    homeServer = http.createServer( function( request, response ) {
        var filePath, filePathParse, fileStatus, readFile;
        var own = { request: request, response: response };
        own.urlParse = url.parse( request.url, true );
        own.url = decodeURIComponent( own.urlParse.pathname );

        console.log( own.url );

        if ( own.url === '/' ) {
            response.writeHead( 200, {
                'Content-Type': getMIME( '.html' ) + '; charset=UTF-8',
                'Accept-Ranges': 'bytes',
                'Content-Length': Buffer.from( viewHome, 'utf8' ).length,
            } );

            response.end( viewHome );
        }

        if( routeList.hasOwnProperty( own.url ) ) filePath = routeList[ own.url ]
        else return wdocStatus404( response );

        filePathParse = path.parse( filePath );
        fileStatus = fs.statSync( filePath );

        own.response.writeHead( 200, {
            'Content-Type': getMIME( filePathParse.ext.toLowerCase() ) + '; charset=UTF-8',
            'Accept-Ranges': 'bytes',
            'Content-Length': fileStatus.size,
        } );

        readFile = fs.createReadStream( filePath );
        readFile.pipe( own.response );
    } );

    homeServer.listen( homePORT, homeHOST, () => console.log( `首頁伺服器開啟於 http://${ homeHOST }:${ homePORT }/` ) );


    function wdocStatus404( response ){
        if( response.finished ) return;
        response.writeHead( 404 );
        response.end( '404' );
    }

    function getMIME( strExtname ){
        return getMIME.list[ strExtname ] || 'application/octet-stream';
    }

    getMIME.list = {
        '.html': 'text/html',
        '.ico': 'application/x-ico',
        '.jpg': 'image/jpeg',
        '.js': 'application/x-javascript',
        '.png': 'image/png',
    };
}
);

