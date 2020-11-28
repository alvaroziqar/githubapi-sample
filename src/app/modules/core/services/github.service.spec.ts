import {
  TestBed,
  getTestBed,
  async,
  waitForAsync
} from '@angular/core/testing';
import { of } from 'rxjs';

import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { GithubService } from './github.service';

describe('Github service', () => {
  let service: GithubService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GithubService],
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(GithubService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it(
    'should get repository',
    waitForAsync(() => {
      const mockUrl = 'angular/angular';

      service.getRepository(mockUrl).subscribe();

      const mockReqUrl = 'angular/angular';
      const mockReq = httpMock.expectOne(mockReqUrl);

      expect(mockReq.request.method).toBe('GET');
      expect(mockReq.request.url).toBe(mockReqUrl);

      mockReq.flush({});
    })
  );

  it(
    'should get repository items without page',
    waitForAsync(() => {
      const mockUrl = 'angular/angular';

      service.getRepositoryIssues(mockUrl).subscribe();

      const mockReqUrl = 'angular/angular/issues';
      const mockReqUrlParams = `${mockReqUrl}?per_page=10`;
      const mockReq = httpMock.expectOne(mockReqUrlParams);

      expect(mockReq.request.method).toBe('GET');
      expect(mockReq.request.url).toBe(mockReqUrl);

      mockReq.flush({});
    })
  );

  it(
    'should get repository items with page',
    waitForAsync(() => {
      const mockUrl = 'angular/angular';
      const mockPage = 3;

      service.getRepositoryIssues(mockUrl, mockPage).subscribe();

      const mockReqUrl = 'angular/angular/issues';
      const mockReqUrlParams = `${mockReqUrl}?per_page=10&page=3`;
      const mockReq = httpMock.expectOne(mockReqUrlParams);

      expect(mockReq.request.method).toBe('GET');
      expect(mockReq.request.url).toBe(mockReqUrl);

      mockReq.flush({});
    })
  );
});
