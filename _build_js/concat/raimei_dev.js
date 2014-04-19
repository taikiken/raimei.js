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
 */
var RAIMEI = {};

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

}( window ) );
/**
 * license inazumatv.com
 * author (at)taikiken / http://inazumatv.com
 * date 2014/04/19 - 17:09
 *
 * Copyright (c) 2011-2014 inazumatv.com, inc.
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 */
( function ( window ){
    "use strict";
    var RAIMEI = window.RAIMEI;

    RAIMEI.Detector = ( function (){
        /**
         * @class Detector
         * @constructor
         */
        function Detector () {
            throw new Error( "can't create instance" );
        }

        /**
         * @method detects
         * @returns {boolean}
         * @static
         */
        Detector.detects = function () {
            return !!window.AudioContext;
        };

        return Detector;
    }() );

}( window ) );
/**
 * license inazumatv.com
 * author (at)taikiken / http://inazumatv.com
 * date 2014/04/19 - 17:09
 *
 * Copyright (c) 2011-2014 inazumatv.com, inc.
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 */
( function ( RAIMEI ){
    "use strict";

    RAIMEI.EventDispatcher = function () {
        /**
         * @class EventDispatcher
         * @constructor
         */
        function EventDispatcher () {
            this._listeners = {};
        }

        var p = EventDispatcher.prototype;

        p.constructor = RAIMEI.EventDispatcher;

        /**
         * @method addEventListener
         * @param {String} type event type
         * @param {Function} listener Event Handler
         */
        p.addEventListener = function ( type, listener ) {

            if ( typeof this._listeners === "undefined" ) {

                this._listeners = {};
            }

            var listeners = this._listeners;

            if ( typeof listeners[ type ] === "undefined" ) {

                listeners[ type ] = [];
            }

            if ( listeners[ type ].indexOf( listener ) === -1 ) {

                listeners[ type ].push( listener );
            }
        };

        /**
         * @method hasEventListener
         * @param {String} type event type
         * @param {Function} listener Event Handler
         * @returns {boolean}
         */
        p.hasEventListener = function ( type, listener ) {

            var listeners = this._listeners;

            if ( typeof listeners === "undefined" ) {

                return false;
            } else if ( typeof listener[ type ] !== "undefined" && listeners[ type ].indexOf( listener ) !== -1 ) {

                return true;
            }

            return false;
        };

        p.removeEventListener = function ( type, listener ) {
            if ( typeof this._listeners === "undefined" ) {

                return;
            }

            var listeners = this._listeners,
                listeners_types = listeners[ type ],
                index;

            if ( typeof listeners_types !== "undefined" ) {

                index = listeners_types.indexOf( listener );

                if ( index !== -1 ) {

                    listeners_types.splice( index, 1 );
                }
            }
        };

        /**
         * @method dispatchEvent
         * @param {Object} event require event.type:String
         */
        p.dispatchEvent = function ( event ) {
            var listeners = this._listeners,
                listeners_types,
                i, limit;

            if ( typeof listeners === "undefined" || typeof event.type === "undefined" ) {

                return;
            }

            listeners_types = listeners[ event.type ];

            if ( typeof listeners_types !== "undefined" ) {

                event.target = this;

                for ( i = 0, limit = listeners_types.length; i < limit; i++ ) {

                    listeners_types[ i ].call( this, event );
                }
            }
        };

        /**
         * @method initialize
         * @param {Object} object
         * @static
         */
        EventDispatcher.initialize = function ( object ) {
            object.addEventListener = p.addEventListener;
            object.hasEventListener = p.hasEventListener;
            object.removeEventListener = p.removeEventListener;
            object.dispatchEvent = p.dispatchEvent;
        };

        return EventDispatcher;
    }();

}( window.RAIMEI ) );
/**
 * license inazumatv.com
 * author (at)taikiken / http://inazumatv.com
 * date 2014/04/19 - 17:45
 *
 * Copyright (c) 2011-2014 inazumatv.com, inc.
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 */
( function ( window ){
    "use strict";
    var RAIMEI = window.RAIMEI;

    RAIMEI.Context = ( function (){
        /**
         * @class Context
         * @constructor
         */
        function Context () {
            var context = new window.AudioContext();

            if ( !context.createGain ) {
                context.createGain = context.createGainNode;
            }
            if ( !context.createDelay ) {
                context.createDelay = context.createDelayNode;
            }
            if ( !context.createScriptProcessor ) {
                context.createScriptProcessor = context.createJavaScriptNode;
            }

            this._context = context;
        }

        var p = Context.prototype;

        /**
         * @method get
         * @returns {window.AudioContext} window.AudioContext instanceを返します
         */
        p.get = function () {
            return this._context;
        };

        return Context;
    }() );

}( window ) );
/**
 * license inazumatv.com
 * author (at)taikiken / http://inazumatv.com
 * date 2014/04/19 - 18:17
 *
 * Copyright (c) 2011-2014 inazumatv.com, inc.
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 * http://webaudioapi.com/samples/shared.js
 * modified by taikiken
 */
( function ( window ){
    "use strict";
    var RAIMEI = window.RAIMEI,
        EventDispatcher = RAIMEI.EventDispatcher
    ;

    RAIMEI.BufferLoader = ( function (){
        /**
         * @class BufferLoader
         * @param {AudioContext} context window.AudioContext instance
         * @param {String} url sound file path
         * @constructor
         */
        function BufferLoader ( context, url ) {
            this._context = context;
            this._url = url;
        }

        var p = BufferLoader.prototype;

        EventDispatcher.initialize( p );

        /**
         * @method load
         */
        p.load = function () {
            var context = this._context,
                url = this._url,
                _this = this,
                request;

            request = new XMLHttpRequest();
            request.open( "GET", url, true );
            request.responseType = "arraybuffer";
            request.onload = function () {

                context.decodeAudioData(
                    request.response,
                    function ( buffer ) {
                        if ( !buffer ) {
                            _this.dispatchEvent( { type: "error", error: new Error( "error decoding file data: " + url ), currentTarget: request } );
                            return;
                        }
                        // success
                        _this.dispatchEvent( { type: "load", buffer: buffer, context: context, currentTarget: request } );
                    },
                    function ( error ) {
                        // error
                        _this.dispatchEvent( { type: "error", error: new Error( "decode error: " + url + ", error: " + error ), currentTarget: request } );
                    }
                );
            };

            request.onerror = function () {
                _this.dispatchEvent( { type: "error", error: new Error( "file not found: " + url ), currentTarget: request } );

            };

            request.send( null );
        };

        return BufferLoader;
    }() );

}( window ) );
/**
 * license inazumatv.com
 * author (at)taikiken / http://inazumatv.com
 * date 2014/04/19 - 19:21
 *
 * Copyright (c) 2011-2014 inazumatv.com, inc.
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 */
( function ( window ){
    "use strict";
    var RAIMEI = window.RAIMEI;

    RAIMEI.PlaySoundWithBuffer = ( function (){
        /**
         * @class PlaySoundWithBuffer
         * @param {AudioContext} context window.AudioContext instance
         * @param {AudioBuffer} buffer AudioBuffer instance
         * @param {Number} [start_time] start time optional, default is 0
         * @constructor
         */
        function PlaySoundWithBuffer ( context, buffer, start_time ) {
            if ( !RAIMEI.isNumeric( start_time ) ) {
                start_time = 0;
            }

            this._context = context;
            this._buffer = buffer;
            this._start_time = start_time;
        }

        var p = PlaySoundWithBuffer.prototype;

        /**
         *
         * @method start
         */
        p.start = function () {
            this.play( this._start_time );
        };

        /**
         * @method play
         * @param {Number} time
         */
        p.play = function ( time ) {
            var source = this._createSource( this._context, this._buffer );
            source.start( time );
        };

        /**
         * @method _createSource
         * @param {AudioContext} context window.AudioContext instance
         * @param {AudioBuffer} buffer AudioBuffer instance
         * @returns {*} AudioSourceを返します
         * @private
         */
        p._createSource = function ( context, buffer ) {
            var source = context.createBufferSource();
            source.buffer = buffer;
            source.connect( context.destination );

            source.start = source.start || source.noteOn;

            return source;
        };

        return PlaySoundWithBuffer;
    }() );

}( window ) );
