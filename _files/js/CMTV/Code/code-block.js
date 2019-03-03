var CMTV_Code = window.CMTV_Code || {};

(function ($)
{
    "use strict";

    CMTV_Code.CodeBlock = XF.Element.newHandler({
        $expand: null,
        $collapse: null,
        $codeContainer: null,
        $pre: null,
        $code: null,

        eCodeBlockH: null,
        resizerH: null,

        resizeButtons: {},

        maxHeight: null,
        minHeight: null,

        init: function ()
        {
            this.$expand =          this.$target.find('.action--expand');
            this.$collapse =        this.$target.find('.action--collapse');
            this.$codeContainer =   this.$target.find('.bbCodeBlock-content');
            this.$pre =             this.$target.find('pre');
            this.$code =            this.$target.find('code');

            this.eCodeBlockH = XF.Element.getHandler(this.$pre, 'CMTV-code-block-extend');
            this.resizerH = XF.Element.getHandler(this.$target.find('[data-xf-init="CMTV-code-block-resizer"]'), 'CMTV-code-block-resizer');

            this.resizeButtons = {
                $expand: this.$target.find('.action--expand'),
                $collapse: this.$target.find('.action--collapse')
            };

            this.registerVisibleCatcher();
        },

        skipInit: false,
        visibleInit: function ()
        {
            if (this.$target.height() <= 0)
            {
                return;
            }

            if (this.skipInit)
            {
                return;
            }

            //

            this.eCodeBlockH.init();

            if (this.getHeight(this.$pre) > this.getHeight(this.$codeContainer))
            {
                var scrollbarAdd = (this.getWidth(this.$code) > this.getWidth(this.$pre)) ? 15 : 0;

                this.maxHeight = this.getHeight(this.$pre) + this.getPadding(this.$codeContainer).vertical + scrollbarAdd;
                this.minHeight = this.getHeight(this.$codeContainer, true);

                this.$codeContainer.css({
                    height:         this.getHeight(this.$codeContainer, true) + 'px',
                    'min-height':   this.minHeight + 'px',
                    'max-height':   this.maxHeight + 'px'
                });

                this.resizeButtons.$expand.removeClass('action--hidden');
                this.resizerH.visibleInit();
            }

            //

            this.skipInit = true;
        },

        registerVisibleCatcher: function ()
        {
            var hidden = null;

            this.$target.parents().each(function ()
            {
                if ($(this).is(':hidden'))
                {
                    hidden = this;
                }
            });

            if (hidden)
            {
                new MutationObserver(XF.proxy(this, 'visibleInit')).observe(hidden, { attributes: true });
            }
            else
            {
                this.visibleInit();
            }
        },

        // Heights

        getHeight: function ($element, inner = false)
        {
            return inner ? $element.innerHeight() : $element.height();
        },

        getWidth: function ($element, inner = false)
        {
            return inner ? $element.innerWidth() : $element.width();
        },

        getPadding: function ($element)
        {
            var vP = 0, hP = 0;

            vP = this.getHeight($element, true) - this.getHeight($element);
            hP = this.getWidth($element, true) - this.getWidth($element);

            return {
                vertical: vP,
                horizontal: hP
            }
        }
    });

    CMTV_Code.CodeBlockExtend = XF.extend(XF.CodeBlock, {
        __backup: {
            'init': '_init'
        },

        init: function ()
        {
            this._init();

            Prism.highlightElement(this.$target.find('code')[0]);

            var preWidth = this.$target.width(),
                codeWidth = this.$target.find('code').width(),
                lineHighlight = this.$target.find('.line-highlight'),
                targetWidth = codeWidth + this.$target.innerWidth() - preWidth;

            lineHighlight.css('min-width', targetWidth);

            if (codeWidth > preWidth)
            {
                lineHighlight.width(targetWidth);
            }
        }
    });

    XF.Element.register('CMTV-code-block', 'CMTV_Code.CodeBlock');
    XF.Element.register('CMTV-code-block-extend', 'CMTV_Code.CodeBlockExtend');
})
(jQuery);