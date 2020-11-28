import { ShortNumberPipe } from './short-number.pipe';

describe('Pipe: ShortNumber', () => {
  let pipe: ShortNumberPipe;

  beforeEach(() => {
    pipe = new ShortNumberPipe();
  });

  it('create an instance', () => expect(pipe).toBeTruthy());

  it('providing null, NaN or 0 value, should returns null', () => {
    expect(pipe.transform(null)).toBe(null);
    expect(pipe.transform(Number('mock'))).toBe(null);
    expect(pipe.transform(0)).toBe(null);
  });

  it('providing corrects numbers, should return shorts numbers', () => {
    expect(pipe.transform(123)).toBe('123');
    expect(pipe.transform(4123)).toBe('4.1K');
    expect(pipe.transform(54123)).toBe('54.1K');
    expect(pipe.transform(654123)).toBe('654.1K');
  });
});
