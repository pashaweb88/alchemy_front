import { FC } from 'react';
import { Backdrop } from '@shared/components/Backdrop';
import { Scroll } from '@shared/components/Scroll';
import Typography from '@shared/components/Typography';
import ins1 from '@assets/icons/instruction/instruction-1.png';
import ins2 from '@assets/icons/instruction/instruction-2.png';
import ins3 from '@assets/icons/instruction/instruction-3.png';
import ins4 from '@assets/icons/instruction/instruction-4.svg';
import ins5 from '@assets/icons/instruction/instruction-5.svg';
import { Flex } from '@shared/components/Flex';
import { spacing } from '@shared/mixins/MixSpacing';

interface TutorModalProps {
  open?: boolean;
  onClose?: () => void;
}

export const TutorModal: FC<TutorModalProps> = ({ open, onClose }) => {
  const size = 14;
  return (
    <Backdrop open={open} onClose={onClose}>
      <Scroll>
        <Flex className={spacing({ p: '3x' })} gap="m" direction="column" align="center" fullWidth>
          <Typography styles={{ width: '100%', fontWeight: 700 }} align="left" size={20}>
            Инструкция:
          </Typography>
          <div>
            <Typography size={size}>
              1. Перед вами экран для созданиях новых элементов из тех, что у вас в инвентаре.
            </Typography>
          </div>
          <div>
            <Typography size={size}>
              2. Для создания наведите один элемент на другой на этом экране. Если комбинация
              успешна вы это поймете. Если нет - попробуйте другую комбинацию, элементы не сгорают.
            </Typography>
          </div>
          <div style={{ width: '80%' }}>
            <img src={ins1} alt="instruction1" />
          </div>
          <div>
            <Typography size={size}>
              3. Для добавления элемента из инвентаря дважды кликните по нему.
            </Typography>
          </div>
          <div style={{ width: '80%' }}>
            <img src={ins2} alt="instruction2" />
          </div>
          <div>
            <Typography size={size}>
              4. Чтобы переместить элемент из рабочей области в инвентарь зажмите его и перетащите
              его на икону инвентаря, а чтобы продать переместите на иконку с продажей.
            </Typography>
          </div>
          <div style={{ width: '80%' }}>
            <img src={ins3} alt="instruction3" />
          </div>
          <div>
            <Typography size={size}>
              5. Для покупки или продажи кликните на элемент в инвентаре и в новом окне выберите
              количество. Таким образом вы можете пополнить свой баланс монет продав ненужные сейчас
              элементы
            </Typography>
          </div>
          <div style={{ width: '60%' }}>
            <img src={ins4} alt="instruction4" />
          </div>
          <div>
            <Typography size={size}>
              6. Для того, чтобы очистить рабочую область от элементов нажмите на иконку очистить и
              все элементы вернуться в инвентарь.
            </Typography>
          </div>
          <div style={{ width: '50%' }}>
            <img src={ins5} alt="instruction5" />
          </div>
        </Flex>
      </Scroll>
    </Backdrop>
  );
};

export default TutorModal;
