// --------------------------------------------------------------------
// █▀▀▀█▀▀▀█ jquery.knock.js
// █ █▀▀▀█ █ © 2016 A.J.Bauer
// █ █▄▄▄█ █ A jQuery plugin for detecting a user knock code / beat.
// █▄▄▄█▄▄▄█ License MIT
// --------------------------------------------------------------------

(function ($) {
    'use strict';

    $.fn.knock = function (options) {
        var defaults = {
            beat: [200, 100, 100, 200, 400, 200], // beat sequence to detect
            restart: 2000, //restart detection after this time in ms
            debug: false, // set to true to output time between hits
            events: 'keydown mousedown touchstart pointerdown', //events to listen for
            onRecognized: function () { } //callback function to be executed if knock sequence recognized                                    
        },
          settings = $.extend({}, defaults, options),
          evs = settings.events.split(' '),
          now = {},
          prev = {},
          beatRec = {},
          beatCount = {},
          activeType = '';

        for (var i = 0; i < evs.length; i++) {
            prev[evs[i]] = new Date();
            now[evs[i]] = new Date();
            beatRec[evs[i]] = [];
            beatCount[evs[i]] = 0;
        }

        return this.each(function (e) {
            $(this).on(settings.events, function (e) {
                now[e.type] = new Date();
                if (now[e.type] - prev[e.type] > 2000) {
                    activeType = e.type;
                    prev[e.type] = now[e.type];
                    beatRec[e.type] = [];
                    beatCount[e.type] = 0;
                } else {
                    beatRec[e.type][beatCount[e.type]] = now[e.type] - prev[e.type];
                    if ((e.type == activeType) && (settings.debug)) {
                        console.log('knock: beat[' + beatCount[e.type] + '] = ' + beatRec[e.type][beatCount[e.type]]);
                    }
                    beatCount[e.type]++;
                }

                if (beatCount[e.type] == settings.beat.length) {
                    var r = Math.round(beatRec[e.type][0] / settings.beat[0]);
                    for (var i = 0; i < settings.beat.length; i++) {
                        if (r != Math.round(beatRec[e.type][i] / settings.beat[i])) {
                            return;
                        }
                    }
                    if (e.type == activeType) {
                        if (settings.debug) {
                            console.log('knock: recognized by ' + e.type);
                        }
                        settings.onRecognized.call();
                    }
                }
                prev[e.type] = new Date();
            });
        });

    };
}(jQuery));