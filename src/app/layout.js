import React from 'react'
import { connect } from 'dva'
import { Route, Switch } from 'dva/router'
import TabBar from './global/tabbar'
import Home from './home'
import UserInfo from './user/UserInfo'
import EditUser from './user/EditUser'
import Chat from './chat/list'
import ChatingBox from './chat/box.js'
import Life from './life'
import ArticleDetail from './article/detail'
import ArticleCreate from './article/create'
import ThingsCreate from './life/things/create'

const Layout = props => {
  return (
    <div>
      <TabBar {...props}>
        <Switch>
          <Route exect path="/home" component={Home} />
          <Route exect path="/life" component={Life} />
          <Route exect path="/things/create" component={ThingsCreate} />
          <Route exect path="/chat" component={Chat} />
          <Route exect path="/chat/:userId" component={ChatingBox} />
          <Route exect path="/user" component={UserInfo} />
          <Route exect path="/edit" component={EditUser} />
          <Route exect path="/article/create" component={ArticleCreate} />
          <Route exect path="/article/:id" component={ArticleDetail} />
          <Route exect path="/" component={Home} />
        </Switch>
      </TabBar>
    </div>
  )
}

export default connect()(Layout)
