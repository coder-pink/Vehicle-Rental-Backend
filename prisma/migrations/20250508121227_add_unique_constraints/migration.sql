cc/*
  Warnings:

  - A unique constraint covering the columns `[model_name]` on the table `Vehicle` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name,wheels]` on the table `VehicleType` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Vehicle_model_name_key" ON "Vehicle"("model_name");

-- CreateIndex
CREATE UNIQUE INDEX "VehicleType_name_wheels_key" ON "VehicleType"("name", "wheels");
