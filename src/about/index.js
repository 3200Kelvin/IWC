import { getCleanup } from "../common/helpers";

import { useAboutHero } from "./hero";
// import { useWhy } from "./why";
import { useStory } from "./story";
import { useTeam } from "./team";
import { useTestimonials } from "./testimonials";
import { useCtaButtons } from "../common/cta";

export const useAboutPageScripts = () => {
    return getCleanup(
        useAboutHero(),
        // useWhy(),
        useStory(),
        useTeam(),
        useTestimonials(),
        useCtaButtons(),
    );
};

export { useAboutPageScripts as usePageScripts };