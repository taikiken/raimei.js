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