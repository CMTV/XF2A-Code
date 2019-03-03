<?php
/**
 * Code xF2 addon by CMTV
 * Enjoy!
 */

namespace CMTV\Code\XF\BbCode;

class RuleSet extends XFCP_RuleSet
{
    public function addDefaultTags()
    {
        parent::addDefaultTags();

        $this->tags['code']['supportOptionKeys'] = RuleSet::OPTION_KEYS_BOTH;
    }

    public function parseValidateCode($tag, $option)
    {
        if (!is_array($option))
        {
            return parent::parseValidateCode($tag, $option);
        }

        if (array_key_exists('lang', $option) && $option['lang'] == 'rich')
        {
            return true;
        }

        return ['plain' => true];
    }
}