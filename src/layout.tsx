import { XProvider } from '@ant-design/x'
import React from 'react'
import { Outlet } from 'react-router-dom'
  const darkTheme = {
      colorBgContainer: 'rgb(10, 4, 21)',
      colorText: 'rgb(255, 255, 255)',
      headerBg: 'linear-gradient(97deg, rgba(90,196,255,0.12) 0%, rgba(174,136,255,0.12) 100%)',

      promptBg: 'linear-gradient(97deg, rgba(90,196,255,0.12) 0%, rgba(174,136,255,0.12) 100%)',
      sendBg: 'rgb(26, 29, 34)',
      sendBorderColor: 'rgb(37, 41, 51)',
colorFillContent: 'rgb(24, 29, 36)'
    };
    const whiteTheme = {
      colorBgContainer: '#fff',
      colorText: 'rgb(0, 0, 0)',
      headerBg: 'linear-gradient(97deg, #f2f9fe 0%, #f7f3ff 100%)',
      promptBg: 'linear-gradient(123deg, #e5f4ff 0%, #efe7ff 100%)',
      sendBg: 'transparent',
      sendBorderColor: '#edeff1'


    };
const Layout = () => {
  return (
    <div>
  <XProvider theme={{ token: darkTheme }}>
      <Outlet />

       </XProvider>
    </div>
  )
}

export default Layout
