import VerificationSteps from '@/components/VerificationSteps';
import styles from '@/styles/Home.module.css';
import Head from 'next/head';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Lunar Assistant</title>
        <meta
          name="description"
          content="Lunar Assistant makes managing your terra communities easy!"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Link your wallet with{' '}
          <a href="https://gravidao.com">Lunar Assistant!</a>
        </h1>
        <VerificationSteps />
      </main>
    </div>
  );
}
