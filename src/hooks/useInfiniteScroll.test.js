/**
 * @jest-environment jsdom
 */
import { renderHook, act } from '@testing-library/react';
import useInfiniteScroll from './useInfiniteScroll';

describe('useInfiniteScroll', () => {

    // Mock the IntersectionObserver
class IntersectionObserver {
    constructor() {}
  
    observe() {
      // Do nothing
    }
  
    disconnect() {
      // Do nothing
    }
  }
  
  let callback;

  beforeEach(() => {
    callback = jest.fn();
    window.IntersectionObserver = jest.fn((cb, options) => ({
      observe: jest.fn(),
      disconnect: jest.fn(),
    }));
  });

  afterAll(() => {
    delete window.IntersectionObserver;
  });

test('should initialize with isFetching set to false', () => {
    const { result } = renderHook(() => useInfiniteScroll(callback));
    const [isFetching] = result.current;
  
    expect(isFetching).toBe(false);
  });

  test('should set isFetching to true when callback is called', () => {
    const { result } = renderHook(() => useInfiniteScroll(callback));
    const [, setIsFetching] = result.current;
  
    act(() => {
      setIsFetching(true);
    });
  
    const [isFetching] = result.current;
    expect(isFetching).toBe(true);
  });

 
});
