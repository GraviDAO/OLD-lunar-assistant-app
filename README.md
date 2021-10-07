# Lunar Assistant App

This repo contains the lunar assistant front and backend. The main functionality is to:
- Provide a frontend from which a user can sign a transaction to be sent to the backend which proves ownership of a particular wallet.
- A backend which receives transactions, verifies them, and updates the database to reflect the relationship between the discord user and wallet address. 

## Setup

Copy the `.env` to `.env.local` and populate the variables.
## Usage

```
npm install
npm run dev
```

## Next Steps

- Improve UI
- Support multiple wallets with an ordering
- Support for linking twitter accounts
- Add support for basic voting