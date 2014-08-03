/**
 * @license inazumatv.com
 * @author (at)taikiken / http://inazumatv.com
 * @date 2014/04/19 - 16:37
 *
 * Copyright (c) 2011-2014 inazumatv.com, inc.
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 * @module RAIMEI
 */
var RAIMEI = {
    version: "0.0.9"
};

// polyfill
( function ( window ){
    "use strict";

    var self = window.self;

    // console if detect
    self.console = self.console || {

        info: function () {},
        log: function () {},
        debug: function () {},
        warn: function () {},
        error: function () {}
    };

    if (!Date.now) {
        Date.now = function now() {
            return new Date().getTime();
        };
    }

    // requestAnimationFrame / cancelAnimationFrame
    // http://paulirish.com/2011/requestanimationframe-for-smart-animating/
    // http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
    ( function (){

        var lastTime = 0;
        var vendors = [ 'ms', 'moz', 'webkit', 'o' ];

        for ( var x = 0; x < vendors.length && !self.requestAnimationFrame; ++ x ) {

            self.requestAnimationFrame = self[ vendors[ x ] + 'RequestAnimationFrame' ];
            self.cancelAnimationFrame = self[ vendors[ x ] + 'CancelAnimationFrame' ] || self[ vendors[ x ] + 'CancelRequestAnimationFrame' ];
        }

        if ( self.requestAnimationFrame === undefined && self.setTimeout !== undefined ) {

            self.requestAnimationFrame = function ( callback ) {

                var currTime = Date.now(), timeToCall = Math.max( 0, 16 - ( currTime - lastTime ) );
                var id = self.setTimeout( function() { callback( currTime + timeToCall ); }, timeToCall );
                lastTime = currTime + timeToCall;
                return id;
            };

        }

        if( self.cancelAnimationFrame === undefined && self.clearTimeout !== undefined ) {

            self.cancelAnimationFrame = function ( id ) { self.clearTimeout( id ); };
        }
    }() );

    // Object.create
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create
    if ( !Object.create ) {
        Object.create = (function(){
            function F(){}

            return function(o){
                if (arguments.length !== 1) {
                    throw new Error('Object.create implementation only accepts one parameter.');
                }
                F.prototype = o;
                return new F();
            };
        })();
    }

    // Array.isArray
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray
    if( !Array.isArray ) {
        Array.isArray = function (vArg) {
            return Object.prototype.toString.call(vArg) === "[object Array]";
        };
    }

    // Array.indexOf
    // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf
    if ( !Array.prototype.indexOf ) {
        Array.prototype.indexOf = function (searchElement , fromIndex) {
            var i,
                pivot = (fromIndex) ? fromIndex : 0,
                length;

            if (!this) {
                throw new TypeError();
            }

            length = this.length;

            if (length === 0 || pivot >= length) {
                return -1;
            }

            if (pivot < 0) {
                pivot = length - Math.abs(pivot);
            }

            for (i = pivot; i < length; i++) {
                if (this[i] === searchElement) {
                    return i;
                }
            }
            return -1;
        };
    }

    // Array.forEach
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
    if (!Array.prototype.forEach) {
        Array.prototype.forEach = function (fn, scope) {
            var i, len;
            for (i = 0, len = this.length; i < len; ++i) {
                if (i in this) {
                    fn.call(scope, this[i], i, this);
                }
            }
        };
    }

    // Function.prototype.bind
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind
    if ( !Function.prototype.bind ) {
        Function.prototype.bind = function (oThis) {
            if (typeof this !== "function") {
                // closest thing possible to the ECMAScript 5 internal IsCallable function
                throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
            }

            var aArgs = Array.prototype.slice.call(arguments, 1),
                fToBind = this,
                fNOP = function () {},
                fBound = function () {
                    return fToBind.apply(this instanceof fNOP && oThis ? this : oThis, aArgs.concat(Array.prototype.slice.call(arguments)));
                };

            fNOP.prototype = this.prototype;
            fBound.prototype = new fNOP();

            return fBound;
        };
    }

    // String.trim
    String.prototype.trim = String.prototype.trim || function () {

        return this.replace( /^\s+|\s+$/g, '' );
    };

    // WebAudio context class
    window.AudioContext = window.AudioContext ||
        window.webkitAudioContext ||
        window.mozAudioContext ||
        window.oAudioContext ||
        window.msAudioContext;

}( window ) );

// core utilities
( function ( window ){
    "use strict";
    var RAIMEI = window.RAIMEI;

    // extend
    /**
     * Class継承に使用します
     * @for RAIMEI
     * @method extend
     * @param {Function} PARENT 親クラス
     * @param {Function} CHILD 子クラス
     */
    RAIMEI.extend = function ( PARENT, CHILD ){
        CHILD.prototype = Object.create( PARENT.prototype );
        CHILD.prototype.constructor = CHILD;
    };

    // Number check
    /**
     * 数値チェックを行います
     * @for RAIMEI
     * @method isNumeric
     * @param {*} obj Number
     * @returns {boolean} 数値か否かを返します
     */
    RAIMEI.isNumeric = function ( obj ){
        return !isNaN( parseFloat( obj ) ) && isFinite( obj );
    };

    // search max value in array
    /**
     * 配列内の最大値を取得します
     * @for RAIMEI
     * @method maxValue
     * @param {Array} arr
     * @returns {number} 配列内の最大値を返します
     */
    RAIMEI.maxValue = function ( arr ){
        return Math.max.apply( null, arr );
    };

    RAIMEI.startTime = function () {
        return 0;
    };

}( window ) );