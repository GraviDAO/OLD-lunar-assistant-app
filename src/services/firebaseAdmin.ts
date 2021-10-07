import admin, { ServiceAccount } from 'firebase-admin';

const FIREBASE_ADMIN_SERVICE_ACCOUNT =
  process.env.FIREBASE_ADMIN_SERVICE_ACCOUNT;

if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert(
        JSON.parse(FIREBASE_ADMIN_SERVICE_ACCOUNT!) as ServiceAccount,
      ),
    });
  } catch (error) {
    console.log('Firebase admin initialization error', error);
  }
}
export default admin.firestore();
