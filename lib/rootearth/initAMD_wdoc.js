/**
 * 初始化異步模組定義 initAMD
 * <br>
 * （補充包）
 *
 * @file
 * @author 張本微
 * @license CC-BY-4.0
 * @see [個人網站]{@link http://bwaycer.github.io}
 */

"use strict";


/*! jzTree/initAMD - BwayCer CC-BY-4.0 @license: bwaycer.github.io/license/CC-BY-4.0 */

/**
 * 初始化異步模組定義
 * @module initAMD
 */

void function ( fnGetParseDefineArgs, fnGetSimpleDefine, fnExport ) {
    // var initAMD, insInitAMD;
    var _parseDefineArgs = fnGetParseDefineArgs();
    var rootearth = {};
    var define = fnGetSimpleDefine( rootearth, _parseDefineArgs );

    window.define = define;
}(
function () {
    function _whatType( anyChoA ){
        return !anyChoA ? null : anyChoA.constructor;
    }

    /**
     * 解析定義參數。
     *
     * @memberof module:initAMD~
     * @func _parseDefineArgs
     * @param {Number} lenOfDefineArgs - 定義函式所接受到的參數長度。
     * @param {String} [filePath] - 模組識別碼。
     * @param {Array} [dependencies] - 依賴模組。
     * @param {*} factory - 模組物件。
     * 若 `dependencies` 有參考的依賴模組，則 `factory` 為 `Function` 型別；
     * 反之則任意型別。
     */
    function _parseDefineArgs( lenOfDefineArgs ) {
        var isNotAllowed = true;
        var filePath = null;
        var dependencies = null;
        var factory;
        var typeofArgu0;
        var argu0IsString, argu1IsArray, argu2IsFunc;

        switch( lenOfDefineArgs ){
            case 1:
                isNotAllowed = false;
                factory = arguments[ 1 ];
                break;
            case 2:
                typeofArgu0 = _whatType( arguments[ 1 ] );
                factory = arguments[ 2 ];
                if( typeofArgu0 === String ){
                    isNotAllowed = false;
                    filePath = arguments[ 1 ];
                }else if( typeofArgu0 === Array && typeof factory === 'function' ){
                    isNotAllowed = false;
                    dependencies = arguments[ 1 ];
                }
                break;
            case 3:
                argu0IsString = typeof arguments[ 1 ] === 'string';
                argu1IsArray = _whatType( arguments[ 2 ] ) === Array;
                argu2IsFunc = typeof arguments[ 3 ] === 'function';
                if( argu0IsString && argu1IsArray && argu2IsFunc ){
                    isNotAllowed = false;
                    filePath = arguments[ 1 ];
                    dependencies = arguments[ 2 ];
                    factory = arguments[ 3 ];
                }
                break;
        }

        if( isNotAllowed ) throw TypeError('The arguments type of define function is not allowed.');

        return [ filePath, dependencies, factory ];
    }

    return _parseDefineArgs;
},
function ( cache, _parseDefineArgs ) {
    function defaultId() {
        return 'module_r' + Math.random().toString().substr( -7 );
    }

    function simpleDefine( strId, arrDeps, fnExport ) {
        var anyModule;
        var p, len, val, arrDepArgs;
        var arrDefineArgs = _parseDefineArgs( arguments.length, strId, arrDeps, fnExport );

        strId = arrDefineArgs[ 0 ] || defaultId();
        arrDeps = arrDefineArgs[ 1 ];
        fnExport = arrDefineArgs[ 2 ];

        if ( typeof fnExport !== 'function' ) anyModule = fnExport;
        else {
            len = !arrDeps ? 0 : arrDeps.length;
            if ( len > 0 ) {
                arrDepArgs = [];
                for ( p = 0; p < len ; p++ ) {
                    val = arrDeps[ p ];
                    if ( val in cache ) arrDepArgs.push( cache[ val ] );
                    else throw Error( 'Not Found: ' +  val );
                }
                anyModule = fnExport.apply( null, arrDepArgs );
            } else {
                anyModule = fnExport.call( null );
            }
        }

        cache[ strId ] = anyModule;
    }

    return simpleDefine;
}
);


