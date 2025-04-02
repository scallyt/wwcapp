ALTER TABLE `users_table` RENAME TO `collections`;--> statement-breakpoint
CREATE TABLE `groups` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `questions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`question` text,
	`image` text,
	`answer` text NOT NULL,
	`collection_id` integer NOT NULL,
	FOREIGN KEY (`collection_id`) REFERENCES `collections`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
DROP INDEX `users_table_email_unique`;--> statement-breakpoint
ALTER TABLE `collections` ADD `group_id` integer NOT NULL REFERENCES groups(id);--> statement-breakpoint
ALTER TABLE `collections` DROP COLUMN `age`;--> statement-breakpoint
ALTER TABLE `collections` DROP COLUMN `email`;