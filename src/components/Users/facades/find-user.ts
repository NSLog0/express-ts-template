import admin from '../../../utils/firebase'

export const findProviderByEmail = async (email: string): Promise<any> => {
  const db = admin.firestore()
  const dbRef = db.collection('users')
  const result = await dbRef.where('email', '==', email).get()

  let user = {}

  if (result.empty) {
    return user
  }

  result.forEach((doc) => {
    user = { id: doc.id, ...doc.data() }
  })

  return user
}
