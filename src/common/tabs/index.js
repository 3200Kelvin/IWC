import './style.scss';

export const useTabs = (block) => {
    const tabs = block.querySelectorAll('[data-tab]');

    if (!tabs.length) {
        return;
    }

    let active = null;

    const groups = [...tabs].reduce((acc, tab) => {
        const id = tab.dataset.tab;
        const trigger = block.querySelector(`[data-tab-trigger="${id}"]`);

        acc[id] = { tab, trigger };

        return acc;
    }, {});

    const cleanups = Object.entries(groups).map(([id, { trigger }]) => {
        trigger.addEventListener('click', () => setTab(id));

        return () => trigger.removeEventListener('click', () => setTab(id));
    });

    setTab(tabs[0].dataset.tab);

    return () => cleanups.forEach((cleanup) => cleanup());

    function setTab(id) {
        if (!active) {
            Object.entries(groups)
                .filter(([ groupId ]) => groupId !== id)
                .forEach(([groupId, { tab }]) => (tab.style.display = 'none'));

            groups[id].trigger.classList.add('active');
            active = id;
            return;
        }

        if (active === id) {
            return;
        }

        groups[active].trigger.classList.remove('active');
        groups[id].trigger.classList.add('active');

        gsap.timeline()
            .to(groups[active].tab, { opacity: 0, duration: 0.4 })
            .to(groups[active].tab, { display: 'none' })
            .to(groups[id].tab, { display: 'block' })
            .to(groups[id].tab, { opacity: 1, duration: 0.4 })
            .add(() => (active = id));
    }
};
