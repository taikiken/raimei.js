/**
 * license inazumatv.com
 * author (at)taikiken / http://inazumatv.com
 * date 2014/04/21 - 22:27
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
        EventDispatcher = RAIMEI.EventDispatcher,
        isNumeric = RAIMEI.isNumeric;

    RAIMEI.PlaySoundWithOscillator = ( function (){
        // @class PlaySoundWithOscillator
        function PlaySoundWithOscillator ( context, semitone, type, khz ) {
            this._context = context;
            this._semitone_value = semitone;
            this._type = isNumeric( type ) ? type : RAIMEI.Oscillator.SINE;
            this._khz = isNumeric( khz ) ? khz : 440;
        }

        var p = PlaySoundWithOscillator.prototype;

        EventDispatcher.initialize( p );

        p.start = function () {
            this.play( 0 );
            this.dispatchEvent( { type: "start", delay: 0, khz: this._khz, semitone: this._semitone_value, wave: this._type, currentTarget: this } );
        };

        p.play = function ( time ) {
            var context = this._context,
                semitone_value = this._semitone_value,
                type = this._type,
                khz = this._khz,

                oscillator,
                oscillator_node;

            oscillator = new RAIMEI.Oscillator( context, semitone_value, type, khz );
            oscillator_node = oscillator.getOscillator();

            this._oscillator_node = oscillator_node;
            this._oscillator = oscillator;
            oscillator_node.start( time );
            this.dispatchEvent( { type: "play", delay: time, khz: khz, semitone: semitone_value, wave: type, currentTarget: oscillator_node } );
        };

        p.stop = function () {
            this._oscillator_node.stop();
        };

        p.getOscillator = function () {
            return this._oscillator_node;
        };

        p.getType = function () {
            return this._type;
        };

        p.setType = function ( type ) {
            this._type = type;
        };

        p.getKHZ = function () {
            return this._khz;
        };

        p.setKHZ = function ( khz ) {
            this._khz = khz;
        };

        p.getSemitone = function () {
            return this._semitone_value;
        };

        p.setSemitone = function ( semitone ) {
            this._oscillator.setSemitone( semitone )
            this._semitone_value = semitone;
        };

        return PlaySoundWithOscillator;
    }() );
}( window ) );