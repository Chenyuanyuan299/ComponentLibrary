import React from 'react';
import { render, RenderResult, fireEvent } from '@testing-library/react'
import Menu, { MenuProps } from './menu'
import MenuItem from './menuItem'
import SubMenu from './subMenu'

const testProps: MenuProps = {
  defaultIndex: '0',
  onSelect: jest.fn(),
  className: 'test'
}
const testVerticalProps: MenuProps = {
  defaultIndex: '0',
  mode: 'vertical',
  defaultOpenSubMenus: ['4']
}
const generateMenu = (props: MenuProps) => {
  return (
    <Menu {...props}>
      <MenuItem index='0'>
        active
      </MenuItem>
      <MenuItem index='1' disabled>
        disabled
      </MenuItem>
      <MenuItem index='2'>
        default
      </MenuItem>
      <SubMenu title="dropdown">
        <MenuItem>
          drop1
        </MenuItem>
      </SubMenu>
      <SubMenu title="opened">
        <MenuItem>
          opened1
        </MenuItem>
      </SubMenu>
    </Menu>
  )
}
const createStyleFile = () => {
  const cssFile: string = `
    .submenu { 
      display: none;
    }
    .submenu.menu-opened {
      display: block
    }
  `
  const style = document.createElement('style')
  style.innerHTML = cssFile
  return style 
}
let wrapper: RenderResult, wrapper2: RenderResult, menuElement: HTMLElement, activeElement: HTMLElement, disabledElement: HTMLElement 
describe('test Menu and MenuItem component in default(horizontal) mode', () => {
  beforeEach(() => {
    wrapper = render(generateMenu(testProps))
    wrapper.container.append(createStyleFile())
    menuElement = wrapper.getByTestId('test-menu')
    activeElement = wrapper.getByText('active')
    disabledElement = wrapper.getByText('disabled')
  })
  it('should render correct Menu and MenuItem based on default props', () => {
    expect(menuElement).toBeInTheDocument()
    expect(menuElement).toHaveClass('menu test')
    // expect(menuElement.getElementsByTagName('li').length).toEqual(5)
    expect(menuElement.querySelectorAll(':scope > li').length).toEqual(5)
    expect(activeElement).toHaveClass('menu-item is-active')
    expect(disabledElement).toHaveClass('menu-item is-disabled')
  })
  it('click items should change active and call the right callback', () => {
    const thirdItem = wrapper.getByText('default')
    fireEvent.click(thirdItem)
    expect(thirdItem).toHaveClass('is-active')
    expect(activeElement).not.toHaveClass('is-active')
    expect(testProps.onSelect).toHaveBeenCalledWith('2')
    fireEvent.click(disabledElement)
    expect(disabledElement).not.toHaveClass('is-active')
    expect(testProps.onSelect).not.toHaveBeenCalledWith('1')
  })
  // it('should show dropdown items when hover on subMenu', async () => {
  //   // 控制下拉列表的节点
  //   const dropdownElement = wrapper.getByText('dropdown')
  //   // 下拉列表里的项目
  //   const dropDownItem = wrapper.queryByText('drop1')
  //   expect(dropDownItem).not.toBeVisible()
  //   fireEvent.mouseEnter(dropdownElement)
  //   // 悬停显示是异步操作，测试时应该也使用异步方法
  //   await waitFor(() => 
  //     expect(dropDownItem).toBeVisible()
  //   )
  //   // 点击下拉列表的单个项目
  //   fireEvent.click(wrapper.getByText('drop1'))
  //   expect(testProps.onSelect).toHaveBeenCalledWith('3-0')
  //   fireEvent.mouseLeave(dropdownElement)
  //   await waitFor(() => 
  //     expect(dropDownItem).not.toBeVisible()
  //   )
  // })
})
describe('test Menu and MenuItem component in vertical mode', () => {
  beforeEach(() => {
    wrapper2 = render(generateMenu(testVerticalProps))
    wrapper2.container.append(createStyleFile())
  })
  it('should render vertical mode when mode is set to vertical', () => {
    menuElement = wrapper.getByTestId('test-menu')
    expect(menuElement).toHaveClass('menu-vertical')
  })
  // it('should show dropdown items when click on subMenu for vertical mode', () => {
  //   const dropDownItem = wrapper2.queryByText('drop1')
  //   expect(dropDownItem).not.toBeVisible()
  //   fireEvent.click(wrapper2.getByText('dropdown'))
  //   expect(dropDownItem).toBeVisible()
  // })
  it('should show subMenu dropdown when defaultOpenSubMenus contains SubMenu index', () => {
    expect(wrapper2.queryByText('opened1')).toBeVisible()
  })
})