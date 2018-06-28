import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './app'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import registerServiceWorker from './registerServiceWorker'
import { createEpicMiddleware } from 'redux-observable'
import { reducer as searchReducer, reduxSearch } from 'redux-search'
import { composeWithDevTools } from 'redux-devtools-extension'
import { rootEpic } from './epics'

const rootReducer = combineReducers({
	resources: reducer,
	search: searchReducer,
})

const epicMiddleware = createEpicMiddleware()

const composeEnhancers = composeWithDevTools({})

const store = createStore(
	rootReducer,
	composeEnhancers(
		applyMiddleware(epicMiddleware),
		reduxSearch({
			resourceIndexes: {
				companies: ['name'],
			},
			resourceSelector: (resourceName, state) =>
				state.resources.get(resourceName),
		})
	)
)

epicMiddleware.run(rootEpic)

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
)
registerServiceWorker()
