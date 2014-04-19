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
         * @returns {*}
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