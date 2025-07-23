import { getCleanup } from "../common/helpers";

import { useStory } from "./story";
import { useTeam } from "./team";
import { useTestimonials } from "./testimonials";

import './cta/style.scss';

export const useAboutPageScripts = () => {
    return getCleanup(
        useStory(),
        useTeam(),
        useTestimonials(),
    );
};