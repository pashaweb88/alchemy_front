import medal from '../images/medal.png';

export type FeatureType = {
  title: string;
  price: string;
  avatar: string;
  description: string;
  playerPercent: number;
};

export const FeatureMock = [
  {
    title: 'Открыть 10 элементов',
    price: '10 000',
    avatar: medal,
    description:
      'Figma ipsum component variant main layer. Line stroke distribute link strikethrough blur auto invite variant content. Italic italic pen opacity pen. Pixel variant overflow pixel mask strikethrough comment arrow horizontal. Ipsum distribute editor style scrolling.',
    playerPercent: 12
  }
];
