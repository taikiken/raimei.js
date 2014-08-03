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

        p.constructor = PlaySoundBySine;

        return PlaySoundBySine;
    }() );
}( window ) );