/**
 * license inazumatv.com
 * author (at)taikiken / http://inazumatv.com
 * date 2014/04/22 - 23:15
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

    RAIMEI.Octave = ( function (){
        /**
         * @class Octave
         * @constructor
         */
        function Octave () {
            throw new Error( "can't create instance" );
        }

        /**
<<<<<<< HEAD
         * 1オクターブ定数
=======
         * 1オクターブ cents 1200
>>>>>>> FETCH_HEAD
         * @const OCTAVE
         * @type {number}
         */
        Octave.OCTAVE = 1200;//12 * 100;

        return Octave;
    }() );

}( window ) );