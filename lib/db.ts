import { promises as fs } from 'node:fs';
import path from 'node:path';
import { Appointment, Block, Professional, Service } from '@/lib/types';

const dataDir = path.join(process.cwd(), 'data');

async function readJson<T>(fileName: string): Promise<T> {
  const fullPath = path.join(dataDir, fileName);
  const raw = await fs.readFile(fullPath, 'utf-8');
  return JSON.parse(raw) as T;
}

async function writeJson<T>(fileName: string, payload: T): Promise<void> {
  const fullPath = path.join(dataDir, fileName);
  await fs.writeFile(fullPath, JSON.stringify(payload, null, 2));
}

export const db = {
  getServices: () => readJson<Service[]>('services.json'),
  getProfessionals: () => readJson<Professional[]>('professionals.json'),
  getAppointments: () => readJson<Appointment[]>('appointments.json'),
  getBlocks: () => readJson<Block[]>('blocks.json'),
  async saveAppointments(items: Appointment[]) {
    await writeJson('appointments.json', items);
  },
  async saveBlocks(items: Block[]) {
    await writeJson('blocks.json', items);
  }
};
