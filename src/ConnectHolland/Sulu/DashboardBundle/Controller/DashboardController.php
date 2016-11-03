<?php
namespace ConnectHolland\Sulu\DashboardBundle\Controller;

use ConnectHolland\Sulu\DashboardBundle\Dashboard\DashboardManager;
use FOS\RestBundle\Controller\Annotations\Get;
use FOS\RestBundle\Controller\FOSRestController;
use Sulu\Component\Rest\ListBuilder\Doctrine\FieldDescriptor\DoctrineFieldDescriptor;
use Sulu\Component\Rest\ListBuilder\ListRepresentation;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class DashboardController extends FOSRestController
{
    const ENTITY_NAME = 'ConnectHollandSuluDashboardBundle:DashboardItem';

    private function getFieldDescriptors()
    {
        return [
            'id' => new DoctrineFieldDescriptor(
                'id',
                'id',
                self::ENTITY_NAME,
                'public.id',
                [],
                true
            ),
            'title' => new DoctrineFieldDescriptor(
                'title',
                'title',
                self::ENTITY_NAME,
                'public.title'
            ),
            'content' => new DoctrineFieldDescriptor(
                'content',
                'content',
                self::ENTITY_NAME,
                'dashboard.content'
            )
        ];
    }

    public function getDashboardFieldsAction()
    {
        return $this->handleView($this->view(array_values($this->getFieldDescriptors())));
    }

    public function getDashboardListAction(Request $request)
    {
        $restHelper = $this->get('sulu_core.doctrine_rest_helper');
        $factory = $this->get('sulu_core.doctrine_list_builder_factory');

        $listBuilder = $factory->create(self::ENTITY_NAME);
        $restHelper->initializeListBuilder($listBuilder, $this->getFieldDescriptors());
        $results = $listBuilder->execute();

        $list = new ListRepresentation(
            $results,
            'dashboard-items',
            'get_dashboard_list',
            $request->query->all(),
            $listBuilder->getCurrentPage(),
            $listBuilder->getLimit(),
            $listBuilder->count()
        );

        $view = $this->view($list, 200);

        return $this->handleView($view);
    }

    /**
     * Returns a single dashboard-item identified by id.
     *
     * @param int $id
     *
     * @return Response
     */
    public function getDashboardAction($id)
    {
        $dashboardItem = $this->getManager()->read($id);
        return $this->handleView($this->view($dashboardItem));
    }
    /**
     * Create a new dashboard-item and returns it.
     *
     * @param Request $request
     *
     * @return Response
     */
    public function postDashboardAction(Request $request)
    {
        $dashboardItem = $this->getManager()->create($request->request->all());
        $this->flush();
        return $this->handleView($this->view($dashboardItem));
    }
    /**
     * Update a dashboard-item with given id and returns it.
     *
     * @param Request $request
     *
     * @return Response
     */
    public function putDashboardAction($id, Request $request)
    {
        $dashboardItem = $this->getManager()->update($id, $request->request->all());
        $this->flush();
        return $this->handleView($this->view($dashboardItem));
    }
    /**
     * Delete dashboard-item.
     *
     * @param int $id
     *
     * @return Response
     */
    public function deleteDashboardAction($id)
    {
        $this->getManager()->delete($id);
        $this->flush();
        return $this->handleView($this->view());
    }
    /**
     * Returns service for dashboard-items.
     *
     * @return DashboardManager
     */
    private function getManager()
    {
        return $this->get('example_dashboard.manager');
    }
    /**
     * Flushes database.
     */
    private function flush()
    {
        $this->get('doctrine.orm.entity_manager')->flush();
    }
}