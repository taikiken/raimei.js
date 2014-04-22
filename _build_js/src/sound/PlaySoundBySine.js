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
        // @class PlaySoundBySine
        function PlaySoundBySine ( context, tone, khz ) {
            PlaySoundWithOscillator.call( this, context, tone, RAIMEI.Oscillator.SINE, khz );
        }

        RAIMEI.extend( PlaySoundWithOscillator, PlaySoundBySine );

        var p = PlaySoundBySine.prototype;


        return PlaySoundBySine;
    }() );
}( window ) );