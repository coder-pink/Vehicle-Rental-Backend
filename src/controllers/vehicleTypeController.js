const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getVehicleTypes = async (req, res) => {
  const wheels = parseInt(req.query.wheels);

  try {
    const types = await prisma.vehicleType.findMany({
      where: wheels ? { wheels } : {},
    });
    res.json(types);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching vehicle types' });
  }
};
