import { FC, useState } from 'react';
import { Flex } from '@shared/components/Flex';
import { Typography } from '@shared/components/Typography';
import { DailyModal, Task } from '..';
import daily from '../../images/daily-avatar.png';
import arrowRight from '../../images/arrow-icon.png';
import CoinText from '@shared/components/CoinText';

export const Daily: FC = () => {
  const [show, setShow] = useState(false);

  const closeHandle = () => setShow(false);

  const openHandle = () => setShow(true);

  return (
    <>
      <Flex direction="column" gap="s" fullWidth>
        <Typography size={16} weight={600}>
          Ежедневная награда
        </Typography>

        <Task
          RenderBefore={<img src={daily} alt="daily-avatar" />}
          RenderAfter={<img src={arrowRight} alt="arrow" />}
          onClick={openHandle}
        >
          <Flex direction="column" fullWidth>
            <Typography size={12} weight={600}>
              Daily check-up
            </Typography>
            <CoinText>
              <Typography color="secondary" size={12}>
                5000
              </Typography>
            </CoinText>
          </Flex>
        </Task>
      </Flex>
      <DailyModal open={show} onClose={closeHandle} />
    </>
  );
};

export default Daily;
