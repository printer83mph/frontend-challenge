import React from 'react'
import { NavLink, useParams } from 'react-router-dom'
import courses from '../data/courses.json'

export default () => {
  const { course } = useParams<{ course?: string }>()
  return (
    <ul>
      {courses.map(({ dept, number }) => (
        <li key={`${dept}-${number}`}>
          <NavLink
            to={`/courses/${dept}-${number}`}
          >
            <h3>
              {dept}
              {' '}
              {number}
            </h3>
            {course && (
            <div>
              Bro...
            </div>
            )}
          </NavLink>
        </li>
      ))}
    </ul>
  )
}
