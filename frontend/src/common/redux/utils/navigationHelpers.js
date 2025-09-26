import { setReadyToNavigate } from "../navigationSlice";
import store from "../store";

export function dispatchAndSetReady(actions, callback) {
    actions.forEach((action) => store.dispatch(action))
    store.dispatch(setReadyToNavigate(true))
    if (callback) callback()
}