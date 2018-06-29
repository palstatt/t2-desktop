import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './app'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import registerServiceWorker from './registerServiceWorker'
import { reducer as searchReducer, reduxSearch } from 'redux-search'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createEpicMiddleware } from 'redux-observable'
import { rootEpic } from './epics'

const rootReducer = combineReducers({
	...reducer,
	search: searchReducer,
})

const epicMiddleware = createEpicMiddleware()

const composeEnhancers = composeWithDevTools({})

const enhancer = composeEnhancers(
	applyMiddleware(epicMiddleware),
	reduxSearch({
		resourceIndexes: {
			companies: ['name', 'description'],
		},
		resourceSelector: (resourceName, state) => {
			return state.businessData.companies[resourceName]
		},
	})
)

const store = createStore(rootReducer, enhancer)

epicMiddleware.run(rootEpic)

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
)
registerServiceWorker()
