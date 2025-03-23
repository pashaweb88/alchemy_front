import { FC, useEffect, useRef } from 'react';
import styles from './styles.module.css';
import { game } from '@shared/game';

export const PixiCanvas: FC = () => {
  const pixiContainer = useRef<HTMLDivElement>(null);

  const init = async () => {
    // setTimeout(() => {
    //   // game.app.canvas.width = pixiContainer.current?.clientWidth || 100;
    //   // game.app.canvas.height = pixiContainer.current?.clientHeight || 100;
    //   game.app.resizeTo = document.getElementById('game-board') as any;
    //   game.createNav();
    // }, 1);

    // Добавляем PixiJS canvas в DOM
    // game.app.resizeTo = pixiContainer?.current as any;
    pixiContainer.current?.appendChild(game.app.canvas);
    game.app.resizeTo = document.getElementById('game-board') as any;
    game.createNav();
  };
  useEffect(() => {
    init();

    return () => {
      // appRef.current?.destroy(true);
    };
  }, []);

  return <div id="game-board" className={styles.board} ref={pixiContainer} />;
};

export default PixiCanvas;
