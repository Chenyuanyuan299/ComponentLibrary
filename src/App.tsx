import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import Button from './components/Button/button'
import Menu from './components/Menu/menu'
import MenuItem from './components/Menu/menuItem'
import SubMenu from './components/Menu/subMenu'
import Alert from './components/Alert/alert'
import Icon from './components/Icon/icon'
import Tabs from './components/Tabs/tabs'
import TabItem from './components/Tabs/tabItem'
library.add(fas)

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Button className="custom"> Hello </Button>
        <Button disabled> Disabled Button</Button>
        <Button btnType='primary' size='lg'> Large Button </Button>
        <Button btnType='danger' size='sm'> Small Button </Button>
        <Button btnType='link' href="https://www.baidu.com/?tn=88093251_22_hao_pg" target="_blank"> Baidu Link </Button>
        <Button disabled btnType='link'> Baidu Link </Button>
        <Menu defaultIndex='0' onSelect={(index) => {alert(index)}}>
          <MenuItem>
            first
          </MenuItem>
          <MenuItem>
            second
          </MenuItem>
          <SubMenu title="subMenu">
            <MenuItem>
              subMenu-item 1
            </MenuItem>
            <MenuItem>
              subMenu-item 2
            </MenuItem>
            <MenuItem>
              subMenu-item 3
            </MenuItem>
          </SubMenu>
          <MenuItem disabled>
            third
          </MenuItem>
        </Menu>
        <Menu defaultIndex='0' mode={'vertical'} defaultOpenSubMenus={['2']}>
          <MenuItem>
            first
          </MenuItem>
          <MenuItem>
            second
          </MenuItem>
          <SubMenu title="subMenu">
            <MenuItem>
              subMenu-item 1
            </MenuItem>
            <MenuItem>
              subMenu-item 2
            </MenuItem>
            <MenuItem>
              subMenu-item 3
            </MenuItem>
          </SubMenu>
          <MenuItem disabled>
            third
          </MenuItem>
        </Menu>
        <Icon icon="coffee" theme="danger" size="10x"/>
        <Icon icon="arrow-down" theme="primary" size="10x"/>
        <Alert title="success" type="success" description="success alert"></Alert>
        <Tabs type="card">
          <TabItem label='card1'>this is card one</TabItem>
          <TabItem label="card2">this is content two</TabItem>
          <TabItem label="disabled" disabled>this is content three</TabItem>
        </Tabs> 
      </header>
    </div>
  );
}

export default App;
