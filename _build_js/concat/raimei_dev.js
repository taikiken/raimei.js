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
        /**
         * @class VolumeControl
         * @param {AudioContext} context AudioContext instance
         * @param {AudioBufferSourceNode} source AudioBufferSourceNode instance
         * @constructor
         */
        function VolumeControl ( context, source ) {
            var gainNode = context.createGain();

            source.connect( gainNode );
            gainNode.connect( context.destination );

            this._gainNode = gainNode;
            this._gain = gainNode.gain;
        }

        var p = VolumeControl.prototype;

        /**
         * volumeを変更します
         * @method setVolume
         * @param {number} val 0 ~ 1
         */
        p.setVolume = function ( val ) {
            this._gain.value = this._normalize( val );
        };

        /**
         * @method getVolume
         * @returns {number} 現在の volume 値を返します
         */
        p.getVolume = function () {
            return this._gain.value;
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
         * 0 ~ 1 範囲に正規化
         * @method _normalize
         * @param val
         * @returns {Number} 0 ~ 1の数値を返します
         * @protected
         */
        p._normalize = function ( val ) {
            val = parseFloat( val );
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
            this.dispatchEvent( { type: "play", duration: this._duration, delay: time, offset: offset, currentTarget: this._source } );
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
         * volume を変更します
         * @method setVolume
         * @param {Number} val 0 ~ 1
         */
        p.setVolume = function ( val ) {
            this._volumeControl.setVolume( val );
        };

        /**
         * @method getVolume
         * @returns {number} 現在の volume 値を返します
         */
        p.getVolume = function () {
            return this._volumeControl.getVolume();
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
            source = null;
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
/**
 * license inazumatv.com
 * author (at)taikiken / http://inazumatv.com
 * date 2014/04/22 - 23:15
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

    RAIMEI.Octave = ( function (){
        /**
         * @class Octave
         * @constructor
         */
        function Octave () {
            throw new Error( "can't create instance" );
        }

        /**
         * 1オクターブ定数
         * @const OCTAVE
         * @type {number}
         */
        Octave.OCTAVE = 1200;//12 * 100;

        return Octave;
    }() );

}( window ) );
/**
 * license inazumatv.com
 * author (at)taikiken / http://inazumatv.com
 * date 2014/04/22 - 23:03
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

    RAIMEI.Cents = ( function (){
        /**
         * @class Cents
         * @param {int} cents 0 ~ 100, 100cents === 1semitone, 12semitone === 1octave
         * @constructor
         */
        function Cents ( cents ) {
            this._cents_value = cents;
        }

        var p = Cents.prototype;

        /**
         * @method getCents
         * @returns {int} cents を返します
         */
        p.getCents = function () {
            return this._cents_value;
        };

        /**
         * cents を設定します
         * @method setCents
         * @param {int} cents 0 ~ 100, 100cents === 1semitone, 12semitone === 1octave
         */
        p.setCents = function ( cents ) {
            this._cents_value = cents;
        };

        return Cents;
    }() );
}( window ) );
/**
 * license inazumatv.com
 * author (at)taikiken / http://inazumatv.com
 * date 2014/04/22 - 23:08
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
        Cents = RAIMEI.Cents,
        Octave = RAIMEI.Octave;

    RAIMEI.Semitone = ( function (){
        /**
         * @class Semitone
         * @param {int} semitone_value semitone
         * @constructor
         */
        function Semitone ( semitone_value ) {
            Cents.call( this, semitone_value * 100 );
            this._semitone_value = semitone_value;
        }

        RAIMEI.extend( Cents, Semitone );

        var p = Semitone.prototype;

        /**
         * @method getSemitone
         * @returns {number} 現在の semitone を返します
         */
        p.getSemitone = function () {
            return this._semitone_value;
        };

        /**
         * semitone を設定します。
         * <br>centsを計算し detune.value へ設定します
         * @method setSemitone
         * @param {semitone} semitone_value
         */
        p.setSemitone = function ( semitone_value ) {
            this._semitone_value = semitone_value;
            this.setCents( semitone_value * 100 );
        };

        /**
         * オクターブ上下させます
         * @method shiftOctave
         * @param {int} n 整数値 -2 ~ 2
         */
        p.shiftOctave = function ( n ) {
            n = parseInt( n, 10 ) || 1;

            if ( n > 2 ) {
                n = 2;
            } else if ( n < -2 ) {
                n = -2;
            }

            var val = n * Octave.OCTAVE;

            this.setSemitone( this._semitone_value + val );
        };

        return Semitone;
    }() );

}( window ) );
/**
 * license inazumatv.com
 * author (at)taikiken / http://inazumatv.com
 * date 2014/04/24 - 0:12
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

    RAIMEI.VolumeControlWithOscillator = ( function (){
        /**
         * @class VolumeControlWithOscillator
         * @param {AudioContext} context AudioContext instance
         * @param {OscillatorNode} oscillator_node
         * @constructor
         */
        function VolumeControlWithOscillator ( context, oscillator_node ) {
            var gainNode = context.createGain();

            oscillator_node.connect( gainNode );
            gainNode.connect( context.destination );

            this._gainNode = gainNode;
            this._gain = gainNode.gain;
        }

        var p = VolumeControlWithOscillator.prototype;

        /**
         * volumeを変更します
         * @method setVolume
         * @param {number} val 0 ~ 1
         */
        p.setVolume = function ( val ) {
            this._gain.value = this._normalize( val );
        };

        /**
         * @method getVolume
         * @returns {number} 現在の volume 値を返します
         */
        p.getVolume = function () {
            return this._gain.value;
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
         * 0 ~ 1 範囲に正規化
         * @method _normalize
         * @param val
         * @returns {Number} 0 ~ 1の数値を返します
         * @protected
         */
        p._normalize = function ( val ) {
            val = parseFloat( val );
            // 0 to 1
            if ( val < 0 ) {
                val = 0;
            } else if ( val > 1 ) {
                val = 1;
            }

            return val;
        };

        return VolumeControlWithOscillator;
    }() );
}( window ) );
/**
 * license inazumatv.com
 * author (at)taikiken / http://inazumatv.com
 * date 2014/04/21 - 22:33
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

    RAIMEI.Oscillator = ( function (){
        /**
         * oscillator wrapper
         * @class Oscillator
         * @param {AudioContext} context
         * @param {int} semitone -23 ~ 23, (0 ~ 11) is 1 octave
         * @param {number} type wave type 0 ~ 4
         * @param {number} khz 0 ~ ∞
         * @constructor
         */
        function Oscillator ( context, semitone, type, khz ) {
            var oscillator = context.createOscillator(),
                sem = new RAIMEI.Semitone( semitone );

            this._semitone = sem;

//            oscillator.connect( context.destination );
            oscillator.frequency.value = khz;
            oscillator.detune.value = sem.getCents();
            oscillator.type = type;

            oscillator.start = oscillator.start || oscillator.noteOn;
            oscillator.stop = oscillator.stop || oscillator.noteOff;

            this._oscillator_node = oscillator;
        }

        /**
         * wave type sine(0) です
         * @const SINE
         * @type {number}
         * @static
         */
        Oscillator.SINE = 0;
        /**
         * wave type square(0) です
         * @const SQUARE
         * @type {number}
         * @static
         */
        Oscillator.SQUARE = 1;
        /**
         * wave type sawtooth(2) です
         * @const SAWTOOTH
         * @type {number}
         * @static
         */
        Oscillator.SAWTOOTH = 2;
        /**
         * wave type triangle(3) です
         * @const TRIANGLE
         * @type {number}
         * @static
         */
        Oscillator.TRIANGLE = 3;
        /**
         * wave type custom(4) です
         * @const CUSTOM
         * @type {number}
         * @static
         */
        Oscillator.CUSTOM = 4;

        var p = Oscillator.prototype;

        /**
         * @method getOscillator
         * @returns {OscillatorNode} OscillatorNode を返します
         */
        p.getOscillator = function () {
            return this._oscillator_node;
        };

        /**
         * khz を設定します
         * @method setFrequency
         * @param khz
         */
        p.setFrequency = function ( khz ) {
            this._oscillator_node.frequency.value = khz;
        };

        /**
         * semitone 値を元に cents を計算し detune.value へ設定します
         * @method setSemitone
         * @param {number} semitone_value
         */
        p.setSemitone = function ( semitone_value ) {
            // semitone(半音)
            // 100Cents === 1semitone
            // 12semitone === 1octave
            var semitone = this._semitone;
            semitone.setSemitone( semitone_value );

            this._oscillator_node.detune.value = semitone.getCents();
        };

        /**
         * wave type を設定します
         * @param {number} type wave type
         */
        p.setType = function ( type ) {
            this._oscillator_node.type = type;
        };

        return Oscillator;
    }() );
}( window ) );
/**
 * license inazumatv.com
 * author (at)taikiken / http://inazumatv.com
 * date 2014/04/21 - 22:27
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
        isNumeric = RAIMEI.isNumeric,
        Oscillator = RAIMEI.Oscillator;

    RAIMEI.PlaySoundWithOscillator = ( function (){
        /**
         * oscillator を使い再生
         * @class PlaySoundWithOscillator
         *
         * @param {AudioContext} context
         * @param {int} semitone_value semitone: -23 ~ 23, (0 ~ 11) is 1 octave
         * @param {number} [type] wave type 0 ~ 4, default is Oscillator.SINE: 0 <br>
         * Oscillator.SINE: 0<br>
         * Oscillator.SQUARE: 1<br>
         * Oscillator.SAWTOOTH: 2<br>
         * Oscillator.TRIANGLE: 3<br>
         * Oscillator.CUSTOM: 4
         *
         * @param {int} [khz] 0 ~ ∞, default is 440
         * @constructor
         */
        function PlaySoundWithOscillator ( context, semitone_value, type, khz ) {
            this._context = context;
            this._semitone_value = parseInt( semitone_value, 10 );
            this._type = isNumeric( type ) ? type : Oscillator.SINE;
            this._khz = isNumeric( khz ) ? Math.abs( khz ) : 440;
        }

        var p = PlaySoundWithOscillator.prototype;

        EventDispatcher.initialize( p );

        p.start = function () {
            this.play( 0 );
            this.dispatchEvent( { type: "start", delay: 0, khz: this._khz, semitone: this._semitone_value, wave: this._type, currentTarget: this } );
        };

        p.play = function ( time ) {
            var context = this._context,
                semitone_value = this._semitone_value,
                type = this._type,
                khz = this._khz,

                oscillator,
                oscillator_node;

            oscillator = new RAIMEI.Oscillator( context, semitone_value, type, khz );
            oscillator_node = oscillator.getOscillator();

            var volume_control = new RAIMEI.VolumeControlWithOscillator( context, oscillator_node );
            volume_control.setVolume( 1 );

            this._oscillator_node = oscillator_node;
            this._oscillator = oscillator;
            oscillator_node.start( time );
            this.dispatchEvent( { type: "play", delay: time, khz: khz, semitone: semitone_value, wave: type, currentTarget: oscillator_node } );
        };

        p.stop = function () {
            this._oscillator_node.stop( 0 );
            this.dispatchEvent( { type: "stop", delay: 0, khz: this._khz, semitone: this._semitone_value, wave: this._type, currentTarget: this } );
        };

        p.getOscillator = function () {
            return this._oscillator_node;
        };

        p.getType = function () {
            return this._type;
        };

        p.setType = function ( type ) {
            this._type = type;
        };

        p.getKHZ = function () {
            return this._khz;
        };

        p.setKHZ = function ( khz ) {
            this._oscillator&&this._oscillator.setFrequency( khz );
            this._khz = khz;
        };

        p.getSemitone = function () {
            return this._semitone_value;
        };

        p.setSemitone = function ( semitone_value ) {
            this._oscillator&&this._oscillator.setSemitone( semitone_value );
            this._semitone_value = semitone_value;
        };

        return PlaySoundWithOscillator;
    }() );
}( window ) );
/**
 * license inazumatv.com
 * author (at)taikiken / http://inazumatv.com
 * date 2014/04/22 - 21:26
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
        PlaySoundWithOscillator = RAIMEI.PlaySoundWithOscillator;

    RAIMEI.PlaySoundBySine = ( function (){
        /**
         * Sine 波再生
         * @class PlaySoundBySine
         * @extends PlaySoundWithOscillator
         * @param {AudioContext} context
         * @param {int} semitone_value semitone -23 ~ 23, (0 ~ 11) is 1 octave
         * @param {int} khz 0 ~ ∞
         * @constructor
         */
        function PlaySoundBySine ( context, semitone_value, khz ) {
            PlaySoundWithOscillator.call( this, context, semitone_value, RAIMEI.Oscillator.SINE, khz );
        }

        RAIMEI.extend( PlaySoundWithOscillator, PlaySoundBySine );

        var p = PlaySoundBySine.prototype;


        return PlaySoundBySine;
    }() );
}( window ) );
