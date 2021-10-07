import styles from '@/styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Link your wallet with{' '}
          <a href="https://gravidao.com">Lunar Assistant!</a>
        </h1>
      </main>
    </div>
  );
}
