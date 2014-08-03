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
         * 半音値をcentsを設定します
         * @class Cents
         * @param {int} cents 0 ~ 100, 100cents === 1semitone, 12semitone === 1octave
         * @constructor
         */
        function Cents ( cents ) {
            this._cents_value = cents;
        }

        var p = Cents.prototype;

        p.constructor = Cents;

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