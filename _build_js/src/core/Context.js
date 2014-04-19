/**
 * license inazumatv.com
 * author (at)taikiken / http://inazumatv.com
 * date 2014/04/19 - 17:45
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

    RAIMEI.Context = ( function (){
        /**
         * @class Context
         * @constructor
         */
        function Context () {
            var context = new window.AudioContext();

            if ( !context.createGain ) {
                context.createGain = context.createGainNode;
            }
            if ( !context.createDelay ) {
                context.createDelay = context.createDelayNode;
            }
            if ( !context.createScriptProcessor ) {
                context.createScriptProcessor = context.createJavaScriptNode;
            }

            this._context = context;
        }

        var p = Context.prototype;

        /**
         * @method get
         * @returns {window.AudioContext} window.AudioContext instanceを返します
         */
        p.get = function () {
            return this._context;
        };

        return Context;
    }() );

}( window ) );