import { CustomContentProps, SnackbarContent } from 'notistack';
import { forwardRef } from 'react';
import { Typography } from '@shared/components/Typography';

import styles from './styles.module.css';
interface SnackbarSuccessProps extends CustomContentProps {
  allowDownload: boolean;
}

export const SnackbarSuccess = forwardRef<HTMLDivElement, SnackbarSuccessProps>((props, ref) => {
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
SnackbarSuccess.displayName = 'SnackbarSuccess';
export default SnackbarSuccess;
