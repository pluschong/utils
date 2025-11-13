import { describe, expect, test } from '@jest/globals';
import { add, toNow } from './index';

describe('toNow', () => {
	test('几秒前', () => {
		expect(toNow(add(new Date(), 58, 'second'))).toBe('几秒前');
	});
	test('1分钟前', () => {
		expect(toNow(add(new Date(), 60, 'second'))).toBe('1 分钟前');
	});
	test('n分钟前', () => {
		const n = 10; // 0 < n < 60
		expect(toNow(add(new Date(), n, 'minute'))).toBe(`${n} 分钟前`);
	});
	test('1小时前', () => {
		expect(toNow(add(new Date(), 60, 'minute'))).toBe(`1 小时前`);
	});
	test('n小时前', () => {
		const n = 10; // 0 < n < 24
		expect(toNow(add(new Date(), n, 'hour'))).toBe(`${n} 小时前`);
	});
	test('1天前', () => {
		expect(toNow(add(new Date(), 24, 'hour'))).toBe(`1 天前`);
	});
	test('n天前', () => {
		const n = 10; // 0 < n < 30
		expect(toNow(add(new Date(), n, 'day'))).toBe(`${n} 天前`);
	});
	test('1个月前', () => {
		expect(toNow(add(new Date(), 30, 'day'))).toBe(`1 个月前`);
	});
});
