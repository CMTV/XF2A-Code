<?php
/**
 * Code xF2 addon by CMTV
 * Enjoy!
 */

namespace CMTV\Code\XF\BbCode\Renderer;

class Html extends XFCP_Html
{
    public function renderTagCode(array $children, $option, array $tag, array $options)
    {
        if (!is_array($option))
        {
            if (strpos($option, '|') && \XF::options()->CMTV_Code_backComp)
            {
                $strrstr = function ($h, $n, $before = false)
                {
                    $rpos = strrpos($h, $n);
                    if($rpos === false) return false;
                    if($before == false) return substr($h, $rpos);
                    else return substr($h, 0, $rpos);
                };

                $option = [
                    'title' => $strrstr($option, '|', true),
                    'lang' => substr($strrstr($option, '|'), 1)
                ];
            }
            else
            {
                $language = !empty($option) ? $option : \XF::options()->CMTV_Code_defaultCodeLanguage;
                return $this->CMTV_Code_getRenderedCode([], parent::renderTagCode($children, $language, $tag, $options));
            }
        }

        $language = isset($option['lang']) ? $option['lang'] : \XF::options()->CMTV_Code_defaultCodeLanguage;

        return $this->CMTV_Code_getRenderedCode($option, parent::renderTagCode($children, $language, $tag, $options));
    }

    protected function getRenderedCode($content, $language, array $config = [])
    {
        return [
            'content' => $content,
            'language' => $language,
            'config' => $config
        ];
    }

    protected function CMTV_Code_getRenderedCode($option, array $getRenderedCode)
    {
        return $this->templater->renderTemplate('public:bb_code_tag_code', [
            'content' => new \XF\PreEscaped($getRenderedCode['content']),
            'language' => $getRenderedCode['language'],
            'config' => $getRenderedCode['config'],
            'options' => $option
        ]);
    }
}