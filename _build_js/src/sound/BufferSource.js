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

        p.constructor = BufferSource;

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