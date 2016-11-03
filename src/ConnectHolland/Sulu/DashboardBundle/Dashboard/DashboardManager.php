<?php
namespace ConnectHolland\Sulu\DashboardBundle\Dashboard;

use Doctrine\ORM\EntityManagerInterface;
use ConnectHolland\Sulu\DashboardBundle\Entity\DashboardItem;

class DashboardManager
{
    /**
     * @var EntityManagerInterface
     */
    private $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    /**
     * Creates a new news-item and set the data which are passed.
     *
     * @param array $data mandatory: title; optional: teaser, description
     *
     * @return DashboardItem
     */
    public function create(array $data)
    {
        $entity = $this->bind(new DashboardItem(), $data);
        $this->entityManager->persist($entity);
        return $entity;
    }

    /**
     * Returns news-item with given id.
     *
     * @param int $id
     *
     * @return DashboardItem
     */
    public function read($id)
    {
        return $this->entityManager->find(DashboardItem::class, $id);
    }

    /**
     * Returns all news-items.
     *
     * @return DashboardItem[]
     */
    public function readAll()
    {
        return $this->entityManager->getRepository(DashboardItem::class)->findAll();
    }

    /**
     * Update the news-item with given id.
     *
     * @param int $id
     * @param array $data
     *
     * @return DashboardItem
     */
    public function update($id, array $data)
    {
        $entity = $this->read($id);
        return $this->bind($entity, $data);
    }

    /**
     * Delete the news-item with given id.
     *
     * @param int $id
     */
    public function delete($id)
    {
        $this->entityManager->remove($this->read($id));
    }

    /**
     * Bind data array to the given entity.
     *
     * @param DashboardItem $entity
     * @param array $data
     *
     * @return DashboardItem
     */
    protected function bind(DashboardItem $entity, array $data)
    {
        $entity->setTitle($data['title']);
        $entity->setContent($this->getValue($data, 'content'));
        return $entity;
    }

    /**
     * Returns property of given data array.
     * If the key not exists default value will be returned.
     *
     * @param array $data
     * @param string $property
     * @param mixed $default
     *
     * @return mixed
     */
    protected function getValue(array $data, $property, $default = '')
    {
        return array_key_exists($property, $data) ? $data[$property] : $default;
    }
}