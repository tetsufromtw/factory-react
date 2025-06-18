// src/types/employee.types.ts
export interface Employee {
  id: number;
  name: string;
  position: string;
  emoji: string;
  status: 'active' | 'absent' | 'busy';
}