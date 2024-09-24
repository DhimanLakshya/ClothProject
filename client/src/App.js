import {BrowserRouter,Routes,Route} from 'react-router-dom'
import React from 'react'
import {Navbar,About,Home,Blog,Contact} from './Component/Allcomponent'

function App() {
  return (
    <div>
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/About' element={<About/>}/>
        <Route path='/Blog' element={<Blog/>}/>
        <Route path='/Contact' element={<Contact/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App