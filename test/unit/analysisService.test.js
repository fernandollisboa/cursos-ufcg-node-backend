import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import * as analysisService from '../../src/services/analysisService';
import * as analysisRepository from '../../src/repositories/analysisRepository';
import { client } from '../../src/databases';

describe('analysisService', () => {
  beforeEach(() => {
    const mockQueryReturn = { rows: [{ name: 'name' }] };
    jest.spyOn(client, 'query').mockResolvedValue(mockQueryReturn);
  });
  it('should call getAnalysisByCourseName', async () => {
    // varias queixa
    throw console.error('not implemented yet');
  });
});
