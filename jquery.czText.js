/**
 *
 */
(function ($) {
    if (typeof jQuery === 'undefined') console.error('CzText requires jQuery.');

    var CzText = function (element, options) {
        this.element = $(element);
        this.options = $.extend({}, CzText.DEFAULTS, options);
        this.html = this.element.html();
        this.excluded = false;

        this.init();
        // this.initFixOnResize();
    };

    CzText.DEFAULTS = {
        debug: false,
        elementHtmlAttributeName: 'data-im-original-html'
    };

    CzText.prototype = {
        init: function () {
            var words;
            if (!this.element.attr(this.options.elementHtmlAttributeName)) {
                this.element.attr(this.options.elementHtmlAttributeName, this.html)
            } else {
                this.html = this.element.attr(this.options.elementHtmlAttributeName);
                this.element.html(this.html);
            }
            words = this.html.split(' ');
            this.element.html(words[0]);
            this.html = this.element.html();

            for (var i = 1; i < words.length; i++) {
                this.processText(words, i);
            }
        },

        refresh: function () {
            this.init();
        },

        /**
         * @param words
         * @param i
         */
        processText: function (words, i) {
            var currentWord = words[i];
            var lastWord = words[i - 1];
            var lastLastWord = words[i - 2];
            var height = this.element.height();
            if(currentWord.length === 0){
                return;
            }
            this.html += ' ' + currentWord;
            this.element.html(this.html);

            this._processOneLettersEachOther(currentWord, lastWord, lastLastWord);
            this._processLastLetter(currentWord, lastWord, lastLastWord, height);
            this.excluded = false;
        },

        /**
         *
         * @param currentWord
         * @param lastWord
         * @param lastLastWord
         * @param height
         * @private
         */
        _processLastLetter: function (currentWord, lastWord, lastLastWord, height) {
            if (this.element.height() > height && this.excluded === false) {
                if ((lastWord.length === 1 || (lastWord.length === 2 && lastWord.indexOf('.') !== -1))) {
                   this._appendLineBrakeBefore(currentWord, lastWord, lastLastWord);
                }
            }
        },

        /**
         *
         * @param currentWord
         * @param lastWord
         * @param lastLastWord
         * @private
         */
        _processOneLettersEachOther: function (currentWord, lastWord, lastLastWord) {
            if (lastLastWord && lastLastWord.length === 1 && lastWord.length === 1) {
                this.excluded = true;
                this._appendLineBrakeBefore(currentWord, lastWord, lastLastWord);
            }
        },

        /**
         *
         * @param currentWord
         * @param lastWord
         * @param lastLastWord
         * @private
         */
        _appendLineBrakeBefore: function (currentWord, lastWord, lastLastWord) {
            var matchingWords = (lastWord + ' ' + currentWord);
            if (lastLastWord && lastLastWord.length === 1) {
                matchingWords = (lastLastWord + ' ' + lastWord + ' ' + currentWord);
            }
            var htm = this.html.slice(0, -(matchingWords).length);
            var br = "<br>";
            if (this.options.debug === true) {
                br = "<br><span style=\"color: red\">|</span>";
            }
            this.html = htm + (br + matchingWords);
            this.element.html(this.html);
        }

    };


    $.fn.czText = function (option) {
       return this.each(function () {
            var $this   = $(this);
            var data    = $this.data('cz-textWrap');
            var options = $.extend({}, CzText.DEFAULTS, option);
            if (!data) $this.data('cz-textWrap', (data = new CzText(this, options)));
            if (typeof option == 'string') data[option]()
        });
    }

})(jQuery);
