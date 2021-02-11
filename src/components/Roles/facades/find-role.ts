import admin from '../../../utils/firebase'

export const findRoleByName = async (name: string): Promise<any> => {
  const db = admin.firestore()
  const dbRef = db.collection('roles')
  const result = await dbRef.where('name', '==', name).get()

  let role = {}

  if (result.empty) {
    return role
  }

  result.forEach((doc) => {
    role = { id: doc.id, ...doc.data() }
  })

  return role
}
