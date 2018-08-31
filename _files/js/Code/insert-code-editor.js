var XFAddon_Code = window.XFAddon_Code || {};

!function($, window, document)
{
    "use strict";

    XFAddon_Code.InsertWatcher = XF.Element.newHandler({
        eventNameSpace: 'XFAddon_CodeInsertWatcher',

        options: {
            titleId: '#editor_code_title',
            selectSelector: '.js-codeEditorSwitcher'
        },

        $dialog: null,
        $title: null,
        $select: null,

        init: function()
        {
            this.overrideInsertCode();

            this.$dialog = this.$target.closest('#editor_code_form');

            this.$title = this.$dialog.find(this.options.titleId);
            this.$select = this.$dialog.find(this.options.selectSelector);

            this.$title.on('input', $.proxy(this.makeCodeType, this));
            this.$select.on('change', $.proxy(this.makeCodeType, this));

            this.$dialog.submit($.proxy(function() {
                this.makeCodeType();
                this.$title.val('');
            }, this));
        },

        overrideInsertCode: function()
        {
            var oldInsertCode = XF.EditorHelpers.insertCode;

            XF.EditorHelpers.insertCode = function(ed, type, code)
            {
                var oldType = type;

                type = new String(type);

                type.toLowerCase = function()
                {
                    if (type.indexOf('|') > -1)
                    {
                        return (type.split('|')[0]).toLowerCase() + '|' + type.split('|')[1];
                    }

                    return oldType.toLowerCase();
                };

                return oldInsertCode(ed, type, code);
            };
        },

        makeCodeType: function()
        {
            if (this.$title.val().length !== 0)
            {
                this.$target.val(this.$select.val() + '|' + (this.$title.val()).replace(/[^\w\s.]/gi, ''));
            }
            else
            {
                this.$target.val(this.$select.val());
            }
        }
    });

    XF.Element.register('Code-insert-watcher', 'XFAddon_Code.InsertWatcher');

}(jQuery, window, document);