import { findBookCollectionOfUser } from '../models/repository/collectionRepository.js'

export const getCollectionOfUser = async (req, res, next) => {
  try {
    const result = await findBookCollectionOfUser(parseInt(req.params.userId))
    console.log(result)
    if (result && result.success) res.status(200).json( result )
    else res.status(400).json({ success: false, message: "Error al recuperar la colección del usuario." })
  } catch (error) {
    next(error)
  }
}

export const createCollection = async (req, res, next) => {
  try {
    const { id } = req.loggedUser
    const result = await login(username.trim(), password)
    if (result.success) {
      res.status(200).json({ success: true, message: result.user.username + ", has iniciado sesión.", user: result.user, token: result.token })
    } else {
      res.status(401).json({ success: false, message: result.message })
    }
  } catch (error) {
    next(error)
  }
}