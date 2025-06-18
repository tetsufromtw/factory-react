// src/hooks/useDragDrop.ts
import { useState } from 'react'
import { DragDropData } from '../types/pool.types'

export const useDragDrop = () => {
  const [draggedData, setDraggedData] = useState<{ poolId: string; index: number } | null>(null)
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null)

  const handleDragStart = (poolId: string, index: number) => {
    setDraggedData({ poolId, index })
  }

  const handleDragEnd = () => {
    setDraggedData(null)
    setDragOverIndex(null)
  }

  const handleDragOver = (index: number) => {
    setDragOverIndex(index)
  }

  const handleDragLeave = () => {
    setDragOverIndex(null)
  }

  return {
    draggedData,
    dragOverIndex,
    handleDragStart,
    handleDragEnd,
    handleDragOver,
    handleDragLeave
  }
}