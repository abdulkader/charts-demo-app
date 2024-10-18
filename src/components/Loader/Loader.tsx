import { cn } from '@/lib/utils';
import styles from './Loader.module.css';

export function Loader({
  className,
  size = '60px',
  color = '#fec76f',
  speed = '3.75s',
}: {
  className?: string;
  size?: string;
  color?: string;
  speed?: string;
}) {
  return (
    <div
      className={cn(styles.container, className)}
      style={
        {
          '--uib-size': size,
          '--uib-color': color,
          '--uib-speed': speed,
        } as React.CSSProperties
      }>
      <div className={styles.particle} />
      <div className={styles.particle} />
      <div className={styles.particle} />
      <div className={styles.particle} />
      <div className={styles.particle} />
      <div className={styles.particle} />
      <div className={styles.particle} />
      <div className={styles.particle} />
      <div className={styles.particle} />
      <div className={styles.particle} />
      <div className={styles.particle} />
      <div className={styles.particle} />
      <div className={styles.particle} />
    </div>
  );
}
