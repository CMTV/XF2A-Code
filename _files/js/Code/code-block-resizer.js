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

        handleEvent: function(e)
        {
            switch (e.type)
            {
                case 'mousemove':
                    this.resize(e);
                    break;
                case 'mouseup':
                    window.removeEventListener('mousemove', this, false);
                    window.removeEventListener('mouseup', this, false);

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
        }
    });

    XF.Element.register('Code-resizer', 'XFAddon_Code.Resizer');

}(jQuery, window, document);