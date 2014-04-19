/**
 * license inazumatv.com
 * author (at)taikiken / http://inazumatv.com
 * date 2014/04/19 - 17:09
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

    RAIMEI.Detector = ( function (){
        /**
         * @class Detector
         * @constructor
         */
        function Detector () {
            throw new Error( "can't create instance" );
        }

        /**
         * @method detects
         * @returns {boolean}
         * @static
         */
        Detector.detects = function () {
            return !!window.AudioContext;
        };

        return Detector;
    }() );

}( window ) );