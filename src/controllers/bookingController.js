const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.createBooking = async (req, res) => {
  const { user_id, vehicle_id, start_date, end_date } = req.body;

  try {
    // Check for overlap
    const existing = await prisma.booking.findFirst({
      where: {
        vehicle_id,
        AND: [
          { start_date: { lte: new Date(end_date) } },
          { end_date: { gte: new Date(start_date) } },
        ],
      },
    });

    if (existing) {
      return res.status(400).json({ error: 'Vehicle already booked for these dates' });
    }

    const booking = await prisma.booking.create({
      data: {
        user_id,
        vehicle_id,
        start_date: new Date(start_date),
        end_date: new Date(end_date),
      },
    });

    res.status(201).json(booking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating booking' });
  }
};
