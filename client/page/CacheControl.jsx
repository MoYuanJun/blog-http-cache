import React, { useCallback } from 'react'
import { Button } from 'antd'

export default () => {
  const handleFetch = useCallback(() => {
    fetch('http://127.0.0.1:3000/api/cache-control')
  }, [])

  return (
    <div>
      <Button onClick={handleFetch}>发送请求</Button>
    </div>
  )
}