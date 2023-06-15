import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import * as analysisService from '../../src/services/analysisService';
import * as analysisRepository from '../../src/repositories/analysisRepository';
import { client } from '../../src/databases';
import * as openCpuService from '../../src/services/openCpuService';

describe('analysisService', () => {
  beforeEach(() => {
    const mockQueryReturn = { rows: [{ name: 'name' }] };
    jest.spyOn(client, 'query').mockResolvedValue(mockQueryReturn);
    const mockQueryOpenCpuReturn = { rows: [{ name: 'name' }] };
    jest.spyOn(openCpuService, 'openCpu').mockResolvedValue(mockQueryOpenCpuReturn);
    jest
      .spyOn(analysisRepository, 'getCourseCompletionPercentageByAcademicTranscript')
      .mockResolvedValue(0.5);
    jest.spyOn(analysisRepository, 'getEnrollmentFrequency').mockResolvedValue(1);
    jest.spyOn(openCpuService, 'getEnrollmentProbability').mockResolvedValue(0.5);
    jest.spyOn(openCpuService, 'getClassesFailureRisk').mockResolvedValue(0.5);
  });
  it('should call getCourseCompletionPercentageByAcademicTranscript', async () => {
    await analysisService.getCourseAnalysis('courseSchemaName', 'academicTranscript', [
      'classesChosen',
    ]);
    const spy = jest.spyOn(analysisRepository, 'getCourseCompletionPercentageByAcademicTranscript');
    expect(spy).toHaveBeenCalledWith({
      courseSchemaName: 'courseSchemaName',
      academicTranscript: 'academicTranscript',
    });
  });
  it('should call getEnrollmentFrequency', async () => {
    await analysisService.getCourseAnalysis('courseSchemaName', 'academicTranscript', [
      'classesChosen',
    ]);
    const spy = jest.spyOn(analysisRepository, 'getEnrollmentFrequency');
    expect(spy).toHaveBeenCalledWith({
      courseSchemaName: 'courseSchemaName',
      classesChosen: ['classesChosen'],
    });
  });
  it('should call getEnrollmentProbability', async () => {
    await analysisService.getCourseAnalysis('courseSchemaName', 'academicTranscript', [
      'classesChosen',
    ]);
    const spy = jest.spyOn(openCpuService, 'getEnrollmentProbability');
    expect(spy).toHaveBeenCalledWith({
      courseSchemaName: 'courseSchemaName',
      classesChosen: ['classesChosen'],
      academicTranscript: 'academicTranscript',
    });
  });
  it('should call getClassesFailureRisk', async () => {
    await analysisService.getCourseAnalysis('courseSchemaName', 'academicTranscript', [
      'classesChosen',
    ]);
    const spy = jest.spyOn(openCpuService, 'getClassesFailureRisk');
    expect(spy).toHaveBeenCalledWith({
      courseSchemaName: 'courseSchemaName',
      classesChosen: ['classesChosen'],
    });
  });
});
