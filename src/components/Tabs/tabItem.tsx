import React, { FC } from 'react'

export interface TabItemProps {
  label: string | React.ReactElement;
  disabled?: boolean;
}

export const TabItem: FC<TabItemProps> = ({ children }) => {
  return (
    <div className="tab-panel">
      {children}
    </div>
  )
}

export default TabItem;