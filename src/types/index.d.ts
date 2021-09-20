// this is kind of shit for real data but since were just pulling from json for now i dont care

type CourseSelector = {
  dept: string,
  number: number,
}

type Course = CourseSelector & {
  title: string,
  description: string
}

// todo: add more of the data pulled from api into this
type CourseFetched = {
  activity: string
  prerequisite_notes: Array<string>
}
