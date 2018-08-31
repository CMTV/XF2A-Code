<?php

namespace Code\XF\Data;

class CodeLanguage extends XFCP_CodeLanguage
{
    public function getSupportedLanguages($filterDisabled = false)
    {
        $languages = parent::getSupportedLanguages($filterDisabled);
        $commonLanguages = preg_split('/\r?\n/', \XF::options()->Code_commonCodeLanguages, -1, PREG_SPLIT_NO_EMPTY);

        foreach ($languages as &$language)
        {
            if (array_key_exists('common', $language))
            {
                $language['common'] = false;
            }
        }

        $defaultCodeLanguage = \XF::options()->Code_defaultCodeLanguage;

        if (array_key_exists($defaultCodeLanguage, $languages))
        {
            $languages[$defaultCodeLanguage]['Code_default_language'] = true;
        }

        foreach ($commonLanguages as $commonLanguage)
        {
            if (array_key_exists($commonLanguage, $languages))
            {
                $languages[$commonLanguage]['common'] = true;
            }
        }

        return $languages;
    }
}