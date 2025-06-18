// src/components/layout/Sidebar.tsx
const Sidebar = () => {
  return (
    <aside className="w-64 bg-gray-900 text-white">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-8">Factory</h2>
        <nav className="space-y-2">
          <a 
            href="/dashboard" 
            className="block px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
          >
            ダッシュボード
          </a>
        </nav>
      </div>
    </aside>
  )
}

export default Sidebar