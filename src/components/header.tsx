import React from 'react'
import videoStatic from './a6a8a7383ed8434436321a5e3a46a173.mov'
import { useNavigate } from 'react-router-dom';
import logo from './gd-logo.png'
import './index.less'
const Header = ({simple}: any) => {
 const navigate = useNavigate();

  return (
    <nav className={`shadow-gray-700 ${simple ? 'bg-gray-800' : 'fixed'} w-full z-50`} style={{backgroundColor: simple ? '#1e2939' : '#00000080'}}>
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
            <div onClick={() => navigate('/')} className="logoWrap cursor-pointer flex items-center space-x-2">
              {simple && <img src="https://simg01.gaodunwangxiao.com/uploadfiles/tmp/upload/202510/22/eb10b_20251022190440.png" alt="" style={{width: '18px', height: '18px'}}/>}
                <video src={videoStatic} autoPlay loop muted style={{width: '40px', height: '40px'}}  playsInline
                  webkit-playsinline
                  x5-video-player-type="h5"
                  x5-video-orientation="portrait"
                ></video>
                <span className="text-xl font-bold text-primary text-white">SheetTalk</span>


               {!simple &&
               <>
                <span style={{fontWeight: 600}}>X</span>
               <img style={{left: simple ? '186px' : '160px'}} className='gd-logo' src={logo} alt="" />

               </>}
            </div>
           {!simple ? <>

            <div className="hidden md:flex items-center space-x-6">
                <a href="#how-it-works" className="text-white hover:text-primary transition-colors font-bold">使用方法</a>
                <a href="#features" className="text-white hover:text-primary transition-colors font-bold">功能特点</a>
            </div>
            <div className="md:hidden">
                <button id="mobile-menu-button" className="text-gray-300 hover:text-primary">
                    <i className="fa fa-bars text-xl"></i>
                </button>
            </div>
           </>
          :  <div className="text-gray-300 hover:text-primary transition-colors font-bold">大模型拌饭队</div>
          }
        </div>

    </nav>
  )
}

export default Header
