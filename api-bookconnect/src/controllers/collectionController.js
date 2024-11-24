import { addCollection, findBookCollectionOfUser } from '../models/repository/collectionRepository.js'

// ------ CRUD ------
export const createCollection = async (req, res, next) => {
  try {
    const { id } = req.loggedUser
    const bookId = parseInt(req.body.bookId)
    const result = await addCollection(id, bookId)
    if (result && result?.success) res.status(200).json( result )
    else res.status(400).json({ success: false, message: "Error al añadir el libro a la colección." })
  } catch (error) {
    next(error)
  }
}

// ------ END CRUD ------

export const getCollectionOfUser = async (req, res, next) => {
  try {
    const result = await findBookCollectionOfUser(parseInt(req.params.userId))
    if (result && result.success) res.status(200).json( result )
    else res.status(400).json({ success: false, message: "Error al recuperar la colección del usuario." })
  } catch (error) {
    next(error)
  }
}