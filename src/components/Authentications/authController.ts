import { Request, NextFunction, Response } from 'express'

import { HttpStatusCode } from '../../constants/http'
import APIError from '../../error/APIError'
import admin from '../../utils/firebase'
import { createProviderUserWithEmail, findProviderByEmail } from '../Users/facades'
import { findRoleByName } from '../Roles/facades'
import { Roles } from '../../constants/roles'

interface IDentist {
  firstName: string,
  lastName: string,
  email: string,
}

const createUserIfNotExist = async ({
  email,
  firstName,
  lastName,
}: IDentist): Promise<any> => {
  const user = await findProviderByEmail(email)
  if (user.id) {
    console.info('user already existed')

    return Promise.resolve(true)
  }

  const role = await findRoleByName(Roles.DENTIST)

  if (!role.id) {
    throw new APIError('FINDING ROLE OF MISSING TERM', HttpStatusCode.UNPROCESSABLE, true, 'can\'t find any role on store')
  }

  return createProviderUserWithEmail({
    email,
    firstName,
    lastName,
    roleId: role.id,
  })
}

export const authentications = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { token, firstName, lastName } = req.body
    const firebaseResult = await admin.auth().verifyIdToken(token)

    if (!firebaseResult.email) {
      throw new APIError('EMAIL MISSING', HttpStatusCode.UNPROCESSABLE, true, 'Email not provider by 3rd')
    }

    await createUserIfNotExist({
      email: firebaseResult.email,
      firstName,
      lastName,
    })

    res.status(HttpStatusCode.OK).json({
      data: { ...firebaseResult },
      error: null,
      message: 'success',
      code: HttpStatusCode.OK,
    })
  } catch (err) {
    next(err)
  }
}
