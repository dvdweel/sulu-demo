<?php

namespace ConnectHolland\Sulu\DashboardBundle\Admin;

use Sulu\Bundle\AdminBundle\Admin\Admin as SuluAdmin;
use Sulu\Bundle\AdminBundle\Navigation\Navigation;
use Sulu\Bundle\AdminBundle\Navigation\NavigationItem;

class Admin extends SuluAdmin
{
    /**
     * Constructor
     *
     * @param string $title
     */
    public function __construct($title)
    {
        $rootNavigationItem = new NavigationItem($title);

        $section = new NavigationItem('navigation.webspaces');

        $global = new NavigationItem('bundle.test');
        $section->addChild($global);

        $news = new NavigationItem('navigation.news');
        $news->setAction('example/news');
        $global->addChild($news);

        $rootNavigationItem->addChild($section);

        $this->setNavigation(new Navigation($rootNavigationItem));
    }



}
