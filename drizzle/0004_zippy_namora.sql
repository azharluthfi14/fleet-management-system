CREATE TYPE "public"."vehicle_status" AS ENUM('active', 'maintenance', 'inactive');--> statement-breakpoint
ALTER TABLE "vehicles" ALTER COLUMN "status" SET DEFAULT 'active'::"public"."vehicle_status";--> statement-breakpoint
ALTER TABLE "vehicles" ALTER COLUMN "status" SET DATA TYPE "public"."vehicle_status" USING "status"::"public"."vehicle_status";--> statement-breakpoint
ALTER TABLE "vehicles" DROP COLUMN IF EXISTS "capacity";
