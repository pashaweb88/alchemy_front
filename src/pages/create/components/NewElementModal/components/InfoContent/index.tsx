import React, { FC } from 'react';
import { Flex, FlexProps } from '@shared/components/Flex';

type InfoContentProps = {
  title?: string;
  children?: React.ReactNode;
  titleColor?: string;
  titleSize?: string;
  className?: string;
} & Pick<FlexProps, 'justify'>;

export const InfoContent: FC<InfoContentProps> = ({
  title,
  children,
  titleSize = '10px',
  titleColor = '#EAD0A5',
  justify = 'center',
  className
}) => {
  return (
    <Flex direction="column" className={className} fullWidth>
      <Flex justify={justify} align="center">
        <p color="" style={{ color: titleColor, fontSize: titleSize }}>
          {title}
        </p>
      </Flex>
      <Flex justify={justify} align="center">
        {children}
      </Flex>
    </Flex>
  );
};

export default InfoContent;
