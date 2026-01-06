ALTER TABLE "drivers" ADD COLUMN "deleted_at" timestamp with time zone;--> statement-breakpoint
CREATE INDEX "drivers_status_idx" ON "drivers" USING btree ("status");