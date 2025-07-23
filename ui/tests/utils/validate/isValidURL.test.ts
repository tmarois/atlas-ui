import { describe, it, expect } from 'vitest';
import { isValidURL } from '../../../src/utils/validate/isValidURL';

describe('isValidURL', () => {
  // Happy path tests
  it('should return true for valid HTTP URL', () => {
    expect(isValidURL('http://example.com')).toBe(true);
  });

  it('should return true for valid HTTPS URL', () => {
    expect(isValidURL('https://example.com')).toBe(true);
  });

  it('should return true for URL with path', () => {
    expect(isValidURL('https://example.com/path/to/resource')).toBe(true);
  });

  it('should return true for URL with query parameters', () => {
    expect(isValidURL('https://example.com/search?q=test')).toBe(true);
  });

  it('should return true for URL with port', () => {
    expect(isValidURL('https://example.com:8080')).toBe(true);
  });

  // Bad path tests
  it('should return false for empty string', () => {
    expect(isValidURL('')).toBe(false);
  });

  it('should return false for invalid URL format', () => {
    expect(isValidURL('not a url')).toBe(false);
  });

  it('should return false for URL with missing protocol', () => {
    expect(isValidURL('example.com')).toBe(false);
  });

  it('should return false for FTP protocol', () => {
    expect(isValidURL('ftp://example.com')).toBe(false);
  });

  it('should return false for malformed URL', () => {
    expect(isValidURL('https://example.')).toBe(false);
  });
});
