import dotenv from 'dotenv'

dotenv.config()

const firebaseDatabaseURL = process.env.FIREBASE_DATABASE_URL
const firebaseServiceAccount = process.env.FIREBASE_SERVICE_ACCOUNT || '../../firebase-admin.json'

export {
  firebaseServiceAccount,
  firebaseDatabaseURL,
}
