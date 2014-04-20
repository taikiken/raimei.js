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

    RAIMEI.startTime = function () {
        return 0;
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
         * @returns {AudioContext} AudioContext を返します
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
         * @param {AudioContext} context AudioContext instance
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

            function disPose () {
                request.removeEventListener( "load", onLoad );
                request.removeEventListener( "error", onError );
            }

            function onLoad () {
                disPose();

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
            }

            function onError () {
                disPose();

                _this.dispatchEvent( { type: "error", error: new Error( "file not found: " + url ), currentTarget: request } );
            }

            request = new XMLHttpRequest();
            request.addEventListener( "load", onLoad, false );
            request.addEventListener( "error", onError, false );
            request.open( "GET", url, true );
            request.responseType = "arraybuffer";

            request.send( null );
        };

        return BufferLoader;
    }() );

}( window ) );
/**
 * license inazumatv.com
 * author (at)taikiken / http://inazumatv.com
 * date 2014/04/20 - 18:35
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

    RAIMEI.BufferSource = ( function (){
        /**
         * AudioBufferSourceNode を作成します
         * @class BufferSource
         * @param {AudioContext} context AudioContext instance
         * @param {AudioBuffer} buffer AudioBuffer instance
         * @constructor
         */
        function BufferSource ( context, buffer ) {
            var source = context.createBufferSource();

            source.buffer = buffer;
//            source.connect( context.destination );

            source.start = source.start || source.noteOn;
            source.stop = source.stop || source.noteOff;

            this._source = source;
        }
        
        var p = BufferSource.prototype;

        /**
         * @method getSource
         * @returns {AudioBufferSourceNode} AudioBufferSourceNodeを返します
         */
        p.getSource = function () {
            return this._source;
        };
        
        return BufferSource;
    }() );
    
}( window ) );
/**
 * license inazumatv.com
 * author (at)taikiken / http://inazumatv.com
 * date 2014/04/20 - 18:26
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

    RAIMEI.VolumeControl = ( function (){
        // @class VolumeControl
        function VolumeControl ( context, source ) {
            var gainNode = context.createGain();

            source.connect( gainNode );
            gainNode.connect( context.destination );

            this._gainNode = gainNode;
            this._gain = gainNode.gain;
        }

        var p = VolumeControl.prototype;

        /**
         * Volumeを変更します
         * @method volume
         * @param {number} val 0 ~ 1
         */
        p.volume = function ( val ) {
            console.log( "VolumeControl ", val );
            this._gain.value = this._normalize( val );
            console.log( "VolumeControl _gain", this._gain );
        };

        /**
         * @method getGainNode
         * @returns {GainNode} GainNodeを返します
         */
        p.getGainNode = function () {
            return this._gainNode;
        };

        /**
         * @method getGain
         * @returns {AudioParam} GainNode.gain を返します
         */
        p.getGain = function () {
            return this._gain;
        };

        /**
         * @method _normalize
         * @param val
         * @returns {*}
         * @protected
         */
        p._normalize = function ( val ) {
            // 0 to 1
            if ( val < 0 ) {
                val = 0;
            } else if ( val > 1 ) {
                val = 1;
            }

            return val;
        };

        return VolumeControl;
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
    var RAIMEI = window.RAIMEI,
        EventDispatcher = RAIMEI.EventDispatcher,
        isNumeric = RAIMEI.isNumeric;

    RAIMEI.PlaySoundWithBuffer = ( function (){
        /**
         * @class PlaySoundWithBuffer
         * @param {AudioContext} context window.AudioContext instance
         * @param {AudioBuffer} buffer AudioBuffer instance
         * @param {Boolean} [loop] loop option default is false
         * @constructor
         */
        function PlaySoundWithBuffer ( context, buffer, loop ) {
            this._context = context;
            this._buffer = buffer;
            this._loop = !!loop;

            this._offset = 0;
            this._boundEnded = this._onEnded.bind( this );
            this._duration = buffer.duration;
            this._pause = false;
        }

        var p = PlaySoundWithBuffer.prototype;

        EventDispatcher.initialize( p );

        /**
         * delay無しでサウンドを先頭から再生します
         * @method start
         */
        p.start = function () {
            this._offset = 0;
            this.play( 0, 0 );
        };

        /**
         * サウンド再生, delay and offset option を使用します
         * @method play
         * @param {Number} time delay second.
         * @param {Number} [offset] start offset second, default is 0.
         */
        p.play = function ( time, offset ) {
            if ( !isNumeric( offset ) ) {
                offset = 0;
            }

            this._pause = false;

            var source = this._createSource( this._context, this._buffer );
            source.loop = this._loop;
            source.addEventListener( "ended", this._boundEnded, false );
            source.onended = function () {
                // onendedに関数を設置しないとended eventが発火しない
            };
            source.start( this._context.currentTime + time, offset );
            this.dispatchEvent( { type: "start", duration: this._duration, delay: time, offset: offset, currentTarget: this._source } );
            this._source = source;
        };

        /**
         * 再生を止めEventを発火します
         * @method stop
         */
        p.stop = function () {
            this._stop();
            this.dispatchEvent( { type: "stop", currentTarget: this._source } );
        };

        /**
         * 一時停止します
         * @method pause
         */
        p.pause = function () {
            var offset = this._context.currentTime % this._duration;

            this._dispose();
            this._stop();
            this._pause = true;
            this._offset = offset;
            this.dispatchEvent( { type: "pause", offset: offset, currentTarget: this._source } );
        };

        /**
         * 再生再開します
         * @method resume
         */
        p.resume = function () {
            this._pause = false;
            this.play( 0, this._offset );
            this.dispatchEvent( { type: "resume", offset: this._offset, currentTarget: this._source } );
        };

        /**
         * Volume を変更します
         * @method volume
         * @param {Number} val 0 ~ 1
         */
        p.volume = function ( val ) {
            this._volumeControl.volume( val );
        };

        /**
         * @method getDuration
         * @returns {Number} duration（再生時間）を返します
         */
        p.getDuration = function () {
            return this._duration;
        };

        /**
         * @method getOffset
         * @returns {number} 現在のoffset(秒)を返します
         */
        p.getOffset = function () {
            return this._offset;
        };

        /**
         * @method getBuffer
         * @returns {AudioBuffer} AudioBufferを返します
         */
        p.getBuffer = function () {
            return this._buffer;
        };

        /**
         * @method getBufferSource
         * @returns {BufferSource} RAIMEI.BufferSource instanceを返します
         */
        p.getBufferSource = function () {
            return this._bufferSource;
        };

        /**
         * @method getVolumeControl
         * @returns {VolumeControl} RAIMEI.VolumeControl instanceを返します
         */
        p.getVolumeControl = function () {
            return this._volumeControl;
        };

        /**
         * @method getContext
         * @returns {AudioContext} AudioContextを返します
         */
        p.getContext = function () {
            return this._context;
        };

        /**
         * @method getSource
         * @returns {AudioBufferSourceNode} AudioBufferSourceNodeを返します
         */
        p.getSource = function () {
            return this._source;
        };

        /**
         * ended event handler を削除します
         * @method _dispose
         * @private
         */
        p._dispose = function () {
            var source = this._source;
            source.removeEventListener( "ended", this._boundEnded );
        };

        /**
         * 再生を止めます
         * @method _stop
         * @private
         */
        p._stop = function () {
            var source = this._source;

            source&&source.stop();

            if ( this._pause ) {

                this._pause = false;
                this.dispatchEvent( { type: "ended", currentTarget: source } );
            }
        };

        /**
         * ended event handler
         * @method _onEnded
         * @private
         */
        p._onEnded = function () {
            var source = this._source;

            this._offset = 0;
            this.dispatchEvent( { type: "ended", currentTarget: source } );
            this._dispose();
        };

        /**
         * AudioBufferSourceNode を作成します
         * @method _createSource
         * @param {AudioContext} context AudioContext instance
         * @param {AudioBuffer} buffer AudioBuffer instance
         * @returns {AudioBufferSourceNode} AudioBufferSourceNodeを返します
         * @private
         */
        p._createSource = function ( context, buffer ) {
            var bufferSource, source, volumeControl;
            bufferSource = new RAIMEI.BufferSource( context, buffer );
            source = bufferSource.getSource();

            volumeControl = new RAIMEI.VolumeControl( context, source );

            this._bufferSource = bufferSource;
            this._volumeControl = volumeControl;

            return source;
        };

        return PlaySoundWithBuffer;
    }() );

}( window ) );
