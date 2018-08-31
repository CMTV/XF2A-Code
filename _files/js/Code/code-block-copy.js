var XFAddon_Code = window.XFAddon_Code || {};

XFAddon_Code.Copy = new Clipboard('.bbCodeBlock-title-opposite .copy-to-clipboard', {
    target: function(a)
    {
        return $(a).closest(".bbCodeBlock--code").find('code').get(0);
    }
});

XFAddon_Code.Copy.on('success', function(a)
{
    a.clearSelection();
    XF.flashMessage(XF.phrase('Code_copied'), 3000);
});