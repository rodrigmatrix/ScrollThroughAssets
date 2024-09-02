// Code by https://github.com/thx114/mioHotkeysMod
import { ModRegistrar } from "cs2/modding";
import { load } from "./scroll-through-assets";

const register: ModRegistrar = (moduleRegistry) => {

    moduleRegistry.append('Game', load);
    moduleRegistry.append('Editor', load);
}

export default register;