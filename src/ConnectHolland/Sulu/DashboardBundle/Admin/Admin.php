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

        $section = new NavigationItem('dashboard');
        $section->setPosition(1);

        $rootNavigationItem->addChild($section);

        $dashboard = new NavigationItem('Dashboard');
        $dashboard->setAction('connectholland/dashboard');
        $dashboard->setPosition(10);
        $dashboard->setIcon('dashboard');

        $section->addChild($dashboard);
        $this->setNavigation(new Navigation($rootNavigationItem));
    }

    public function getJsBundleName()
    {
        return 'connecthollandsuludashboard';
    }

}
