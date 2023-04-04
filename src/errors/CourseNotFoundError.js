import NotFoundError from './NotFoundError';

export default class CourseNotFoundError extends NotFoundError {
  constructor(atribute, value) {
    super(atribute, value, 'Course');
    this.name = 'CourseNotFoundError';
  }
}
