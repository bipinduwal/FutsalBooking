import React from 'react'
import SideBar from './SideBar'
import { Outlet } from 'react-router-dom'

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen">
      <SideBar/>
      <Outlet/>
    </div>
  )
}

export default AdminLayout
