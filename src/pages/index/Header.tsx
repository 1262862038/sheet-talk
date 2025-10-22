import { Welcome } from '@ant-design/x'
import React from 'react'
import styles from './style'
const Header = ({styles}: any) => {
  return (
    <div className={styles.header}>
        <div className="logo">
          <img src="https://simg01.gaodunwangxiao.com/uploadfiles/tmp/upload/202510/20/8dd89_20251020164502.jpg" alt="" />
          <div className="title">SheetTalk</div>
        </div>
    </div>
  )
}

export default Header
