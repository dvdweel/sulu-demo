<?php

namespace ConnectHolland\Sulu\DashboardBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class DefaultController extends Controller
{
    /**
     * @Route("/")
     */
    public function indexAction()
    {
        return $this->render('ConnectHollandSuluDashboardBundle:Default:index.html.twig');
    }
}
