import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import * as classesService from '../../src/services/classesService';
import * as classesRepository from '../../src/repositories/classesRepository';
import { client } from '../../src/databases';

describe('classesService', () => {
  beforeEach(() => {
    const mockQueryReturn = { rows: [{ name: 'name' }] };
    jest.spyOn(client, 'query').mockResolvedValue(mockQueryReturn);
  });
  it('should call getAllClassesByCourseName', async () => {
    const spy = jest.spyOn(classesRepository, 'getAllClassesByCourseName');
    await classesService.getAllClassesByCourseName('test');
    expect(spy).toHaveBeenCalled();
  });
});
