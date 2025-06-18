// src/components/shared/EmployeeCard.tsx
import { Employee } from '../../types/employee.types'

interface EmployeeCardProps {
  employee: Employee
  isDragging: boolean
  isDragOver: boolean
  onDragStart: (e: React.DragEvent) => void
  onDragEnd: () => void
  onDragOver: (e: React.DragEvent) => void
  onDrop: (e: React.DragEvent) => void
  onDragLeave: () => void
}

const EmployeeCard = ({
  employee,
  isDragging,
  isDragOver,
  onDragStart,
  onDragEnd,
  onDragOver,
  onDrop,
  onDragLeave
}: EmployeeCardProps) => {
  const getStatusDotClasses = () => {
    const statusColors = {
      'active': 'bg-green-500 shadow-green-200',
      'absent': 'bg-gray-400 shadow-gray-200',
      'busy': 'bg-red-500 shadow-red-200'
    }
    
    const color = statusColors[employee.status] || statusColors['active']
    return `w-2.5 h-2.5 rounded-full ${color} shadow-[0_0_0_3px]`
  }

  const getStatusText = () => {
    const statusMap: {[key: string]: string} = {
      'active': '出勤',
      'absent': '欠勤',
      'busy': '取込み中'
    }
    return statusMap[employee.status] || ''
  }

  return (
    <div 
      className={`relative aspect-[3/2] cursor-move transition-all duration-300 ${
        isDragging ? 'opacity-30 scale-90' : ''
      } ${isDragOver ? 'scale-105' : ''}`}
      draggable="true"
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
      onDrop={onDrop}
      onDragLeave={onDragLeave}
    >
      <div 
        className={`relative w-full h-full bg-white border-2 rounded-xl p-6 flex flex-col items-center justify-center gap-2 transition-all z-20 ${
          isDragOver ? 'border-gray-700 border-[3px]' : 'border-gray-200'
        }`}
      >
        <div className="absolute top-3 right-3 w-6 h-6 flex items-center justify-center" title={getStatusText()}>
          <span className={getStatusDotClasses()}></span>
          {employee.status === 'busy' && (
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="absolute w-4 h-4 border-2 border-red-500 rounded-full animate-ping"></span>
            </span>
          )}
        </div>
        
        <div className="text-5xl leading-none">{employee.emoji}</div>
        <div className="text-base font-semibold text-gray-800 whitespace-nowrap">{employee.name}</div>
        <div className="text-xs text-gray-600">{employee.position}</div>
      </div>
      
      <div 
        className={`absolute top-1.5 left-1.5 -right-1.5 -bottom-1.5 bg-gray-200 rounded-xl z-10 transition-transform ${
          !isDragging ? 'translate-x-0.5 translate-y-0.5' : ''
        }`}
      ></div>
    </div>
  )
}

export default EmployeeCard