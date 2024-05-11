// Ruta de ejemplo
app.get('/', async (req, res) => {
    try {
      const usuarios = await prisma.usuario.findMany();
      res.json(usuarios);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });