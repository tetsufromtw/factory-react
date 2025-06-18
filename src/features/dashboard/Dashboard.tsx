// src/features/dashboard/Dashboard.tsx
import { useState } from 'react'
import { Pool as PoolType, DragDropData } from '../../types/pool.types'
import Pool from '../../components/shared/Pool'

const Dashboard = () => {
  const [pools, setPools] = useState<PoolType[]>([
    {
      id: 'production-1',
      name: 'ラインA',
      type: 'production',
      maxCapacity: 6,
      employees: [
        {
          id: 1,
          name: '佐藤さん',
          position: 'エンジニア',
          emoji: '👨‍💻',
          status: 'active'
        },
        {
          id: 2,
          name: '鈴木さん',
          position: 'デザイナー',
          emoji: '👩‍🎨',
          status: 'active'
        }
      ]
    },
    {
      id: 'production-2',
      name: 'ラインB',
      type: 'production',
      maxCapacity: 6,
      employees: [
        {
          id: 3,
          name: '武田さん',
          position: 'マネージャー',
          emoji: '👨‍💼',
          status: 'busy'
        }
      ]
    },
    {
      id: 'unassigned',
      name: '未割り当て',
      type: 'unassigned',
      employees: [
        {
          id: 4,
          name: '田中さん',
          position: 'エンジニア',
          emoji: '👩‍💻',
          status: 'absent'
        },
        {
          id: 5,
          name: '千葉くん',
          position: 'アナリスト',
          emoji: '👨‍🔬',
          status: 'active'
        },
        {
          id: 6,
          name: '関永さん',
          position: 'エンジニア',
          emoji: '👨‍💻',
          status: 'active'
        },
        {
          id: 7,
          name: '山本さん',
          position: 'デザイナー',
          emoji: '👩‍🎨',
          status: 'active'
        }
      ]
    }
  ])

  const [draggedData, setDraggedData] = useState<{ poolId: string; index: number } | null>(null)

  const totalEmployees = pools.reduce((sum, pool) => sum + pool.employees.length, 0)
  const activeEmployees = pools.reduce((sum, pool) => 
    sum + pool.employees.filter(e => e.status === 'active').length, 0
  )

  const handleDragStart = (data: { poolId: string; index: number }) => {
    setDraggedData(data)
  }

  const handleDragEnd = () => {
    setDraggedData(null)
  }

  const handleDrop = (data: DragDropData) => {
    const newPools = [...pools]
    const fromPool = newPools.find(p => p.id === data.fromPoolId)
    const toPool = newPools.find(p => p.id === data.toPoolId)

    if (!fromPool || !toPool) return

    const employee = fromPool.employees[data.employeeIndex]
    if (!employee) return

    fromPool.employees.splice(data.employeeIndex, 1)

    if (data.fromPoolId === data.toPoolId) {
      const adjustedIndex = data.targetIndex > data.employeeIndex ? 
        data.targetIndex - 1 : data.targetIndex
      toPool.employees.splice(adjustedIndex, 0, employee)
    } else {
      toPool.employees.splice(data.targetIndex, 0, employee)
    }

    setPools(newPools)
  }

  return (
    <div className="min-h-screen bg-gray-100 font-sans p-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">配置システム</h1>
          <p className="text-sm text-gray-600 tracking-wider">従業員を異なるラインにドラッグ＆ドロップ</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {pools.slice(0, 2).map(pool => (
            <Pool
              key={pool.id}
              pool={pool}
              draggedData={draggedData}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              onDrop={handleDrop}
            />
          ))}
        </div>

        <div className="mb-6">
          <Pool
            pool={pools[2]}
            draggedData={draggedData}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDrop={handleDrop}
          />
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex justify-center items-center gap-8 text-sm text-gray-700">
            <div className="flex gap-6">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-green-500 rounded-full"></span>
                <span>出勤</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-gray-400 rounded-full"></span>
                <span>欠勤</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-red-500 rounded-full"></span>
                <span>取り込み中</span>
              </div>
            </div>
            <div className="w-px h-5 bg-gray-300"></div>
            <div className="flex gap-4">
              <span>総人数: {totalEmployees}</span>
              <span>出勤中: {activeEmployees}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard