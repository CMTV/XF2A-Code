var XFAddon_Code = window.XFAddon_Code || {};

!function($, window, document)
{
    "use strict";

    XFAddon_Code.CodeBlock = XF.Element.newHandler({
        eventNameSpace: 'XFAddon_CodeCodeBlock',

        $codeBlock: null,
        codeBlockParts: {
            $title: null,
            $content: null,
            $resizer: null
        },

        buttons: {
            $copy: null,
            $expand: null,
            $collapse: null
        },

        codeHeight: null,
        contentHeight: null,
        contentOuterHeight: null,

        init: function()
        {
            this.$codeBlock = this.$target;

            this.codeBlockParts = {};
            this.buttons = {};

            this.codeBlockParts.$title = this.$codeBlock.find('.bbCodeBlock-title');
            this.codeBlockParts.$content = this.$codeBlock.find('.bbCodeBlock-content');
            this.codeBlockParts.$resizer = this.$codeBlock.find('.bbCodeBlock-resizer');

            this.buttons.$copy = this.codeBlockParts.$title.find('.copy-to-clipboard');
            this.buttons.$expand = this.codeBlockParts.$title.find('.expand');
            this.buttons.$collapse = this.codeBlockParts.$title.find('.collapse');

            this.doNoHidden($.proxy(function() {
                this.codeHeight = this.codeBlockParts.$content.find('.bbCodeCode').height();
                this.contentHeight = this.codeBlockParts.$content.height();
                this.contentOuterHeight = this.codeBlockParts.$content.outerHeight();

                if (this.codeHeight <= this.contentHeight)
                {
                    this.buttons.$expand.hide();
                }
                else
                {
                    this.codeBlockParts.$resizer.get(0).style.display = 'flex';
                    this.codeBlockParts.$content.css('height', this.contentOuterHeight);
                    this.codeBlockParts.$content.css('min-height', this.contentOuterHeight);
                }

                this.buttons.$collapse.hide();
            }, this));

            this.codeBlockParts.$content.css('max-height', this.codeHeight + this.contentOuterHeight - this.contentHeight + 'px');
        },

        doNoHidden: function(todo)
        {
            var hiddenParent = this.getHidden();
            var inlineHidden = false;

            if (hiddenParent)
            {
                if (hiddenParent.style.display === 'none')
                {
                    inlineHidden = true;
                }
            }

            $(hiddenParent).show();

            todo();

            if (hiddenParent)
            {
                if (inlineHidden)
                {
                    hiddenParent.style.display = 'none';
                }
                else
                {
                    hiddenParent.style.display = '';
                }
            }
        },

        getHidden: function()
        {
            var toReturn = null;

            this.$target.parents().each(function()
            {
                if ($(this).css('display') === 'none')
                {
                    toReturn = $(this).get(0);
                    return false;
                }
            });

            return toReturn;
        }
    });

    XF.Element.register('Code-block', 'XFAddon_Code.CodeBlock');

}(jQuery, window, document);