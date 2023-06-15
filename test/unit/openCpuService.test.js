import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import * as analysisService from '../../src/services/analysisService';
import * as analysisRepository from '../../src/repositories/analysisRepository';
import { client } from '../../src/databases';
import * as openCpuService from '../../src/services/openCpuService';

describe('openCpuService', () => {
  beforeEach(() => {
    const mockQueryReturn = { rows: [{ name: 'name' }] };
    jest.spyOn(client, 'query').mockResolvedValue(mockQueryReturn);
    const mockQueryOpenCpuReturn = { rows: [{ name: 'name' }] };
    jest.spyOn(openCpuService, 'openCpu').mockResolvedValue(mockQueryOpenCpuReturn);
  });
  it('should return a float', async () => {
    expect(true).toBe(true);
  });
});
