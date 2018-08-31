var XFAddon_Code = window.XFAddon_Code || {};

!function($, window, document)
{
    "use strict";

    XFAddon_Code.ExpandClick = XF.Click.newHandler({
        eventNameSpace: 'XFAddon_CodeExpandClick',

        codeBlockHandler: null,

        init: function()
        {
            this.codeBlockHandler = XF.Element.getHandler(this.$target.closest('[data-xf-init="Code-block"]'), 'Code-block');
        },

        click: function()
        {
            this.codeBlockHandler.codeBlockParts.$content.stop().animate({
                height: this.codeBlockHandler.codeBlockParts.$content.css('max-height')
            }, 200);

            this.codeBlockHandler.buttons.$expand.hide();
            this.codeBlockHandler.buttons.$collapse.show();
        }
    });

    XFAddon_Code.CollapseClick = XF.Click.newHandler({
        eventNameSpace: 'XFAddon_CodeCollapseClick',

        codeBlockHandler: null,

        init: function()
        {
            this.codeBlockHandler = XF.Element.getHandler(this.$target.closest('[data-xf-init="Code-block"]'), 'Code-block');
        },

        click: function()
        {
            this.codeBlockHandler.codeBlockParts.$content.stop().animate({
                height: this.codeBlockHandler.contentOuterHeight
            }, 200);

            this.codeBlockHandler.buttons.$collapse.hide();
            this.codeBlockHandler.buttons.$expand.show();
        }
    });

    XF.Click.register('Code-expand', 'XFAddon_Code.ExpandClick');
    XF.Click.register('Code-collapse', 'XFAddon_Code.CollapseClick');

}(jQuery, window, document);