/**
 * @license inazumatv.com
 * @author (at)taikiken / http://inazumatv.com
 * @date 2014/04/20 - 13:12
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

    // WebAudio context class
    var AudioContext = window.AudioContext ||
        window.webkitAudioContext ||
        window.mozAudioContext ||
        window.oAudioContext ||
        window.msAudioContext;

    /**
     * @class WebAudioDetector
     * @constructor
     */
    function WebAudioDetector () {}

    /**
     * @method detects
     * @returns {boolean} WebAudio API 使用可否を返します
     * @static
     */
    WebAudioDetector.detects = function () {
        return !!AudioContext;
    };

    window.WebAudioDetector = WebAudioDetector;
}( window ) );