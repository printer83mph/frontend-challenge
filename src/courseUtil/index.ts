export const isCourseEqual = (c1: CourseSelector, c2: CourseSelector) => (c1.dept === c2.dept && c1.number === c2.number)

export const filterRemoveCourse = (cart: Array<Course>, c: CourseSelector) => cart.filter((cartCourse) => !(isCourseEqual(cartCourse, c)))

export const getCourseKey = ({ dept, number }: CourseSelector) => `${dept.toLowerCase()}-${number}`
