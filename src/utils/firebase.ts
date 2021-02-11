import admin from 'firebase-admin'

import {
  firebaseDatabaseURL,
  firebaseServiceAccount,
} from '../config/env'

admin.initializeApp({
  credential: admin.credential.cert(firebaseServiceAccount),
  databaseURL: firebaseDatabaseURL,
})

export default admin
