import admin from 'firebase-admin';

const FIREBASE_ADMIN_SERVICE_ACCOUNT =
  process.env.FIREBASE_ADMIN_SERVICE_ACCOUNT!;

if (!admin.apps.length) {
  try {
    const serviceAccount = JSON.parse(FIREBASE_ADMIN_SERVICE_ACCOUNT);

    serviceAccount.private_key = serviceAccount.private_key.replace(
      /\\n/g,
      '\n',
    );

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  } catch (error) {
    console.log('Firebase admin initialization error', error);
  }
}
export default admin.firestore();
