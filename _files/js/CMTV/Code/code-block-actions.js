var CMTV_Code = window.CMTV_Code || {};

(function ($)
{
    "use strict";

    // ############################## COPY ACTION ##############################

    CMTV_Code.CodeBlock_Copy = new Clipboard('.bbCodeBlock--code .action--copy', {
        target: function (a)
        {
            return $(a).closest('.bbCodeBlock--code').find('code').get(0);
        }
    });

    CMTV_Code.CodeBlock_Copy.on('success', function (a)
    {
        a.clearSelection();
        XF.flashMessage(XF.phrase('CMTV_Code_copied'), 1500);
    });

    // ############################## EXPAND ACTION ##############################

    CMTV_Code.CodeBlock_Expand = XF.Click.newHandler({
        eventNameSpace: 'CMTV_CodeCodeBlock_Expand',

        codeBlockH: null,
        
        init: function ()
        {
            this.codeBlockH = XF.Element.getHandler(this.$target.closest('.bbCodeBlock--code'), 'CMTV-code-block');
        },
        
        click: function ()
        {
            this.codeBlockH.resizeButtons.$expand.addClass('action--hidden');
            this.codeBlockH.resizeButtons.$collapse.removeClass('action--hidden');

            this.codeBlockH.$codeContainer.stop().animate({
                height: this.codeBlockH.maxHeight + 'px'
            }, 200);
        }
    });

    // ############################## COLLAPSE ACTION ##############################

    CMTV_Code.CodeBlock_Collapse = XF.Click.newHandler({
        eventNameSpace: 'CMTV_CodeCodeBlock_Collapse',
        
        codeBlockH: null,
        
        init: function ()
        {
            this.codeBlockH = XF.Element.getHandler(this.$target.closest('.bbCodeBlock--code'), 'CMTV-code-block');
        },
        
        click: function ()
        {
            this.codeBlockH.resizeButtons.$expand.removeClass('action--hidden');
            this.codeBlockH.resizeButtons.$collapse.addClass('action--hidden');

            this.codeBlockH.$codeContainer.stop().animate({
                height: this.codeBlockH.minHeight + 'px'
            }, 200);
        }
    });

    // ############################## REGISTERING ##############################

    XF.Click.register('CMTV-code-block-expand', 'CMTV_Code.CodeBlock_Expand');
    XF.Click.register('CMTV-code-block-collapse', 'CMTV_Code.CodeBlock_Collapse');
})
(jQuery);