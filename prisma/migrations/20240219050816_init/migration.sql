/*
  Warnings:

  - You are about to alter the column `role` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(0))`.
  - A unique constraint covering the columns `[name]` on the table `category` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `availability` to the `product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `product` ADD COLUMN `availability` ENUM('Available', 'Unavailable', 'Limited') NOT NULL;

-- AlterTable
ALTER TABLE `user` MODIFY `role` ENUM('USER', 'ADMIN') NULL DEFAULT 'USER';

-- CreateIndex
CREATE UNIQUE INDEX `category_name_key` ON `category`(`name`);
