import { FC } from 'react';
import { Backdrop } from '@shared/components/Backdrop';
import { useElementsStore } from '@shared/models/elements';
import { Flex } from '@shared/components/Flex';
import { InventoryItem } from '..';
import { Element } from '@shared/models/elements';
import styles from './styles.module.css';
import { Scroll } from '@shared/components/Scroll';

interface InventoryModalProps {
  open?: boolean;
  onElementAddHandle?: (element: Element) => void;
  onClose?: () => void;
}

export const InventoryModal: FC<InventoryModalProps> = ({
  open = false,
  onElementAddHandle,
  onClose
}) => {
  const { elements } = useElementsStore();

  return (
    <Backdrop open={open} widthPercent={90} onClose={onClose}>
      <Scroll>
        {Object.entries(elements).map(([level, data], index) => {
          return (
            <div key={index}>
              <p>Elements level {level}</p>
              <Flex className={styles['row-fix']} justify="space-between">
                {new Array(data.totalElements).fill(false).map((_, index) => {
                  const element = data.openedElements[index];
                  if (!element) {
                    return <InventoryItem key={index} />;
                  }
                  return (
                    <InventoryItem
                      element={element}
                      key={index}
                      onDoubleClick={() => onElementAddHandle?.(element)}
                    />
                  );
                })}
              </Flex>
            </div>
          );
        })}
      </Scroll>
    </Backdrop>
  );
};

export default InventoryModal;
