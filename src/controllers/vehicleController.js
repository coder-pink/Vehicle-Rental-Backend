const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getVehiclesByType = async (req, res) => {
  const typeId = parseInt(req.query.typeId);

  try {
    const vehicles = await prisma.vehicle.findMany({
      where: {
        vehicle_type_id: typeId,
      },
    });
    res.json(vehicles);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching vehicles' });
  }
};
