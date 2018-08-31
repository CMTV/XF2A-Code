var XFAddon_Code = window.XFAddon_Code || {};

!function($, window, document, _undefined)
{
    "use strict";

    XFAddon_Code.Resizer = XF.Element.newHandler({
        eventNameSpace: 'XFAddon_CodeResizer',

        codeBlockHandler: null,
        onResizePos: null,

        init: function()
        {
            this.codeBlockHandler = XF.Element.getHandler(this.$target.closest('[data-xf-init="Code-block"]'), 'Code-block');

            this.codeBlockHandler.doNoHidden($.proxy(function() {
                if (!this.$target.is(':hidden'))
                {
                    this.$target.on('mousedown', XF.proxy(this, 'initResize'));
                    this.$target.on('touchstart', XF.proxy(this, 'initTouchResize'));
                }
            }, this));
        },

        initResize: function(e)
        {
            this.onResizePos =
                e.pageY - this.codeBlockHandler.codeBlockParts.$content.offset().top - this.codeBlockHandler.codeBlockParts.$content.outerHeight();

            $('body').addClass('Code-resizing');

            window.addEventListener('mousemove', this, false);
            window.addEventListener('mouseup', this, false);
        },

        initTouchResize: function(e)
        {
            this.onResizePos =
                e.touches[0].pageY - this.codeBlockHandler.codeBlockParts.$content.offset().top - this.codeBlockHandler.codeBlockParts.$content.outerHeight();


            $('body').addClass('Code-resizing');

            window.addEventListener('touchmove', this,  { passive: false });
            window.addEventListener('touchend', this,  { passive: false });
        },

        handleEvent: function(e)
        {
            switch (e.type)
            {
                case 'mousemove':
                    this.resize(e);
                    break;
                case 'touchmove':
                    this.touchResize(e);
                    break;
                case 'mouseup':
                case 'touchend':
                    window.removeEventListener('mousemove', this, false);
                    window.removeEventListener('mouseup', this, false);

                    window.removeEventListener('touchmove', this,  { passive: false });
                    window.removeEventListener('touchend', this,  { passive: false });

                    if (this.codeBlockHandler.codeBlockParts.$content.height() > this.codeBlockHandler.contentHeight)
                    {
                        this.codeBlockHandler.buttons.$collapse.show();
                    }
                    else
                    {
                        this.codeBlockHandler.buttons.$collapse.hide();
                    }

                    if (this.codeBlockHandler.codeBlockParts.$content.height() < this.codeBlockHandler.codeHeight)
                    {
                        this.codeBlockHandler.buttons.$expand.show();
                    }
                    else
                    {
                        this.codeBlockHandler.buttons.$expand.hide();
                    }

                    $('body').removeClass('Code-resizing');
                    break;
            }
        },

        resize: function(e)
        {
            e.preventDefault();

            var contentTop = this.codeBlockHandler.codeBlockParts.$content.offset().top;

            this.codeBlockHandler.codeBlockParts.$content.get(0).style.height =
                e.pageY - contentTop - this.onResizePos + 'px';
        },

        touchResize: function(e)
        {
            e.preventDefault();

            var contentTop = this.codeBlockHandler.codeBlockParts.$content.offset().top;

            this.codeBlockHandler.codeBlockParts.$content.get(0).style.height =
                e.touches[0].pageY - contentTop - this.onResizePos + 'px';
        }
    });

    XF.Element.register('Code-resizer', 'XFAddon_Code.Resizer');

}(jQuery, window, document);