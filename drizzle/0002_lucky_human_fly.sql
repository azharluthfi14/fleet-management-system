ALTER TABLE "vehicles" ALTER COLUMN "plate_number" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "vehicles" ALTER COLUMN "created_at" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "vehicles" ALTER COLUMN "created_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "vehicles" ALTER COLUMN "updated_at" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "vehicles" ALTER COLUMN "updated_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "vehicles" ADD COLUMN "brand" text NOT NULL;--> statement-breakpoint
ALTER TABLE "vehicles" ADD COLUMN "model" text NOT NULL;--> statement-breakpoint
ALTER TABLE "vehicles" ADD COLUMN "year" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "vehicles" ADD COLUMN "status" text DEFAULT 'active' NOT NULL;--> statement-breakpoint
ALTER TABLE "vehicles" ADD COLUMN "odometer" integer;--> statement-breakpoint
ALTER TABLE "vehicles" DROP COLUMN "is_active";