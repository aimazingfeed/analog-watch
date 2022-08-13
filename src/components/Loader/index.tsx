import styles from './styles.module.scss';

export const Loader = () => {
  return (
    <div className={styles.lds_ellipsis}>
      <div className={styles.dot} />
      <div className={styles.dot} />
      <div className={styles.dot} />
      <div className={styles.dot} />
    </div>
  );
};