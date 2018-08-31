<?php

namespace Code\XF\BbCode\Renderer;

class Html extends XFCP_Html
{
    private $Code_filename = null;

    public function renderTagCode(array $children, $option, array $tag, array $options)
    {
        if (strpos($option, '|') !== false)
        {
            $optionParts = explode('|', $option);

            $option = $optionParts[0];
            $this->Code_filename = $optionParts[1];
        }

        return parent::renderTagCode($children, $option, $tag, $options);
    }

    protected function getRenderedCode($content, $language, array $config = [])
    {
        $config['Code_filename'] = $this->Code_filename;

        $return = parent::getRenderedCode($content, $language, $config);

        $this->Code_filename = null;

        return $return;
    }
}