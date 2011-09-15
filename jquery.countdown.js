/*
 * jQuery Countdown plugin
 * http://github.com/zapnap/jquery-countdown
 *
 * Copyright 2011, Nick Plante <nap@zerosum.org>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

jQuery.fn.extend({
  countdown: function(settings, to) {
    return this.each(function() {
      jQuery.countdown.start(this, settings, to);
    });
  },
  stopCountdown: function() {
    return this.each(function() {
      jQuery.countdown.stop(this);
    });
  }
});

jQuery.extend({
  countdown: {
    settings: {},

    start: function(element, settings, to) {
      if ((typeof this.settings.timerId == 'undefined') ||
          (this.settings.timerId != $(element).data('countdown.id'))) {
        this.settings = jQuery.extend({
          timerId     : new Date().getTime(),
          duration    : 1000,
          seconds     : 10,
          running     : true,
          callback    : function() {}
        }, settings);

        $(element).data('countdown.id', this.settings.timerId);
      }

      settings = this.settings;
      if (!to && to != 0) {
        to = settings.seconds;
      }

      if (settings.running) {
        $(element).text(to);

        $(element).animate({ '' : '' }, settings.duration, '', function() {
          if (settings.running && to > 0) {
            $(this).text(to - 1).countdown(settings, to - 1);
          } else if (settings.running) {
            settings.callback(this);
          }
        });
      }
    },

    stop: function(element) {
      this.settings.running = false;
    }
  }
});
