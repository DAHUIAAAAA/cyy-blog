import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import allReducers from './redux/reducers'

const 
    initState = {},
    middlewares = [thunk]
    // enhancer = []

// if(process.env.NODE_ENV === 'development') {
//     if(typeof window.devToolsExtension === 'function') {
//         enhancer.push(devToolsExtension())
//     }
// }

const composeEnhancers = compose(applyMiddleware(...middlewares))

export default createStore(allReducers, initState, composeEnhancers)
