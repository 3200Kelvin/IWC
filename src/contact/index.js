import { useContactLocations } from "./locations";

import { getCleanup } from "../common/helpers";

export const useContactPageScripts = () => {
    return getCleanup(
        useContactLocations(),
    );
};

export { useContactPageScripts as usePageScripts };
