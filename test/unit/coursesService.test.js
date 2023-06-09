import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import * as coursesService from '../../src/services/coursesService';
import * as coursesRepository from '../../src/repositories/coursesRepository';
import { client } from '../../src/databases';

describe('coursesService', () => {
  beforeEach(() => {
    const mockQueryReturn = { rows: [{ name: 'name' }] };
    jest.spyOn(client, 'query').mockResolvedValue(mockQueryReturn);
  });
  it('should call findAllNewCourses', async () => {
    const spy = jest.spyOn(coursesRepository, 'findAllNewCourses');
    await coursesService.findAllNewCourses();
    expect(spy).toHaveBeenCalled();
  });
  it('should call getNewCourse', async () => {
    const spy = jest.spyOn(coursesRepository, 'getNewCourse');
    const params = 'name';
    await coursesService.getNewCourse(params);
    expect(spy).toHaveBeenCalledWith(params);
  });
  it('should call verifyCourseExists', async () => {
    const spy = jest.spyOn(coursesRepository, 'verifyCourseExists');
    const params = 'name';
    await coursesService.verifyCourseExists(params);
    expect(spy).toHaveBeenCalledWith(params);
  });
  it('should call getSuccessRate', async () => {
    const spy = jest.spyOn(coursesRepository, 'getSuccessRateByCourseName');
    const params = 'name';
    await coursesService.getSuccessRate(params);
    expect(spy).toHaveBeenCalledWith(params);
  });
  it('should call getCourseSuccessRateMaxAndMinSemester', async () => {
    const spy = jest.spyOn(coursesRepository, 'getCourseSuccessRateMaxAndMinSemester');
    const params = 'name';
    await coursesService.getCourseSuccessRateMaxAndMinSemester(params);
    expect(spy).toHaveBeenCalledWith(params);
  });
  it('should call getCourseCorrelations', async () => {
    //const spy = jest.spyOn(coursesRepository, 'getCourseCorrelations');
    //const params = 'name';
    //await coursesService.getCourseCorrelations(params);
    //expect(spy).toHaveBeenCalledWith(params);
  });
});
