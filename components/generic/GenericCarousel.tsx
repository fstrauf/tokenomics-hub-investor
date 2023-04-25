import { useState } from 'react'
// import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';

const GenericCarousel = ({ children }) => {
  const [activeIndex, setActiveIndex] = useState(0)

  const nextSlide = () => {
    setActiveIndex((prevIndex) => {
      const newIndex = prevIndex + 1
      return newIndex >= children.length ? 0 : newIndex
    })
  }

  const prevSlide = () => {
    setActiveIndex((prevIndex) => {
      const newIndex = prevIndex - 1
      return newIndex < 0 ? children.length - 1 : newIndex
    })
  }

  return (
    <div className="grid content-between">
      {children?.map((child, index) => (
        <div
          key={index}
          className={`${
            index === activeIndex ? 'opacity-100' : 'hidden'
          } transition-opacity duration-500`}
        >
          {child}
        </div>
      ))}
      <div className="flex gap-3 justify-center">
        <button
          className=" rounded-lg bg-dao-red px-4 py-2 text-center text-xs font-medium text-white"
          onClick={prevSlide}
        >
          {/* <ChevronLeftIcon className="h-6 w-6 text-gray-500" />
           */}
          Back
        </button>
        <button
          className=" rounded-lg bg-dao-red px-4 py-2 text-center text-xs font-medium text-white"
          onClick={nextSlide}
        >
          Next
          {/* <ChevronRightIcon className="h-6 w-6 text-gray-500" /> */}
        </button>
      </div>
    </div>
  )
}

export default GenericCarousel
