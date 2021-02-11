import admin from '../../../utils/firebase'

interface IProviderCreate {
  firstName: string
  lastName: string,
  email: string,
  roleId: string,
}

export const createProviderUserWithEmail = async ({
  firstName,
  lastName,
  email,
  roleId,
}: IProviderCreate): Promise<any> => {
  const db = admin.firestore()
  const dbRef = db.collection('users')

  return dbRef.add({
    roleId: db.doc(`roles/${roleId}`),
    firstName,
    lastName,
    email,
  })
}
