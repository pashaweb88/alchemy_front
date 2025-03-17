import { FC, ReactNode, HTMLAttributes } from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

export type FlexProps = {
  children?: ReactNode;
  direction?: 'column' | 'row';
  align?: 'start' | 'center' | 'end' | 'stretch';
  justify?: 'start' | 'end' | 'center' | 'space-between';
  fullWidth?: boolean;
  gap?: '0' | 'xs' | 's' | 'm' | 'l' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | '8xl';
  noWrap?: boolean;
} & HTMLAttributes<HTMLDivElement>;

export const Flex: FC<FlexProps> = props => {
  const {
    children,
    direction = 'row',
    gap = '0',
    align,
    justify,
    fullWidth = false,
    noWrap = false
  } = props;
  return (
    <div
      {...props}
      className={clsx(
        styles.base,
        styles[`_${direction}`],
        align && styles[`_align_${align}`],
        justify && styles[`_justify_${justify}`],
        gap && styles[`_gap_${gap}`],
        noWrap && styles['_no-wrap'],
        fullWidth && styles[`_full`],
        props.className
      )}
    >
      {children}
    </div>
  );
};

export default Flex;
