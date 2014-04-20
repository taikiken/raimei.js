/**
 * license inazumatv.com
 * author (at)taikiken / http://inazumatv.com
 * date 2014/04/19 - 19:21
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

    RAIMEI.PlaySoundWithBuffer = ( function (){
        /**
         * @class PlaySoundWithBuffer
         * @param {AudioContext} context window.AudioContext instance
         * @param {AudioBuffer} buffer AudioBuffer instance
         * @param {Boolean} [loop] loop option default is false
         * @constructor
         */
        function PlaySoundWithBuffer ( context, buffer, loop ) {
            this._context = context;
            this._buffer = buffer;
            this._loop = !!loop;

            this._offset = 0;
            this._boundEnded = this._onEnded.bind( this );
            this._duration = buffer.duration;
            this._pause = false;
        }

        var p = PlaySoundWithBuffer.prototype;

        EventDispatcher.initialize( p );

        /**
         * delay無しでサウンドを先頭から再生します
         * @method start
         */
        p.start = function () {
            this._offset = 0;
            this.play( 0, 0 );
        };

        /**
         * サウンド再生, delay and offset option を使用します
         * @method play
         * @param {Number} time delay second.
         * @param {Number} [offset] start offset second, default is 0.
         */
        p.play = function ( time, offset ) {
            if ( !isNumeric( offset ) ) {
                offset = 0;
            }

            this._pause = false;

            var source = this._createSource( this._context, this._buffer );
            source.loop = this._loop;
            source.addEventListener( "ended", this._boundEnded, false );
            source.onended = function () {
                // onendedに関数を設置しないとended eventが発火しない
            };
            source.start( this._context.currentTime + time, offset );
            this.dispatchEvent( { type: "start", duration: this._duration, delay: time, offset: offset, currentTarget: this._source } );
            this._source = source;
        };

        /**
         * 再生を止めEventを発火します
         * @method stop
         */
        p.stop = function () {
            this._stop();
            this.dispatchEvent( { type: "stop", currentTarget: this._source } );
        };

        /**
         * 一時停止します
         * @method pause
         */
        p.pause = function () {
            var offset = this._context.currentTime % this._duration;

            this._dispose();
            this._stop();
            this._pause = true;
            this._offset = offset;
            this.dispatchEvent( { type: "pause", offset: offset, currentTarget: this._source } );
        };

        /**
         * 再生再開します
         * @method resume
         */
        p.resume = function () {
            this._pause = false;
            this.play( 0, this._offset );
            this.dispatchEvent( { type: "resume", offset: this._offset, currentTarget: this._source } );
        };

        /**
         * Volume を変更します
         * @method volume
         * @param {Number} val 0 ~ 1
         */
        p.volume = function ( val ) {
            this._volumeControl.volume( val );
        };

        /**
         * @method getDuration
         * @returns {Number} duration（再生時間）を返します
         */
        p.getDuration = function () {
            return this._duration;
        };

        /**
         * @method getOffset
         * @returns {number} 現在のoffset(秒)を返します
         */
        p.getOffset = function () {
            return this._offset;
        };

        /**
         * @method getBuffer
         * @returns {AudioBuffer} AudioBufferを返します
         */
        p.getBuffer = function () {
            return this._buffer;
        };

        /**
         * @method getBufferSource
         * @returns {BufferSource} RAIMEI.BufferSource instanceを返します
         */
        p.getBufferSource = function () {
            return this._bufferSource;
        };

        /**
         * @method getVolumeControl
         * @returns {VolumeControl} RAIMEI.VolumeControl instanceを返します
         */
        p.getVolumeControl = function () {
            return this._volumeControl;
        };

        /**
         * @method getContext
         * @returns {AudioContext} AudioContextを返します
         */
        p.getContext = function () {
            return this._context;
        };

        /**
         * @method getSource
         * @returns {AudioBufferSourceNode} AudioBufferSourceNodeを返します
         */
        p.getSource = function () {
            return this._source;
        };

        /**
         * ended event handler を削除します
         * @method _dispose
         * @private
         */
        p._dispose = function () {
            var source = this._source;
            source.removeEventListener( "ended", this._boundEnded );
        };

        /**
         * 再生を止めます
         * @method _stop
         * @private
         */
        p._stop = function () {
            var source = this._source;

            source&&source.stop();

            if ( this._pause ) {

                this._pause = false;
                this.dispatchEvent( { type: "ended", currentTarget: source } );
            }
        };

        /**
         * ended event handler
         * @method _onEnded
         * @private
         */
        p._onEnded = function () {
            var source = this._source;

            this._offset = 0;
            this.dispatchEvent( { type: "ended", currentTarget: source } );
            this._dispose();
        };

        /**
         * AudioBufferSourceNode を作成します
         * @method _createSource
         * @param {AudioContext} context AudioContext instance
         * @param {AudioBuffer} buffer AudioBuffer instance
         * @returns {AudioBufferSourceNode} AudioBufferSourceNodeを返します
         * @private
         */
        p._createSource = function ( context, buffer ) {
            var bufferSource, source, volumeControl;
            bufferSource = new RAIMEI.BufferSource( context, buffer );
            source = bufferSource.getSource();

            volumeControl = new RAIMEI.VolumeControl( context, source );

            this._bufferSource = bufferSource;
            this._volumeControl = volumeControl;

            return source;
        };

        return PlaySoundWithBuffer;
    }() );

}( window ) );