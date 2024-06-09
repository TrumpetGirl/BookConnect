export const logErrors = (err, req, res, next) => {
  console.log("logErrors")
  console.error(err.message || err.stack)
  next(err)
}

export const clientErrorHandler = (err, req, res, next) => {
  console.log("req.xhr")
  console.log(req.xhr)
  if (req.xhr) {
    res.status(500).send({ success: false, message: "Error interno del servidor" })
  } else {
    next(err)
  }
}

export const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500
  res.status(statusCode).json({success: false, message: "Error interno del servidor"})
}