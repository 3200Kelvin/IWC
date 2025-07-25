import { getCleanup } from "../common/helpers";

import { useAboutHero } from "./hero";
import { useStory } from "./story";
import { useTeam } from "./team";
import { useTestimonials } from "./testimonials";

import './cta/style.scss';
import './why/style.scss';

export const useAboutPageScripts = () => {
    return getCleanup(
        useAboutHero(),
        useStory(),
        useTeam(),
        useTestimonials(),
    );
};