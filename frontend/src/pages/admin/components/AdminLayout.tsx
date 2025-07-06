import type React from "react"
import Sidebar from "./Sidebar"
import { useState } from "react"
import Model from "./Model";

function AdminLayout({children}:Readonly<{children : React.ReactNode}>) {
  
  const [isModelOpen , setIsModelOpen] = useState(false);

  const openModel = () => {
    setIsModelOpen(true)
  }

  const closeModel = () => {
    setIsModelOpen(false)
  }

    return (
        <div>
  <div className="flex h-screen bg-gray-100">
    <div className="hidden md:flex flex-col w-64 bg-gray-800">
      <div className="flex items-center justify-center h-16 bg-gray-900">
        <span className="text-white font-bold uppercase">Admin Dashboard</span>
      </div>
      <Sidebar />
    </div>
    {/* Main content */}
    <div className="flex flex-col flex-1 overflow-y-auto">
      <div className="flex items-center justify-between h-16 bg-white border-b border-gray-200">
        <div className="flex items-center px-4"></div>
        <div className="flex items-center pr-4">
          <button className="flex items-center text-gray-950-500 hover:caret-amber-50  focus:text-white-700">
            {isModelOpen && <Model closeModel={closeModel} />}
            <button onClick={openModel} className="border-black cursor-pointer text-amber-50 p-3 bg-blue-800 border-radius-50">+ Category</button>
          </button>
        </div>
      </div>
      <div className="p-4">
        {children}
      </div>
    </div>
  </div>
</div>

    )
}

export default AdminLayout