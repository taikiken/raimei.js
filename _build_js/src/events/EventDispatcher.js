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
( function ( RAIMEI ){
    "use strict";

    RAIMEI.EventDispatcher = function () {
        /**
         * @class EventDispatcher
         * @constructor
         */
        function EventDispatcher () {
            this._listeners = {};
        }

        var p = EventDispatcher.prototype;

        p.constructor = RAIMEI.EventDispatcher;

        /**
         * @method addEventListener
         * @param {String} type event type
         * @param {Function} listener Event Handler
         */
        p.addEventListener = function ( type, listener ) {

            if ( typeof this._listeners === "undefined" ) {

                this._listeners = {};
            }

            var listeners = this._listeners;

            if ( typeof listeners[ type ] === "undefined" ) {

                listeners[ type ] = [];
            }

            if ( listeners[ type ].indexOf( listener ) === -1 ) {

                listeners[ type ].push( listener );
            }
        };

        /**
         * @method hasEventListener
         * @param {String} type event type
         * @param {Function} listener Event Handler
         * @returns {boolean}
         */
        p.hasEventListener = function ( type, listener ) {

            var listeners = this._listeners;

            if ( typeof listeners === "undefined" ) {

                return false;
            } else if ( typeof listener[ type ] !== "undefined" && listeners[ type ].indexOf( listener ) !== -1 ) {

                return true;
            }

            return false;
        };

        p.removeEventListener = function ( type, listener ) {
            if ( typeof this._listeners === "undefined" ) {

                return;
            }

            var listeners = this._listeners,
                listeners_types = listeners[ type ],
                index;

            if ( typeof listeners_types !== "undefined" ) {

                index = listeners_types.indexOf( listener );

                if ( index !== -1 ) {

                    listeners_types.splice( index, 1 );
                }
            }
        };

        /**
         * @method dispatchEvent
         * @param {Object} event require event.type:String
         */
        p.dispatchEvent = function ( event ) {
            var listeners = this._listeners,
                listeners_types,
                i, limit;

            if ( typeof listeners === "undefined" || typeof event.type === "undefined" ) {

                return;
            }

            listeners_types = listeners[ event.type ];

            if ( typeof listeners_types !== "undefined" ) {

                event.target = this;

                for ( i = 0, limit = listeners_types.length; i < limit; i++ ) {

                    listeners_types[ i ].call( this, event );
                }
            }
        };

        /**
         * @method initialize
         * @param {Object} object
         * @static
         */
        EventDispatcher.initialize = function ( object ) {
            object.addEventListener = p.addEventListener;
            object.hasEventListener = p.hasEventListener;
            object.removeEventListener = p.removeEventListener;
            object.dispatchEvent = p.dispatchEvent;
        };

        return EventDispatcher;
    }();

}( window.RAIMEI ) );