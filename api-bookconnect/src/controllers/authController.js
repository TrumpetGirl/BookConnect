import { login } from '../models/repository/authRepository.js'
import { createUser, findUserByEmail, findUserByUsername } from '../models/repository/userRepository.js'

export const registerUser = async (req, res, next) => {
  try {
    const { username, password, email, birth_date } = req.body
    const result1 = await findUserByUsername(username.trim())
    const result2 = await findUserByEmail(email.trim())
    if (result1 && result2) return res.status(400).json({ success: false, message: "Nombre de usuario y correo electrónico ya registrados." })
    if (result1 && !result2) return res.status(400).json({ success: false, message: "Nombre de usuario ya registrado." }) 
    if (!result1 && result2) return res.status(400).json({ success: false, message: "Correo electrónico ya registrado." })
    const newUser = await createUser(username, password, email, birth_date, null)
    if (newUser) res.status(201).json({ success: true, message: "Usuario " + newUser.username + " registrado correctamente.", user: newUser })
    else res.status(400).json({ success: false, message: "Error al registrar usuario." })
  } catch (error) {
    next(error)
  }
}

export const loginUser = async (req, res, next) => {
  try {
    const { username, password } = req.body
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

export const existsUsername = async (req, res, next) => {
  try {
    const { username } = req.body
    if (username) {
      const user = username.includes('@') ? await findUserByEmail(username) : await findUserByUsername(username)
      const found = user ? true : false
      res.status(200).json({ success: true, found: found })
    } else {
      res.status(400).json({ success: false, message: "Error al buscar usuario." })
    }
  } catch (error) {
    next(error)
  }
}

// OBTENER USUARIO POR ID Y NOMBRE DE USUARIO
export const checkLoggedUser = async (req, res, next) => {
  try {
    const { id, username, image_path, role, roleId } = req.body
    const loggedUser = req.loggedUser
    if ( loggedUser.id === id && loggedUser.username === username && loggedUser.role === role && loggedUser.roleId === roleId)
      res.status(200).json({ success: true, user: {id, username, image_path, role, roleId } })
    else
      res.status(400).json({ success: false, message: "El usuario no está en la sesión." })
  } catch (error) {
    next(error)
  }
};