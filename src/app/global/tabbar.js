import React from 'react'
import { connect } from 'dva'
import { TabBar, Icon, Popover } from 'antd-mobile'
import { routerRedux, Link } from 'dva/router'
import IconFont from 'components/iconFont'
import Style from './tabbar.less'

class CreateBtn extends React.Component {
  state = {
    visible: false
  }

  handleVisibleChange = visible => {
    this.setState({
      visible
    })
  }

  render () {
    return (
      <Popover
        overlayClassName="fortest"
        overlayStyle={{ color: 'currentColor' }}
        visible={this.state.visible}
        onVisibleChange={this.handleVisibleChange}
        onSelect={this.handleVisibleChange.bind(this, false)}
        overlay={[(
          <Popover.Item
            key="5"
            value="article/create"
            icon={<Icon type="check-circle" />}
            style={{ whiteSpace: 'nowrap' }}
          ><Link to="/article/create">创建文章</Link></Popover.Item>
        ), (
          <Popover.Item
            key="6"
            value="things/create"
            icon={<Icon type="check-circle" />}
          >
            <Link to="/things/create">发朋友圈</Link>
          </Popover.Item>
        )]}
        placement="top"
      >
        <span style={{ fontSize: 20 }}> + </span>
      </Popover>
    )
  }
}

const TabIcon = (props) => {
  return (
    <IconFont className={Style.iconfont} {...props} />
  )
}

const tabbarConf = {
  tabbar: {
    barTintColor: 'white',
    tintColor: 'purple'
  },
  items: [{
    title: '首页',
    key: 'home',
    icon: <TabIcon type="icon-homer-copy" />,
    onPress: ({ dispatch }) => { dispatch(routerRedux.replace('/home')) },
    selectedIcon: <TabIcon type="icon-homer-copy" />
  },
  {
    title: '江湖',
    key: 'life',
    icon: <TabIcon type="icon-life" />,
    onPress: ({ dispatch }) => { dispatch(routerRedux.replace('/life')) },
    selectedIcon: <TabIcon type="icon-life" />
  },
  {
    key: 'article/create',
    selectedIcon: <CreateBtn />,
    icon: <CreateBtn />
  },
  {
    title: '聊天',
    key: 'chat',
    icon: <TabIcon type="icon-liaotian" />,
    onPress: ({ dispatch }) => { dispatch(routerRedux.replace('/chat')) },
    selectedIcon: <TabIcon type="icon-liaotian" />
  },
  {
    title: '我的',
    key: 'user',
    icon: <TabIcon type="icon-wode" />,
    onPress: ({ dispatch }) => { dispatch(routerRedux.replace('/user')) },
    selectedIcon: <TabIcon type="icon-wode" />
  }]
}

function mapStateToProps ({ env }) {
  return {
    tabbar: env.tabbar
  }
}

@connect(mapStateToProps)
class TabbarComponent extends React.Component {
  constructor (props) {
    super(props)

    const tabName = props.location.pathname.slice(1) || 'home'
    this.state = {
      selectedTab: tabName,
      content: {
        [tabName]: props.children
      }
    }
  }

  componentWillUpdate (nextProps, nextState) {
    /* eslint-disable */
    const { selectedTab } = nextState
    nextState.content[selectedTab] = nextProps.children
    /* eslint-enable */
  }

  handlePress = key => {
    this.setState({
      selectedTab: key
    })
  }

  render () {
    const { selectedTab, content } = this.state
    const { dispatch } = this.props
    return (
      <div
        className={Style.wrapper}
        style={{ position: 'fixed', height: '100%', width: '100%', top: 0 }}
      >
        <TabBar
          {...tabbarConf.tabbar}
          hidden={!this.props.tabbar.visible}
        >
          {tabbarConf.items.map(conf => {
            return (
              <TabBar.Item
                {...conf}
                selected={selectedTab === conf.key}
                onPress={() => {
                  this.handlePress(conf.key)
                  if (conf.onPress) {
                    conf.onPress({
                      conf,
                      dispatch
                    })
                  }
                }}
              >
                { content[conf.key] }
              </TabBar.Item>
            )
          })}
        </TabBar>
      </div>
    )
  }
}

export default TabbarComponent
