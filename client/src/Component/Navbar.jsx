import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../images/panda-8269336_640.png'

function Navbar() {
    const navigator = [
        { Name: 'Home', href: '/' },
        { Name: 'About', href: '/About' },
        { Name: 'Contact', href: '/Contact' },
        { Name: 'Blog', href: '/Blog' },
    ]

    const [ismenuOpen, setisMenuOpen] = useState(false)
    const [menuOpen, isMenuOpen] = useState(false)

    const handlebar = () => {
        isMenuOpen(!menuOpen)
    }


    return (
        <div>
            <nav className=' w-full items-center flex justify-between bg-[#070707a8] py-4 px-3'>
                <div className='border-[3px] border-black rounded-lg '>
                    <Link to='/'> <img className='h-[50px] rounded-md bg-black ' src={logo} alt="Logo" /> </Link></div>

                <div className='flex justify-center items-center gap-3'>
                    <ul className='hidden md:flex gap-4 justify-center items-center'>

                        {
                            navigator.map((value) =>
                            (
                                <li className='border-[3px] border-black rounded-lg py-2 px-2 cursor-pointer hover:scale-125 bg-black text-white text-[20px] hover:text-red-800 active:text-green-700'><Link to={value.href}>{value.Name}</Link></li>
                            ))
                        }

                    </ul>

                    <div className='flex justify-center items-center relative'>
                        <i class="fa-solid fa-magnifying-glass text-2xl text-gray-400 left-3 absolute"></i>
                        <input className='py-3 px-2 rounded-xl pl-11  border-3 border-blue-300 focus:bg-gray-200 focus:outline-blue-500' type="text" placeholder='Search..' />
                    </div>


                </div>
                <div className='hidden md:flex items-center gap-4'>
                    <button className='border-[3px] border-black rounded-lg py-2 px-2 cursor-pointer hover:scale-125 bg-black text-white text-[20px]'><a href='#/'>Signup</a></button>
                    <button className='border-[3px] border-black rounded-lg py-2 px-2 cursor-pointer hover:scale-125 bg-black text-white text-[20px]'><a href='#/'>Login</a></button>
                    <i className="fa-solid fa-user text-white bg-black p-2 rounded-full "></i>
                </div>


                <div onClick={() => setisMenuOpen(!ismenuOpen)} className='md:hidden'>
                    {
                        menuOpen ? (<i onClick={handlebar} className="fa-solid fa-xmark text-gray-200 text-3xl" />)
                            :
                            (<i onClick={handlebar} className="fa-solid fa-bars text-gray-200 text-3xl" />)
                    }


                </div>

                <div className={`absolute xl:hidden top-[87px] right-0 bg-[#07070788] flex flex-col items-end gap-8 px-32 rounded-b-lg
                    pb-5 font-semibold text-lg transform transition-transform ${ismenuOpen ? "opacity-100" : "opacity-0"}`}>


                    {
                        navigator.map((value) =>
                        (
                            <div className='border-[3px] border-black rounded-lg justify-center items-center cursor-pointer hover:scale-125 bg-black text-white text-[20px] hover:text-red-800 active:text-green-700'><Link to={value.href}>{value.Name}</Link></div>
                        ))
                    }

                </div>

            </nav>
        </div>
    )
}

export default Navbar