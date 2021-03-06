import { createStore } from "redux";
import allReducers from "./components/reducers";


function saveToLocalStorage(state) {
    try {
        const serializedState = JSON.stringify(state.purchase)
        localStorage.setItem('state', serializedState)
    } catch (err) {
        console.log(err)
    }
}

function loadFromLocalStorage() {
    try {
        const serializedState = localStorage.getItem('state')
        if (serializedState === null) {
            return undefined
        }
        else {
            return JSON.parse(serializedState)
        }
    } catch (err) {
        console.log(err)
        return undefined
    }
}

export default function configureStore(initialState) {
    const persistedState = loadFromLocalStorage();

    if (persistedState) {
        initialState = {
            ...initialState,
            purchase: persistedState
        }
    }

    const store = createStore(
        allReducers,
        initialState,
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );

    store.subscribe(() => saveToLocalStorage(store.getState()))

    return store;
}