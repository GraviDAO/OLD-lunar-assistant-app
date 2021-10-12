import { Typography } from '@material-ui/core';

export default function Home() {
  return (
    <div>
      <main
        style={{
          padding: '30px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          width: '100vw',
        }}
      >
        <h1>
          <Typography
            variant="h2"
            style={{ color: '#0070f3', textAlign: 'center' }}
          >
            Lunar Assistant
          </Typography>
          <Typography variant="h5" style={{ textAlign: 'center' }}>
            <a
              href="https://guide.lunarassistant.com"
              style={{ color: 'black' }}
            >
              Learn More
            </a>
          </Typography>
          {/* <Typography variant="h5" style={{ maxWidth: '500px' }}>
            Lunar Assistant user-friendly, tokenized, community-management
            system based on the Terra blockchain. Quickly create a concierge for
            your community with our bot integrations.
          </Typography> */}
        </h1>
      </main>
    </div>
  );
}
