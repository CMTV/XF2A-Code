<?php
/**
 * Username Change xF2 addon by CMTV
 * Enjoy!
 */

namespace CMTV\Code\XF\BbCode\Renderer;

class EmailHtml extends XFCP_EmailHtml
{
    public function renderTagCode(array $children, $option, array $tag, array $options)
    {
        if (is_array($option))
        {
            $option = array_key_exists('lang', $option) ? $option['lang'] : '';
        }

        return parent::renderTagCode($children, $option, $tag, $options);
    }
}