import { nthNumber } from './numbers';

describe('nthNumber', () => {
  it('should return "st" for numbers ending in 1, except for 11', () => {
    expect(nthNumber(1)).toBe('st');
    expect(nthNumber(21)).toBe('st');
    expect(nthNumber(101)).toBe('st');
    expect(nthNumber(11)).toBe('th'); // Special case
  });

  it('should return "nd" for numbers ending in 2, except for 12', () => {
    expect(nthNumber(2)).toBe('nd');
    expect(nthNumber(22)).toBe('nd');
    expect(nthNumber(102)).toBe('nd');
    expect(nthNumber(12)).toBe('th'); // Special case
  });

  it('should return "rd" for numbers ending in 3, except for 13', () => {
    expect(nthNumber(3)).toBe('rd');
    expect(nthNumber(23)).toBe('rd');
    expect(nthNumber(103)).toBe('rd');
    expect(nthNumber(13)).toBe('th'); // Special case
  });

  it('should return "th" for numbers ending in 4-9 or 0, or numbers between 11 and 20', () => {
    expect(nthNumber(4)).toBe('th');
    expect(nthNumber(9)).toBe('th');
    expect(nthNumber(10)).toBe('th');
    expect(nthNumber(11)).toBe('th');
    expect(nthNumber(15)).toBe('th');
    expect(nthNumber(20)).toBe('th');
    expect(nthNumber(100)).toBe('th');
  });
});