const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


exports.createBooking = async (req, res) => {
  console.log("Received body:", req.body); // 👈 LOG FIRST

  const { user_id, vehicle_id, start_date, end_date } = req.body;

  // Validation
  if (!user_id || !vehicle_id || !start_date || !end_date) {
    return res.status(400).json({ error: "Missing required booking fields" });
  }

  try {
    
    const vehicleIdInt = parseInt(vehicle_id, 10); // Convert to integer

    if (isNaN(vehicleIdInt)) {
      return res.status(400).json({ error: "Invalid vehicle ID" });
    }

    const start = new Date(start_date);
    const end = new Date(end_date);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return res.status(400).json({ error: "Invalid date format" });
    }

    // Check for overlapping bookings
    const existing = await prisma.booking.findFirst({
      where: {
        vehicle_id: vehicleIdInt, // Use the integer value
        AND: [
          { start_date: { lte: end } },
          { end_date: { gte: start } },
        ],
      },
    });

    if (existing) {
      return res.status(400).json({ error: "Vehicle already booked for these dates" });
    }

    
    let user = await prisma.user.findUnique({
      where: { id: user_id }, 
    });

    if (!user) {
      
      user = await prisma.user.create({
        data: {
          first_name: "Guest",  
          last_name: "User",    
        },
      });
    }

    // the new booking
    const booking = await prisma.booking.create({
      data: {
        user_id: user.id,  
        vehicle_id: vehicleIdInt, 
        start_date: start,
        end_date: end,
      },
    });

    res.status(201).json(booking);
  } catch (error) {
    console.error("Booking creation error:", error);
    res.status(500).json({ error: "Error creating booking" });
  }
};
