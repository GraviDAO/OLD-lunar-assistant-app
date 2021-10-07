import axios from 'axios';

const firebaseProjectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
const LunarApi = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? `https://us-central1-${firebaseProjectId}.cloudfunctions.net`
      : `http://localhost:5001/${firebaseProjectId}/us-central1`,
});

LunarApi.defaults.withCredentials = true;

export { LunarApi };
