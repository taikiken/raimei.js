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
        // @class Oscillator
        function Oscillator ( context, semitone, type, khz ) {
            var oscillator = context.createOscillator(),
                sem = new RAIMEI.Semitone( semitone );

            this._semitone = sem;

            oscillator.connect( context.destination );
            oscillator.frequency.value = khz;
            oscillator.detune.value = sem.getCents();
            oscillator.type = type;

            oscillator.start = oscillator.start || oscillator.noteOn;
            oscillator.stop = oscillator.stop || oscillator.noteOff;

            this._oscillator_node = oscillator;
        }

        Oscillator.SINE = 0;
        Oscillator.SQUARE = 1;
        Oscillator.SAWTOOTH = 2;
        Oscillator.TRIANGLE = 3;

        var p = Oscillator.prototype;

        p.getOscillator = function () {
            return this._oscillator_node;
        };

        p.setFrequency = function ( khz ) {
            this._oscillator_node.frequency.value = khz;
        };

        p.setSemitone = function ( tone ) {
            // semitone(半音)
            // 100Cents === 1semitone
            // 12semitone === 1octave
            var semitone = this._semitone;
            semitone.setSemitone( tone );

            this._oscillator_node.detune.value = semitone.getCents();
        };

        p.setType = function ( type ) {
            this._oscillator_node.type = type;
        };

        return Oscillator;
    }() );
}( window ) );