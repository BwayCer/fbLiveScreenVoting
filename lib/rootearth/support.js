/**
 * 爪哇腳本語言支援補充 Support
 *
 * @file
 * @author 張本微
 * @license CC-BY-4.0
 * @see [個人網站]{@link http://bwaycer.github.io}
 */


/*! jzTree/support - BwayCer CC-BY-4.0 @license: bwaycer.github.io/license/CC-BY-4.0 */
define( 'jzTree/support', function ( log ) {
    "use strict";

    /**
     * 爪哇腳本語言支援補充
     * @module support
     */

    // Object.emptyEnum
    void function () {
         // 空枚舉： 創建一個「乾淨」的空物件陣列。
         // 其運用實例實作比調用 ` Object.create( null ) ` 更有效率。（測試於 v8 v4.9）
         Object.emptyEnum = function emptyEnum( objArgu ) {
             if ( !objArgu ) return;
             var key;
             for ( key in objArgu ) this[ key ] = objArgu[ key ];
         };
         Object.emptyEnum.prototype = Object.create( null );
    }();

    // Object.extend
    void function () {
        var _emptyEnum = Object.emptyEnum;

        /***
         * 擴展： 不限於繼承（inherit）的擴展。
         *
         * @param {*} main - 物件對象。
         * @param {Object} propList - 補充的屬性清單。
         */
        Object.extend = function extend( anyMain, anyChoA, anyChoB ) {
            var key, val;
            if ( typeof anyChoA === 'string' ) _defineProperty( anyMain, anyChoA, anyChoB );
            else for ( key in anyChoA ) _defineProperty( anyMain, key, anyChoA[ key ] );
        };

        function _defineProperty( anyMain, strPropName, anyPropVal ) {
            var anyValType = _classifyVal( anyPropVal );
            var descriptor = new _emptyEnum();

            switch( anyValType ){
                case 'setter':
                    descriptor.set = anyPropVal.set;
                    break;
                case 'getter':
                    descriptor.set = anyPropVal.get;
                    break;
                case 'both':
                    descriptor.set = anyPropVal.set;
                    descriptor.set = anyPropVal.get;
                    break;
                default:
                    descriptor.value = anyPropVal;
                    descriptor.writable = true;
            }
            descriptor.enumerable = false; // 不可枚舉
            descriptor.configurable = true;

            Object.defineProperty( anyMain, strPropName, descriptor );
        }

        /***
         * 分類屬性值。
         *
         * @param {*} propVal - 屬性值。
         * @return {?String} valType
         * <br>
         * * `null`： 使用者賦值。
         * <br>
         * * `setter`： `setter` 類型。
         * <br>
         * * `getter`： `getter` 類型。
         * <br>
         * * `both`： `setter` 和 `getter` 類型。
         */
        function _classifyVal( anyPropVal ) {
            var len, isHasSetter, isHasGetter;
            var anyAns = null;

            if( anyPropVal.constructor === Object ){
                len = Object.keys( anyPropVal ).length;
                isHasSetter = anyPropVal.hasOwnProperty( 'set' );
                isHasGetter = anyPropVal.hasOwnProperty( 'get' );

                if( len === 2 && isHasSetter && isHasGetter ) anyAns = 'both';
                else if( len === 1 && isHasSetter ) anyAns = 'setter';
                else if( len === 1 && isHasGetter ) anyAns = 'getter';
            }

            return anyAns;
        }
    }();


    /**
     * 支持
     * <br>
     * 有錯誤時將直接拋錯而非經過 `jzTree/log`。
     *
     * @memberof module:support.
     * @class support
     */
    function support(){
        /**
         * 檢查： 檢查屬性存在與否。
         *
         * @memberof module:support.support.
         * @func check
         * @param {*} main - 檢查之物件。
         * @param {String} propName - 檢查的屬性名。
         * @param {(String|Function)} noPropCho - 無屬性時選用。 見 {@link this.check.actOnNoProp}。
         */
        this.check = function check( anyMain, strPropName, anyNoPropCho ) {
            var isExistProp = this.isExistProp( anyMain, strPropName );
            if( !isExistProp ) this.actOnNoProp( anyNoPropCho, anyMain, strPropName );
        };


        /**
         * 檢查屬性。
         *
         * @memberof module:support.support.
         * @func checkProp
         * @param {...Array} checkInfo - 檢查之資訊。
         * @param {*} checkInfo.0 - 檢查之物件。
         * @param {...String} checkInfo.property - 檢查的屬性名。
         * @param {(String|Function)} noPropCho - 無屬性時選用。 見 {@link this.check.actOnNoProp}。
         * @return {module:support.support}
         *
         * @example
         * support
         *     .checkProp(
         *         [ Object, 'defineProperty' ],
         *         'JS Run Platform Not Support. ( %main.%method )'
         *     )
         *     .checkProp(
         *         [ String.prototype, 'replace' ],
         *         [ Array, 'transClone' ],
         *         [ Array.prototype, 'map', 'qSplice' ],
         *         [ Object, 'extend' ],
         *         [ Function.prototype, 'extend' ],
         *         '基礎應用不支持。'
         *     )
         * ;
         */
        this.checkProp = function checkProp() {
            var anyMain, arrCheckInfo;
            var p = 0;
            var lenOfArgs = arguments.length;
            var anyNoPropCho = arguments[ --lenOfArgs ];

            while ( p < lenOfArgs ) {
                arrCheckInfo = arguments[ p++ ];
                anyMain = arrCheckInfo.shift();
                this.sequenceActCheck( anyMain, arrCheckInfo, anyNoPropCho );
            }

            return this;
        };

        /**
         * 增加屬性。
         *
         * @memberof module:support.support.
         * @func addProp
         * @param {*} main - 檢查之物件。
         * @param {Object} propList - 補充的屬性清單
         * @return {module:support.support}
         */
        this.addProp = function addProp( anyMain, objPropList ) {
            this.sequenceActCheck( anyMain, Object.keys( objPropList ), function ( anyMain, strPropName ) {
                var propList = {};
                propList[ strPropName ] = objPropList[ strPropName ];
                Object.extend( anyMain, propList );
            } );
            return this;
        };

        /**
         * 客製化屬性。
         *
         * @memberof module:support.support.
         * @func customProp
         * @param {*} main - 檢查之物件。
         * @param {Object} propList - 補充的屬性清單
         * @return {module:support.support}
         */
        this.customProp = function customProp( anyMain, objPropList ) {
            this.sequenceActCheck( anyMain, Object.keys( objPropList ), function ( anyMain, strProperty ) {
                objPropList[ strProperty ]( anyMain, strProperty );
            } );
            return this;
        };
    }

    /**
     * 一連串的執行檢查。
     *
     * @memberof module:support.support.
     * @func sequenceActCheck
     * @param {*} main - 檢查之物件。
     * @param {Array} propertyList - 檢查的屬性名清單。
     * @param {(String|Function)} noPropCho - 無屬性時選用。 見 {@link this.check.actOnNoProp}。
     */
    support.prototype.sequenceActCheck = function sequenceActCheck( objMain, arrPropertyList, anyNoPropCho ) {
        var p = 0;
        var len = arrPropertyList.length;
        while ( p < len ) this.check( objMain, arrPropertyList[ p++ ], anyNoPropCho );
    };

    /**
     * 屬性是否存在。
     * <br>
     * 錯誤範例，以 `` 為例：
     * <br>
     * * 若以 `Element.prototype.parentNode` 直接執行會拋出 Illegal invocation 的錯誤。
     * <br>
     * * 若以 `Element.prototype.hasOwnProperty('parentNode')` 則會回傳 false 的判斷錯誤。
     *
     * @memberof module:support.support.
     * @func isExistProp
     * @param {*} main - 檢查之物件。
     * @param {String} propName - 檢查的屬性名。
     * @return {Boolean}
     */
    support.prototype.isExistProp = function isExistProp( objMain, strPropName ) {
        return strPropName in objMain;
    };

    /**
     * 屬性不存在時執行。
     *
     * @memberof module:support.support.actOnNoProp
     * @memberof module:support.support.
     * @func actOnNoProp
     * @param {(String|Function)} noPropCho - 無屬性時選用。
     * 若為 `String`： 拋出錯誤 throw Error( noPropCho )。
     * <br>
     * 可指定關鍵字：
     * * `%main`： `main.toString().replace( /\[(.+)\]/, '$1' ) )`。
     * * `%method`： 屬性名稱。
     * <br>
     * 若為 Function： 執行 `noPropCho( main, property )`。
     * @param {*} main - 檢查之物件。
     * @param {String} propName - 檢查的屬性名。
     * @return {Boolean}
     *
     * @example
     * // object Window 無 jzTree 屬性。
     * support.actOnNoProp( '%main 無 %method 屬性。', window, 'jzTree' );
     */
    support.prototype.actOnNoProp = function actOnNoProp( anyNoPropCho, objMain, strPropName ){
        switch ( typeof anyNoPropCho ) {
            case 'string':
                throw Error( anyNoPropCho
                    .replace( /%main/g, objMain.toString().replace( /\[(.+)\]/, '$1' ) )
                    .replace( /%method/g, strPropName )
                );
                break;
            case 'function':
                anyNoPropCho( objMain, strPropName );
                break;
        }
    };


    var insSupport = new support;

    insSupport
        .checkProp(
            [ Object, 'defineProperty' ],
            'JS Run Platform Not Support。（ %main.%method ）'
        )
        .addProp( String.prototype, {
            repeat: function repeat( numCount ){
                if( numCount < 0 ) throw RangeError('Invalid count value');
                numCount = parseInt( numCount );
                var strOrigTxt = this;
                var strAns = '';
                while ( numCount-- ) strAns += strOrigTxt;
                return strAns;
            },
        } )
        .addProp( Array, {
            transClone: function transClone( anyArguOfArray ) {
                var p;
                var len = anyArguOfArray.length;
                var newList = new Array( len );
                for ( p = 0; p < len ; p++ ) newList[ p ] = anyArguOfArray[ p ];
                return newList;
            },
        } )
        .addProp( Array.prototype, {
            map: function map( fnCallback ){
                var p, len;
                for ( p = 0, len = this.length; p < len ; p++ ) fnCallback( this[ p ], p, this );
            },
            qSplice: function qSplice( numStart, numNum ) {
                var p, newStart, newEnd, newLen, newList;
                var len = this.length;
                var isAllowTypeArgu1 = ( typeof numStart === 'number' && 0 <= numStart && numStart < len );
                var isAllowTypeArgu2 = ( typeof numNum === 'number' && 0 <= numNum );

                if ( isAllowTypeArgu1 && isAllowTypeArgu2 && numStart + numNum <= len ) {
                    newStart = numStart;
                    newEnd = numStart + numNum;
                    newLen = numNum;
                } else if ( isAllowTypeArgu1 ) {
                    newStart = numStart;
                    newEnd = len;
                    newLen = newEnd - newStart;
                } else return new Array( 0 );

                newList = new Array( newLen );
                for ( p = 0; newStart < newEnd ; p++, newStart++ ) newList[ p ] = this[ newStart ];
                return newList;
            },
        } )
        .addProp( Function.prototype, {
            extend: function extend( objPropList ) {
                Object.extend( this.prototype, objPropList );
                return this;
            },
        } )
    ;

    return insSupport;
} );

