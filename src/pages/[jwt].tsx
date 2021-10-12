import VerificationSteps from '@/components/VerificationSteps';
import { Typography } from '@material-ui/core';
import React from 'react';

export default function Home() {
  return (
    <div>
      <main
        style={{
          padding: '30px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          marginTop: '50px',
        }}
      >
        <div>
          <Typography variant="h2">
            Link your wallet with{' '}
            <a
              href="https://guide.lunarassistant.com"
              target="_blank"
              style={{ color: '#0070f3', textDecoration: 'none' }}
            >
              Lunar Assistant!
            </a>
          </Typography>
        </div>
        <VerificationSteps />
      </main>
    </div>
  );
}
