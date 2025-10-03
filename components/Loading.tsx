import React from 'react'

const Loading = () => {
  return (
    <div className='flex items-center justify-center h-[70dvh]'>
      <div className='animate-spin rounded-full h-20 w-20 border-4 border-t-orange-300 border-gray-300'></div>
    </div>
  )
}

export default Loading
