/**
 * license inazumatv.com
 * author (at)taikiken / http://inazumatv.com
 * date 2014/04/19 - 18:17
 *
 * Copyright (c) 2011-2014 inazumatv.com, inc.
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 * http://webaudioapi.com/samples/shared.js
 * modified by taikiken
 */
( function ( window ){
    "use strict";
    var RAIMEI = window.RAIMEI,
        EventDispatcher = RAIMEI.EventDispatcher
    ;

    RAIMEI.BufferLoader = ( function (){
        /**
         * @class BufferLoader
         * @param {AudioContext} context window.AudioContext instance
         * @param {String} url sound file path
         * @constructor
         */
        function BufferLoader ( context, url ) {
            this._context = context;
            this._url = url;
        }

        var p = BufferLoader.prototype;

        EventDispatcher.initialize( p );

        /**
         * @method load
         */
        p.load = function () {
            var context = this._context,
                url = this._url,
                _this = this,
                request;

            request = new XMLHttpRequest();
            request.open( "GET", url, true );
            request.responseType = "arraybuffer";
            request.onload = function () {

                context.decodeAudioData(
                    request.response,
                    function ( buffer ) {
                        if ( !buffer ) {
                            _this.dispatchEvent( { type: "error", error: new Error( "error decoding file data: " + url ), currentTarget: request } );
                            return;
                        }
                        // success
                        _this.dispatchEvent( { type: "load", buffer: buffer, context: context, currentTarget: request } );
                    },
                    function ( error ) {
                        // error
                        _this.dispatchEvent( { type: "error", error: new Error( "decode error: " + url + ", error: " + error ), currentTarget: request } );
                    }
                );
            };

            request.onerror = function () {
                _this.dispatchEvent( { type: "error", error: new Error( "file not found: " + url ), currentTarget: request } );

            };

            request.send( null );
        };

        return BufferLoader;
    }() );

}( window ) );