import React from 'react';
import classNames from 'classnames';

export type ButtonSize = 'lg' | 'sm'
export type ButtonType = 'primary' | 'default' | 'danger' | 'link'

interface BaseButtonProps {
  className?: string;
  disabled?: boolean;
  size?: ButtonSize;
  btnType?: ButtonType;
  children?: React.ReactNode;
  href?: string;
}
// button 的原生属性
type NativeButtonProps = BaseButtonProps & React.ButtonHTMLAttributes<HTMLElement>
type AnchorButtonProps = BaseButtonProps & React.AnchorHTMLAttributes<HTMLElement>
// 导出交叉属性，Partial设置属性可选
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>
const Button: React.FC<ButtonProps> = (props) => {
  const { btnType, className, disabled, size, children, href, ...restProps } = props
  const classes = classNames('btn', className, {
    [`btn-${btnType}`] : btnType,
    [`btn-${size}`] : size,
    // a标签没有 disabled 属性，所以要做特殊处理
    'disabled': (btnType === 'link') && disabled
  })
  if (btnType === 'link' && href ) {
    return (
      <a
        className={classes}
        href={href}
        {...restProps}
      >
        {children}
      </a>
    )
  } else {
    return (
      <button
        className={classes}
        disabled={disabled}
        {...restProps}
      >
        {children}
      </button>
    )
  }
}

Button.defaultProps = {
  disabled: false,
  btnType: 'default'
}

export default Button