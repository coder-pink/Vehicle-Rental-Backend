// const { PrismaClient } = require('@prisma/client');
// const prisma = new PrismaClient();

// async function main() {
//   const bikeType = await prisma.vehicleType.create({
//     data: { name: 'Cruiser', wheels: 2 },
//   });

//   const carTypes = await prisma.vehicleType.createMany({
//     data: [
//       { name: 'Hatchback', wheels: 4 },
//       { name: 'Sedan', wheels: 4 },
//       { name: 'SUV', wheels: 4 },
//     ],
//   });

//   const cruiser = await prisma.vehicle.createMany({
//     data: [
//       { model_name: 'Royal Enfield Classic', vehicle_type_id: bikeType.id },
//       { model_name: 'Bajaj Avenger', vehicle_type_id: bikeType.id },
//     ],
//   });
// }

// main().catch(e => {
//   console.error(e);
//   process.exit(1);
// }).finally(() => prisma.$disconnect());



const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Create users
  await prisma.user.createMany({
    data: [
      { first_name: 'Alice', last_name: 'Smith' },
      { first_name: 'Bob', last_name: 'Johnson' },
    ],
  });

  // Create vehicle types individually to get their IDs
  const cruiserType = await prisma.vehicleType.create({
    data: { name: 'Cruiser', wheels: 2 },
  });

  const hatchbackType = await prisma.vehicleType.create({
    data: { name: 'Hatchback', wheels: 4 },
  });

  const sedanType = await prisma.vehicleType.create({
    data: { name: 'Sedan', wheels: 4 },
  });

  const suvType = await prisma.vehicleType.create({
    data: { name: 'SUV', wheels: 4 },
  });

  // Add vehicles under each type
  await prisma.vehicle.createMany({
    data: [
      // Cruisers
      { model_name: 'Royal Enfield Classic', vehicle_type_id: cruiserType.id },
      { model_name: 'Bajaj Avenger', vehicle_type_id: cruiserType.id },

      // Hatchbacks
      { model_name: 'Maruti Swift', vehicle_type_id: hatchbackType.id },
      { model_name: 'Hyundai i20', vehicle_type_id: hatchbackType.id },

      // Sedans
      { model_name: 'Honda City', vehicle_type_id: sedanType.id },
      { model_name: 'Skoda Slavia', vehicle_type_id: sedanType.id },

      // SUVs
      { model_name: 'Toyota Fortuner', vehicle_type_id: suvType.id },
      { model_name: 'Mahindra XUV700', vehicle_type_id: suvType.id },
    ],
  });
}

main()
  .then(() => {
    console.log('✅ Seed complete');
  })
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
