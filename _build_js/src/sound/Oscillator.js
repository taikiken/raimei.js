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
<<<<<<< HEAD
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
=======
        // @class Oscillator
        function Oscillator ( context, semitone_value, type, khz ) {
>>>>>>> FETCH_HEAD
            var oscillator = context.createOscillator(),
                semitone = new RAIMEI.Semitone( semitone_value );

            this._semitone = semitone;

//            oscillator.connect( context.destination );
            oscillator.frequency.value = khz;
//            oscillator.detune.value = semitone.getCents();
            oscillator.type = type;

            oscillator.start = oscillator.start || oscillator.noteOn;
            oscillator.stop = oscillator.stop || oscillator.noteOff;

            this._oscillator_node = oscillator;
            this.setSemitone( semitone_value );
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

<<<<<<< HEAD
        /**
         * semitone 値を元に cents を計算し detune.value へ設定します
         * @method setSemitone
         * @param {number} semitone_value
         */
=======
>>>>>>> FETCH_HEAD
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