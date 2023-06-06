import { describe, it, expect, jest } from '@jest/globals';
import * as coursesService from '../../src/services/coursesService';
import * as coursesRepository from '../../src/repositories/coursesRepository';

describe('coursesService', () => {
  it('should call findAllNewCourses', async () => {
    const spy = jest.spyOn(coursesRepository, 'findAllNewCourses').mockResolvedValueOnce([]);
    await coursesService.findAllNewCourses();
    expect(spy).toHaveBeenCalled();
  });
  it('should call getNewCourse', async () => {
    const spy = jest.spyOn(coursesRepository, 'getNewCourse').mockResolvedValueOnce([]);
    await coursesService.getNewCourse('name');
    expect(spy).toHaveBeenCalled();
  });
  it('should call verifyCourseExists', async () => {
    const spy = jest.spyOn(coursesRepository, 'verifyCourseExists').mockResolvedValueOnce([]);
    await coursesService.verifyCourseExists({ name: 'name', isOld: false });
    expect(spy).toHaveBeenCalled();
  });
  it('should call getSuccessRate', async () => {
    const spy = jest
      .spyOn(coursesRepository, 'getSuccessRateByCourseName')
      .mockResolvedValueOnce([]);
    await coursesService.getSuccessRate('name');
    expect(spy).toHaveBeenCalled();
  });
  it('should call getCourseSuccessRateMaxAndMinSemester', async () => {
    const spy = jest
      .spyOn(coursesRepository, 'getCourseSuccessRateMaxAndMinSemester')
      .mockResolvedValueOnce([]);
    await coursesService.getCourseSuccessRateMaxAndMinSemester('name');
    expect(spy).toHaveBeenCalled();
  });
});
