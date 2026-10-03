import { sqliteTable, text, integer, real, index, uniqueIndex } from 'drizzle-orm/sqlite-core';

export const users=sqliteTable('users',{
 id:text('id').primaryKey(),email:text('email').notNull(),name:text('name').notNull(),
 role:text('role',{enum:['member','reviewer','admin']}).notNull().default('member'),createdAt:text('created_at').notNull()
});
export const drafts=sqliteTable('drafts',{
 id:text('id').primaryKey(),ownerId:text('owner_id').notNull().references(()=>users.id),
 title:text('title').notNull(),type:text('type').notNull(),source:text('source').notNull(),output:text('output').notNull(),
 status:text('status',{enum:['draft','submitted','approved','changes_requested']}).notNull().default('draft'),
 version:integer('version').notNull().default(1),createdAt:text('created_at').notNull(),updatedAt:text('updated_at').notNull()
},t=>[index('drafts_owner_idx').on(t.ownerId),index('drafts_status_idx').on(t.status)]);
export const events=sqliteTable('events',{
 id:text('id').primaryKey(),draftId:text('draft_id').notNull().references(()=>drafts.id),
 actorId:text('actor_id').notNull().references(()=>users.id),kind:text('kind').notNull(),version:integer('version').notNull(),
 note:text('note').notNull(),snapshot:text('snapshot').notNull(),createdAt:text('created_at').notNull()
},t=>[index('events_draft_idx').on(t.draftId)]);
export const cases=sqliteTable('business_cases',{
 id:text('id').primaryKey(),ownerId:text('owner_id').notNull().references(()=>users.id),name:text('name').notNull(),
 assumptions:text('assumptions').notNull(),results:text('results').notNull(),createdAt:text('created_at').notNull()
},t=>[index('cases_owner_idx').on(t.ownerId)]);
export const measurements=sqliteTable('measurements',{
 id:text('id').primaryKey(),ownerId:text('owner_id').notNull().references(()=>users.id),workflow:text('workflow').notNull(),
 label:text('label').notNull(),baseline:real('baseline').notNull(),assisted:real('assisted').notNull(),review:real('review').notNull(),
 corrections:integer('corrections').notNull(),criticalErrors:integer('critical_errors').notNull(),accepted:integer('accepted').notNull(),
 notes:text('notes').notNull(),createdAt:text('created_at').notNull()
},t=>[index('measurements_owner_idx').on(t.ownerId)]);
export const messages=sqliteTable('assistant_messages',{
 id:text('id').primaryKey(),ownerId:text('owner_id').notNull().references(()=>users.id),role:text('role').notNull(),
 content:text('content').notNull(),draftId:text('draft_id'),model:text('model').notNull(),createdAt:text('created_at').notNull()
},t=>[index('messages_owner_idx').on(t.ownerId)]);
export const limits=sqliteTable('assistant_limits',{
 key:text('key').primaryKey(),count:integer('count').notNull()
});
export const priorities=sqliteTable('priority_snapshots',{
 id:text('id').primaryKey(),ownerId:text('owner_id').notNull().references(()=>users.id),name:text('name').notNull(),
 scores:text('scores').notNull(),createdAt:text('created_at').notNull()
},t=>[index('priorities_owner_idx').on(t.ownerId)]);

export const enrichmentRecords=sqliteTable('enrichment_records',{
 id:text('id').primaryKey(),ownerId:text('owner_id').notNull().references(()=>users.id),externalId:text('external_id').notNull(),
 name:text('name').notNull(),kind:text('kind').notNull(),workflow:text('workflow').notNull(),payload:text('payload').notNull(),
 version:integer('version').notNull().default(1),createdAt:text('created_at').notNull(),updatedAt:text('updated_at').notNull()
},t=>[uniqueIndex('enrichment_owner_external_idx').on(t.ownerId,t.externalId)]);
export const enrichmentEvents=sqliteTable('enrichment_events',{
 id:text('id').primaryKey(),recordId:text('record_id').notNull().references(()=>enrichmentRecords.id),actorId:text('actor_id').notNull().references(()=>users.id),
 kind:text('kind').notNull(),version:integer('version').notNull(),note:text('note').notNull(),snapshot:text('snapshot').notNull(),createdAt:text('created_at').notNull()
},t=>[index('enrichment_events_record_idx').on(t.recordId)]);
export const enrichmentStudies=sqliteTable('enrichment_studies',{
 id:text('id').primaryKey(),ownerId:text('owner_id').notNull().references(()=>users.id),type:text('type').notNull(),
 name:text('name').notNull(),payload:text('payload').notNull(),createdAt:text('created_at').notNull()
},t=>[index('enrichment_studies_owner_idx').on(t.ownerId,t.type)]);

export const workItems=sqliteTable('work_items',{
 id:text('id').primaryKey(),ownerId:text('owner_id').notNull().references(()=>users.id),title:text('title').notNull(),kind:text('kind').notNull(),
 stage:integer('stage').notNull().default(0),recordId:text('record_id').references(()=>enrichmentRecords.id),payload:text('payload').notNull(),
 version:integer('version').notNull().default(1),createdAt:text('created_at').notNull(),updatedAt:text('updated_at').notNull()
},t=>[index('work_owner_idx').on(t.ownerId)]);
export const workEvents=sqliteTable('work_events',{
 id:text('id').primaryKey(),workId:text('work_id').notNull().references(()=>workItems.id),actorId:text('actor_id').notNull().references(()=>users.id),
 kind:text('kind').notNull(),note:text('note').notNull(),version:integer('version').notNull(),createdAt:text('created_at').notNull()
},t=>[index('work_event_idx').on(t.workId)]);
export const platformSettings=sqliteTable('platform_settings',{
 id:text('id').primaryKey(),ownerId:text('owner_id').notNull().references(()=>users.id),platformId:text('platform_id').notNull(),
 payload:text('payload').notNull(),version:integer('version').notNull().default(1),updatedAt:text('updated_at').notNull()
},t=>[uniqueIndex('platform_owner_idx').on(t.ownerId,t.platformId)]);
