import { withNaming } from '@bem-react/classname';
import './styles.css';
export type MixSpacingSpaceMultiplier =
  | 0
  | 'auto'
  | '05x'
  | '1x'
  | '2x'
  | '3x'
  | '4x'
  | '5x'
  | '6x'
  | '8x'
  | '10x'
  | '12x'
  | '14x'
  | '16x'
  | '18x'
  | '20x';
export declare const mixSpacingSpaceVariant: (
  | 'p'
  | 'm'
  | 'mt'
  | 'mr'
  | 'ml'
  | 'mb'
  | 'mx'
  | 'my'
  | 'pt'
  | 'pr'
  | 'pl'
  | 'pb'
  | 'px'
  | 'py'
)[];
export type MixSpacingSpaceVariant = (typeof mixSpacingSpaceVariant)[number];

export type MixSpacingProps = {
  [key in MixSpacingSpaceVariant]?: MixSpacingSpaceMultiplier;
};

export const cn = withNaming({ n: '', e: '-', m: '_', v: '_' });
export const cnMixSpacing = cn('MixSpacing');

export const spacing = ({
  mt,
  mb,
  mr,
  mx,
  m,
  my,
  ml,
  pt,
  py,
  p,
  pr,
  px,
  pb,
  pl
}: MixSpacingProps = {}) => {
  const spacings = {
    mt: mt || my || m,
    mr: mr || mx || m,
    mb: mb || my || m,
    ml: ml || mx || m,
    pt: pt || py || p,
    pr: pr || px || p,
    pb: pb || py || p,
    pl: pl || px || p
  };

  return Object.entries(spacings).reduce((acc, [key, value]) => {
    if (value) {
      return acc + ` MixSpacing_${key}_${value}`;
    }
    return acc;
  }, '');
};
