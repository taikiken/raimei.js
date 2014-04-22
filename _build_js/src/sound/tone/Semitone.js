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
        // @class Semitone
        function Semitone ( semitone ) {
            Cents.call( this, semitone * 100 );
            this._semitone_value = semitone;
        }

        RAIMEI.extend( Cents, Semitone );

        var p = Semitone.prototype;

        p.getSemitone = function () {
            return this._semitone_value;
        };

        p.setSemitone = function ( semitone ) {
            this._semitone_value = semitone;
            this.setCents( semitone * 100 );
        };

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