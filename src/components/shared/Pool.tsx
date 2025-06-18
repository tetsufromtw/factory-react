// src/components/shared/Pool.tsx
import { useState } from 'react'
import { Pool as PoolType, DragDropData } from '../../types/pool.types'
import EmployeeCard from './EmployeeCard'

interface PoolProps {
  pool: PoolType
  draggedData: { poolId: string; index: number } | null
  onDragStart: (data: { poolId: string; index: number }) => void
  onDragEnd: () => void
  onDrop: (data: DragDropData) => void
}

const Pool = ({ pool, draggedData, onDragStart, onDragEnd, onDrop }: PoolProps) => {
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null)

  const isProductionPool = pool.type === 'production'
  
  const poolCapacityText = pool.maxCapacity 
    ? `${pool.employees.length} / ${pool.maxCapacity}`
    : `${pool.employees.length} 名`
  
  const isOverCapacity = pool.maxCapacity ? pool.employees.length > pool.maxCapacity : false

  const getStatusCount = (status: string) => {
    return pool.employees.filter(e => e.status === status).length
  }

  const getPlaceholders = () => {
    if (!pool.maxCapacity || pool.type === 'unassigned') {
      return []
    }
    const emptySlots = Math.max(0, pool.maxCapacity - pool.employees.length)
    return Array(emptySlots).fill(0)
  }

  const handleDragStart = (event: React.DragEvent, index: number) => {
    onDragStart({ poolId: pool.id, index })
    event.dataTransfer.effectAllowed = 'move'
    event.dataTransfer.setData('text/plain', '')
  }

  const handleDragOver = (event: React.DragEvent, index: number) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
    setDragOverIndex(index)
  }

  const handleDragLeave = () => {
    setDragOverIndex(null)
  }

  const handleDrop = (event: React.DragEvent, targetIndex: number) => {
    event.preventDefault()
    
    if (draggedData) {
      onDrop({
        fromPoolId: draggedData.poolId,
        toPoolId: pool.id,
        employeeIndex: draggedData.index,
        targetIndex
      })
    }
    
    setDragOverIndex(null)
  }

  const handleDropOnPool = (event: React.DragEvent) => {
    event.preventDefault()
    
    if (draggedData && draggedData.poolId !== pool.id) {
      onDrop({
        fromPoolId: draggedData.poolId,
        toPoolId: pool.id,
        employeeIndex: draggedData.index,
        targetIndex: pool.employees.length
      })
    }
  }

  const isDraggingFromThisPool = (index: number) => {
    return draggedData?.poolId === pool.id && draggedData?.index === index
  }

  return (
    <div 
      className={`bg-white border-2 rounded-xl p-6 ${
        isProductionPool ? 'border-blue-300' : 'border-gray-300'
      }`}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDropOnPool}
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-gray-800">{pool.name}</h3>
        <div className="flex items-center gap-4">
          <div className="flex gap-2 text-xs">
            {getStatusCount('active') > 0 && (
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                {getStatusCount('active')}
              </span>
            )}
            {getStatusCount('absent') > 0 && (
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                {getStatusCount('absent')}
              </span>
            )}
            {getStatusCount('busy') > 0 && (
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                {getStatusCount('busy')}
              </span>
            )}
          </div>
          <span 
            className={`text-sm font-medium ${
              isOverCapacity ? 'text-red-600' : 'text-gray-600'
            }`}
          >
            {poolCapacityText}
          </span>
        </div>
      </div>

      <div 
        className={`min-h-[200px] p-4 bg-gray-50 rounded-lg ${
          pool.employees.length === 0 ? 'border-2 border-dashed border-gray-200' : ''
        }`}
      >
        <div 
          className={`grid gap-4 ${
            isProductionPool ? 'grid-cols-3' : 'grid-cols-4'
          }`}
        >
          {pool.employees.map((employee, index) => (
            <EmployeeCard
              key={employee.id}
              employee={employee}
              isDragging={isDraggingFromThisPool(index)}
              isDragOver={dragOverIndex === index}
              onDragStart={(e) => handleDragStart(e, index)}
              onDragEnd={onDragEnd}
              onDragOver={(e) => handleDragOver(e, index)}
              onDrop={(e) => handleDrop(e, index)}
              onDragLeave={handleDragLeave}
            />
          ))}

          {getPlaceholders().map((_, index) => (
            <div 
              key={`placeholder-${index}`}
              className="aspect-[3/2] border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center text-gray-300 text-3xl"
            >
              <span>+</span>
            </div>
          ))}
        </div>

        {pool.employees.length === 0 && (
          <div className="flex items-center justify-center h-full text-gray-400">
            <p>従業員をここにドラッグ＆ドロップ</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Pool