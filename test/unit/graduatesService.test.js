import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import * as graduatesService from '../../src/services/graduatesService';
import * as graduatesRepository from '../../src/repositories/graduatesRepository';
import { client } from '../../src/databases';

describe('graduatesService', () => {
  beforeEach(() => {
    const mockQueryReturn = { rows: [{ name: 'name' }] };
    jest.spyOn(client, 'query').mockResolvedValue(mockQueryReturn);
  });
  it('should call getGraduatesByCourseName', async () => {
    const spy = jest.spyOn(graduatesRepository, 'getByCourseName');
    await graduatesService.getAllCourseGraduates('test');
    expect(spy).toHaveBeenCalled();
  });
});
