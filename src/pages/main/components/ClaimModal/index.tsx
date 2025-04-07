import { FC, useState } from 'react';
import { Button } from '@shared/components/Button';
import { claim } from '@shared/api/claim';
import { getUserData } from '@shared/models/user';
import WebApp from '@twa-dev/sdk';
import coinClaim from '../../images/coin-claim.png';
import { Backdrop } from '@shared/components/Backdrop';
import { Flex } from '@shared/components/Flex';
import { Typography } from '@shared/components/Typography';
import { spacing } from '@shared/mixins/MixSpacing';

interface ClaimModalProps {
  open?: boolean;
}
export const ClaimModal: FC<ClaimModalProps> = ({ open }) => {
  const [loading, setLoading] = useState(false);
  const clickHandle = async () => {
    try {
      setLoading(true);
      const tgUser = WebApp.initDataUnsafe.user;
      if (!tgUser?.id) {
        console.log('No tg user');
        return setLoading(false);
      }
      const data = await claim({ id: tgUser?.id || 0 });

      if (data.result?.success) {
        await getUserData();
      }

      setLoading(false);
    } catch (e) {
      console.error('CLIAM ERROR');
    }
  };
  return (
    <Backdrop width={320} open={open}>
      <Flex gap="s" className={spacing({ px: '1x' })} align="center">
        <img style={{ transform: 'scale(1.2)' }} src={coinClaim} alt="claim" />
        <Typography align="center" size={16} weight={600}>
          Mastery of the elements has earned coins for you
        </Typography>
        <Typography styles={{ width: '100%' }} align="center" size={48} weight={600}>
          3,15К
        </Typography>
        <Button loading={loading} onClick={clickHandle}>
          Claim
        </Button>
      </Flex>
    </Backdrop>
  );
};

export default ClaimModal;
