import { FC, ReactNode } from 'react';
import frame from '../../images/task-frame.png';
import { Flex } from '@shared/components/Flex';
import styles from './styles.module.css';
import clsx from 'clsx';
import { spacing } from '@shared/mixins/MixSpacing';

interface TaskProps {
  children?: ReactNode;
  RenderBefore?: ReactNode;
  RenderAfter?: ReactNode;
  disabled?: boolean;
  onClick?: () => void;
}

export const Task: FC<TaskProps> = ({
  children,
  RenderAfter,
  RenderBefore,
  disabled = false,
  onClick
}) => {
  return (
    <div onClick={onClick} className={clsx(styles.task, disabled && styles.disabled)}>
      <img src={frame} alt="rame" />
      <Flex
        gap="xs"
        className={clsx(styles.content, spacing({ pr: '4x' }))}
        align="center"
        fullWidth
        noWrap
      >
        <div className={styles.icon}>{RenderBefore}</div>
        <div className={styles.title}>{children}</div>
        <div className={clsx(styles.button)}>{RenderAfter}</div>
      </Flex>
    </div>
  );
};

export default Task;
