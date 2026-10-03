CREATE TABLE `enrichment_events` (
	`id` text PRIMARY KEY NOT NULL,
	`record_id` text NOT NULL,
	`actor_id` text NOT NULL,
	`kind` text NOT NULL,
	`version` integer NOT NULL,
	`note` text NOT NULL,
	`snapshot` text NOT NULL,
	`created_at` text NOT NULL,
	FOREIGN KEY (`record_id`) REFERENCES `enrichment_records`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`actor_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `enrichment_events_record_idx` ON `enrichment_events` (`record_id`);--> statement-breakpoint
CREATE TABLE `enrichment_records` (
	`id` text PRIMARY KEY NOT NULL,
	`owner_id` text NOT NULL,
	`external_id` text NOT NULL,
	`name` text NOT NULL,
	`kind` text NOT NULL,
	`workflow` text NOT NULL,
	`payload` text NOT NULL,
	`version` integer DEFAULT 1 NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL,
	FOREIGN KEY (`owner_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `enrichment_owner_external_idx` ON `enrichment_records` (`owner_id`,`external_id`);--> statement-breakpoint
CREATE TABLE `enrichment_studies` (
	`id` text PRIMARY KEY NOT NULL,
	`owner_id` text NOT NULL,
	`type` text NOT NULL,
	`name` text NOT NULL,
	`payload` text NOT NULL,
	`created_at` text NOT NULL,
	FOREIGN KEY (`owner_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `enrichment_studies_owner_idx` ON `enrichment_studies` (`owner_id`,`type`);