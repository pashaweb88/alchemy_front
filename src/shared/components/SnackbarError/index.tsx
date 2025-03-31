import { CustomContentProps, SnackbarContent } from 'notistack';
import { forwardRef } from 'react';
import { Typography } from '@shared/components/Typography';

import styles from './styles.module.css';
interface SnackbarErrorProps extends CustomContentProps {
  allowDownload: boolean;
}

export const SnackbarError = forwardRef<HTMLDivElement, SnackbarErrorProps>((props, ref) => {
  const {
    id,
    message,
    // allowDownload,
    ...other
  } = props;

  return (
    <SnackbarContent id={id.toString()} ref={ref} role="alert" {...other}>
      <div className={styles.snackbar}>
        <Typography>{message}</Typography>
      </div>
    </SnackbarContent>
  );
});
SnackbarError.displayName = 'SnackbarError';
export default SnackbarError;
