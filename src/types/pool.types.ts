// src/types/pool.types.ts
import { Employee } from './employee.types';

export interface Pool {
  id: string;
  name: string;
  type: 'production' | 'unassigned';
  employees: Employee[];
  maxCapacity?: number;
}

export interface DragDropData {
  fromPoolId: string;
  toPoolId: string;
  employeeIndex: number;
  targetIndex: number;
}