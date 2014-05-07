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