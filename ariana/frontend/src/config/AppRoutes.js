import React from 'react'
import { Switch, HashRouter, Route, BrowserRouter } from 'react-router-dom'
import AppContainer from '../components/AppContainer'
import QuestApp from '../components/QuestApp'

const AppRoutes = () => (
    <BrowserRouter >
        <Switch>
            <Route exact path="/" component={AppContainer} />
            <Route path="/:slug" component={QuestApp} />
        </Switch>
    </BrowserRouter>
)
export default AppRoutes