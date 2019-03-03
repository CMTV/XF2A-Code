(function ($)
{
    "use strict";

    XF.EditorDialogCode = XF.extend(XF.EditorDialogCode, {
        __backup: {
            '_init': '__init',
            'show': '_show'
        },

        CMTV_Code_switcherH: null,
        CMTV_Code_defaultLanguage: null,
        CMTV_Code_init: true,

        show: function (ed)
        {
            this._show(ed);

            if (!this.CMTV_Code_init)
            {
                this.setDefaultLanguage();
            }
        },

        afterShow: function (overlay) {},

        _init: function (overlay)
        {
            this.__init(overlay);

            var switcherAttr = '[data-xf-init="code-editor-switcher-container"]';

            this.CMTV_Code_switcherH = XF.Element.getHandler(overlay.$container.find(switcherAttr), 'code-editor-switcher-container');
            this.CMTV_Code_defaultLanguage = $('#editor_code_type').val();
            this.CMTV_Code_init = false;

            overlay.$container.find(switcherAttr).on('code-editor:init', XF.proxy(this, 'setDefaultLanguage'));
        },

        submit: function (e)
        {
            //
            // COPIED FROM editor.js !!!
            //

            e.preventDefault();

            var ed = this.ed,
                overlay = this.overlay;

            var $codeMirror = overlay.$container.find('.CodeMirror');
            if ($codeMirror.length)
            {
                var codeMirror = $codeMirror[0].CodeMirror,
                    doc = codeMirror.getDoc();

                codeMirror.save();
                doc.setValue('');

                codeMirror.setOption('mode', '');
            }

            var $type = $('#editor_code_type'),
                $code = $('#editor_code_code'),
                $title = $('#editor_code_title'),
                $highlight = $('#editor_code_highlight');

            ed.selection.restore();
            XF.EditorHelpers.insertCode(ed, $type.val(), $code.val(), {
                title: $title.val().trim(),
                highlight: $highlight.val().trim()
            });

            overlay.hide();

            $code.val('');
            $type.val(this.CMTV_Code_defaultLanguage);
            $title.val('');
            $highlight.val('');
        },

        setDefaultLanguage: function ()
        {
            this.overlay.$container.find('[data-xf-init="code-editor"]').data('lang', '').focus();
            this.CMTV_Code_switcherH.change();
        }
    });

    XF.EditorHelpers.insertCode = function (ed, type, code, extra)
    {
        //
        // COPIED FROM editor.js !!!
        //

        var tag, lang, output;

        switch (type.toLowerCase())
        {
            case '': tag = 'CODE'; lang = ''; break;
            default: tag = 'CODE'; lang = type.toLowerCase(); break;
        }

        code = code.replace(/&/g, '&amp;').replace(/</g, '&lt;')
            .replace(/>/g, '&gt;').replace(/"/g, '&quot;')
            .replace(/\t/g, '    ')
            .replace(/\n /g, '\n&nbsp;')
            .replace(/  /g, '&nbsp; ')
            .replace(/  /g, ' &nbsp;') // need to do this twice to catch a situation where there are an odd number of spaces
            .replace(/\n/g, '</p><p>');

        if (!extra.title && !extra.highlight)
        {
            output = '[' + tag + (lang ? '=' + lang : '') + ']' + code + '[/' + tag + ']';
        }
        else
        {
            output = '[' + tag + (lang ? ' lang="' + lang + '"' : '') + (extra.title ? ' title="' + extra.title + '"' : '') + (extra.highlight ? ' highlight="' + extra.highlight + '"' : '') + ']' + code + '[/' + tag + ']';
        }


        if (output.match(/<\/p>/i))
        {
            output = '<p>' + output + '</p>';
            output = output.replace(/<p><\/p>/g, '<p><br></p>');
        }

        ed.html.insert(output);
    }
})
(jQuery);