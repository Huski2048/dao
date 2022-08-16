import React from 'react'
import { Router, Route, Switch, Redirect } from 'react-router-dom'
import { ResetCSS } from '@huskifinance/huski-frontend-uikit'
import useEagerConnect from 'hooks/useEagerConnect'
import GlobalStyle from './style/Global'
import { ToastListener } from './contexts/ToastsContext'
import history from './routerHistory'
import Dao from './views/Dao'

const App: React.FC = () => {
  useEagerConnect()

  return (
    <Router history={history}>
      <ResetCSS />
      <GlobalStyle />
      <Switch>
        <Route path="/" exact>
          <Dao />
        </Route>
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
      <ToastListener />
    </Router>
  )
}

export default React.memo(App)
