import React from 'react'
import chroma from 'chroma-js'

// todo: theoretically actually store or centralize course colors
const courseColor = (number: number) : string => chroma({
// @ts-ignore
  h: (number * 451) % 360,
  s: 0.8,
  l: 0.9,
}).css()

type CourseTitleProps = {
  course: Course
}

const CourseTitle = ({ course: { dept, number, title } }: CourseTitleProps) => (
  <h3 className="flex items-center">
    <div
      className="rounded shadow-sm p-2 mr-3 leading-5 text-gray-600 flex flex-col md:flex-row gap-1 items-center"
      style={{ backgroundColor: courseColor(number) }}
    >
      <div>
        {dept}
      </div>
      <div>
        {number}
      </div>
    </div>
    <div className="text-gray-600 mr-3 text-xl">
      {title}
    </div>
  </h3>
)

export default CourseTitle
