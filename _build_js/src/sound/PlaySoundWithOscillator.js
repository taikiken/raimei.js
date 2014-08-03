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
        isNumeric = RAIMEI.isNumeric,
        Oscillator = RAIMEI.Oscillator;

    RAIMEI.PlaySoundWithOscillator = ( function (){
        /**
         * oscillator を使い再生
         * @class PlaySoundWithOscillator
         *
         * @param {AudioContext} context
         * @param {int} semitone_value semitone: -23 ~ 23, (0 ~ 11) is 1 octave
         * @param {number} [type] wave type 0 ~ 4, default is Oscillator.SINE: 0 <br>
         * Oscillator.SINE: 0<br>
         * Oscillator.SQUARE: 1<br>
         * Oscillator.SAWTOOTH: 2<br>
         * Oscillator.TRIANGLE: 3<br>
         * Oscillator.CUSTOM: 4
         *
         * @param {int} [khz] 0 ~ ∞, default is 440
         * @constructor
         */
        function PlaySoundWithOscillator ( context, semitone_value, type, khz ) {
            this._context = context;
            this._semitone_value = parseInt( semitone_value, 10 );
            this._type = isNumeric( type ) ? type : Oscillator.SINE;
            this._khz = isNumeric( khz ) ? Math.abs( khz ) : 440;
        }

        var p = PlaySoundWithOscillator.prototype;

        p.constructor = PlaySoundWithOscillator;

        EventDispatcher.initialize( p );

        /**
         * @method start
         */
        p.start = function () {
            this.play( 0 );
            this.dispatchEvent( { type: "start", delay: 0, khz: this._khz, semitone: this._semitone_value, wave: this._type, currentTarget: this } );
        };

        /**
         * @method play
         * @param time
         */
        p.play = function ( time ) {
            var context = this._context,
                semitone_value = this._semitone_value,
                type = this._type,
                khz = this._khz,

                oscillator,
                oscillator_node,
                volume_control;

            oscillator = new RAIMEI.Oscillator( context, semitone_value, type, khz );
            oscillator_node = oscillator.getOscillator();

            volume_control = new RAIMEI.VolumeControlWithOscillator( context, oscillator_node );
            volume_control.setVolume( 1 );

            this._oscillator_node = oscillator_node;
            this._oscillator = oscillator;
            oscillator_node.start( time );
            this.dispatchEvent( { type: "play", delay: time, khz: khz, semitone: semitone_value, wave: type, currentTarget: oscillator_node } );
        };

        /**
         * @method stop
         */
        p.stop = function () {
            this._oscillator_node.stop( 0 );
            this.dispatchEvent( { type: "stop", delay: 0, khz: this._khz, semitone: this._semitone_value, wave: this._type, currentTarget: this } );
        };

        /**
         * @method getOscillator
         * @returns {*|PlaySoundWithOscillator._oscillator_node}
         */
        p.getOscillator = function () {
            return this._oscillator_node;
        };

        /**
         * @method getType
         * @returns {*|PlaySoundWithOscillator._type}
         */
        p.getType = function () {
            return this._type;
        };

        /**
         * @method setType
         * @param type
         */
        p.setType = function ( type ) {
            this._type = type;
        };

        /**
         * @method getKHZ
         * @returns {*|PlaySoundWithOscillator._khz}
         */
        p.getKHZ = function () {
            return this._khz;
        };

        /**
         * @method setKHZ
         * @param khz
         */
        p.setKHZ = function ( khz ) {
            this._oscillator&&this._oscillator.setFrequency( khz );
            this._khz = khz;
        };

        /**
         * @method getSemitone
         * @returns {*|PlaySoundWithOscillator._semitone_value}
         */
        p.getSemitone = function () {
            return this._semitone_value;
        };

        /**
         * @method setSemitone
         * @param semitone_value
         */
        p.setSemitone = function ( semitone_value ) {
            this._oscillator&&this._oscillator.setSemitone( semitone_value );
            this._semitone_value = semitone_value;
        };

        return PlaySoundWithOscillator;
    }() );
}( window ) );