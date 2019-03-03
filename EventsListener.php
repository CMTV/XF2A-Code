<?php
/**
 * Code xF2 addon by CMTV
 * Enjoy!
 */

namespace CMTV\Code;

use XF\Util\Arr;

class EventsListener
{
    public static function commonLanguages(array &$data, \XF\Mvc\Controller $controller)
    {
        $commonLanguages = Arr::stringToArray(\XF::options()->CMTV_Code_commonLanguages, '/\r?\n/');

        foreach ($commonLanguages as $key => $commonLanguage)
        {
            if (!array_key_exists($commonLanguage, $data['params']['languages']))
            {
                unset($commonLanguages[$key]);
            }
        }

        $data['params']['commonLanguages'] = $commonLanguages;
    }
}