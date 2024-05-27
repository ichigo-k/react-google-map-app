import React from 'react'
import SideBar from './assets/components/SideBar'
import Map from './assets/components/Map'

function App() {
  return (
    <div className='w-full h-screen flex '>
      <div className='w-1/4'>
        <SideBar/>
      </div>

      <div className='w-3/4'>
        <Map/>
      </div>

    </div>
  )
}

export default App