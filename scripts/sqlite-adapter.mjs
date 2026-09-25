import { DatabaseSync } from 'node:sqlite';
import {readdirSync,readFileSync} from 'node:fs';
import path from 'node:path';
export function sqliteAdapter(filename=':memory:'){
 const sqlite=new DatabaseSync(filename);sqlite.exec('PRAGMA foreign_keys=ON; PRAGMA journal_mode=WAL;');
 const wrapper=(sql,args=[])=>({
  bind(...values){return wrapper(sql,values);},
  async first(){return sqlite.prepare(sql).get(...args)||null;},
  async all(){return {results:sqlite.prepare(sql).all(...args)};},
  async run(){const r=sqlite.prepare(sql).run(...args);return {success:true,meta:{changes:Number(r.changes)}};}
 });
 return {sqlite,prepare:sql=>wrapper(sql),async batch(statements){sqlite.exec('BEGIN IMMEDIATE');try{const result=[];for(const s of statements)result.push(await s.run());sqlite.exec('COMMIT');return result;}catch(e){sqlite.exec('ROLLBACK');throw e;}},close:()=>sqlite.close()};
}
export function migrate(db,directory){
 db.sqlite.exec('CREATE TABLE IF NOT EXISTS local_migrations (name TEXT PRIMARY KEY)');
 for(const name of readdirSync(directory).filter(n=>n.endsWith('.sql')).sort()){
  if(db.sqlite.prepare('SELECT name FROM local_migrations WHERE name=?').get(name))continue;
  db.sqlite.exec('BEGIN');try{db.sqlite.exec(readFileSync(path.join(directory,name),'utf8'));db.sqlite.prepare('INSERT INTO local_migrations VALUES (?)').run(name);db.sqlite.exec('COMMIT');}catch(e){db.sqlite.exec('ROLLBACK');throw e;}
 }
}
