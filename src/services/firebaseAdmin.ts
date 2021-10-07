import admin, { ServiceAccount } from 'firebase-admin';

const FIREBASE_ADMIN_SERVICE_ACCOUNT =
  process.env.FIREBASE_ADMIN_SERVICE_ACCOUNT;

console.log(FIREBASE_ADMIN_SERVICE_ACCOUNT);
if (!admin.apps.length) {
  try {
    const serviceAccount = JSON.parse(
      FIREBASE_ADMIN_SERVICE_ACCOUNT!,
    ) as ServiceAccount;

    console.log(serviceAccount);

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  } catch (error) {
    console.log('Firebase admin initialization error', error);
  }
}
export default admin.firestore();
