import React from 'react'
import styles from './app.module.less'

type Props = {}
 function App({}:Props) {
  return (<>
    <div className='flex bg-blue-600'>App</div>
    <div>
    <div className={styles.title}>标题</div>
    <div className={styles.content}>内容</div>
    </div>
    </>
  )
}
export default App
