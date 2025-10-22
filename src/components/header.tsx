import React from 'react'
import videoStatic from './a6a8a7383ed8434436321a5e3a46a173.mov'
import { useNavigate } from 'react-router-dom';

const Header = ({simple}: any) => {
 const navigate = useNavigate();

  return (
    <nav className={`bg-gray-800 shadow-gray-700 ${simple ? '' : 'fixed'} w-full z-50`}>
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
            <div onClick={() => navigate('/')} className="cursor-pointer flex items-center space-x-2">
                <video src={videoStatic} autoPlay loop muted style={{width: '40px', height: '40px'}}></video>
                <span className="text-xl font-bold text-primary text-white">SheetTalk</span>
            </div>
           {!simple && <>

            <div className="hidden md:flex items-center space-x-6">
                <a href="#features" className="text-gray-300 hover:text-primary transition-colors">功能特点</a>
                <a href="#how-it-works" className="text-gray-300 hover:text-primary transition-colors">使用方法</a>
                <a href="#examples" className="text-gray-300 hover:text-primary transition-colors">示例展示</a>
            </div>
            <div className="md:hidden">
                <button id="mobile-menu-button" className="text-gray-300 hover:text-primary">
                    <i className="fa fa-bars text-xl"></i>
                </button>
            </div>
           </>}
        </div>

    </nav>
  )
}

export default Header
