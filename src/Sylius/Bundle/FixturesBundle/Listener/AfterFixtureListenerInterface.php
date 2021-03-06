<?php

/*
 * This file is part of the Sylius package.
 *
 * (c) Paweł Jędrzejewski
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Sylius\Bundle\FixturesBundle\Listener;

/**
 * @author Kamil Kokot <kamil@kokot.me>
 */
interface AfterFixtureListenerInterface extends ListenerInterface
{
    /**
     * @param FixtureEvent $fixtureEvent
     * @param array $options
     */
    public function afterFixture(FixtureEvent $fixtureEvent, array $options);
}
