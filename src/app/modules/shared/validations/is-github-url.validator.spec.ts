import { AbstractControl } from '@angular/forms';
import { isGithubUrl } from './is-github-url.validator';

const mockUrlValid = 'https://github.com/owner/repo';
const mockUrlInvalid1 = 'https://github.com';
const mockUrlInvalid2 = 'https://github.com/owner';
const mockUrlInvalid3 = 'https://mock.com/owner/repo';

describe('Validator: isGithubUrl', () => {
  const resultFn = isGithubUrl();
  it('providing github url, should returns null', () => {
    const control = { value: mockUrlValid } as AbstractControl;
    expect(resultFn(control)).toBe(null);
  });

  it('providing corrects numbers, should return shorts numbers', () => {
    let control = { value: mockUrlInvalid1 } as AbstractControl;
    expect(resultFn(control)).toEqual({ invalidGithubUrl: mockUrlInvalid1 });

    control = { value: mockUrlInvalid2 } as AbstractControl;
    expect(resultFn(control)).toEqual({ invalidGithubUrl: mockUrlInvalid2 });

    control = { value: mockUrlInvalid3 } as AbstractControl;
    expect(resultFn(control)).toEqual({ invalidGithubUrl: mockUrlInvalid3 });
  });
});
