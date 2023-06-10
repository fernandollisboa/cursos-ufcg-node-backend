import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import * as statisticsService from '../../src/services/statisticsService';
import * as statisticsRepository from '../../src/repositories/statisticsRepository';
import { client } from '../../src/databases';

describe('statisticsService', () => {
  beforeEach(() => {
    const mockQueryReturn = {
      rows: [
        { name: 'name', quant: 1 },
        { name: 'otherName', quant: 2 },
      ],
    };
    jest.spyOn(client, 'query').mockResolvedValue(mockQueryReturn);
  });
  it('should call getStatisticsByCourseName', async () => {
    const spy = jest.spyOn(statisticsRepository, 'getByCourseName');
    await statisticsService.getStatisticsByCourseName('test');
    expect(spy).toHaveBeenCalled();
  });
});
