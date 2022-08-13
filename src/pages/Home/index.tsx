import { Clock } from 'components';
import styles from './styles.module.scss';

export const Home = () => {
  return (
    <div className={styles.home}>
      <Clock />
    </div>
  );
};