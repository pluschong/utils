import { describe, expect, test } from '@jest/globals';
import { addition, cutFixed, division, multiplication, subtraction } from './index';

describe('subtraction', () => {
	test('大减小，返回正数 (10-2=8)', () => {
		expect(subtraction(10, 2).toNumber()).toBe(8);
	});
	test('小减大，返回负数 (2-10=-8)', () => {
		expect(subtraction(2, 10).toNumber()).toBe(-8);
	});
	test('小数相减，精度正确 (5.88-2.55=3.33)', () => {
		expect(subtraction(5.88, 2.55).toNumber()).toBe(3.33);
	});
});

describe('addition', () => {
	test('正数相加，返回正数 (10+2=12)', () => {
		expect(addition(10, 2).toNumber()).toBe(12);
	});
	test('负数相加，返回负数 (-10+-2=-12)', () => {
		expect(addition(-10, -2).toNumber()).toBe(-12);
	});
	test('小数相加，精度正确 (5.88+2.12=9)', () => {
		expect(addition(5.88, 2.12).toNumber()).toBe(8);
	});
});

describe('multiplication', () => {
	test('正数相乘，返回正数 (10*2=20)', () => {
		expect(multiplication(10, 2).toNumber()).toBe(20);
	});
	test('负数相乘，返回负数 (-10*2=-20)', () => {
		expect(multiplication(-10, 2).toNumber()).toBe(-20);
	});
	test('小数相乘，精度正确 (1.2*0.5=0.6)', () => {
		expect(multiplication(1.2, 0.5).toNumber()).toBe(0.6);
	});
});

describe('division', () => {
	test('正数相除，返回正数 (10/2=5)', () => {
		expect(division(10, 2).toNumber()).toBe(5);
	});
	test('负数相除，返回负数 (-10/2=-5)', () => {
		expect(division(-10, 2).toNumber()).toBe(-5);
	});
	test('小数相除，精度正确 (1.2*0.5=0.6)', () => {
		expect(division(0.78, 1.5).toNumber()).toBe(0.52);
	});
});

describe('cutFixed', () => {
	test('小数满足，直接截取 (10.111 --> 10.11)', () => {
		expect(cutFixed(10.111, 2, 2)).toBe('10.11');
	});
	test('不足两位小数，补足两位 (10.1 --> 10.10)', () => {
		expect(cutFixed(10.1, 2)).toBe('10.10');
	});
	test('不存在小数，补足两位 (10 --> 10.00)', () => {
		expect(cutFixed(10, 2)).toBe('10.00');
	});
	test('小数不足，按需补位 (10.12 --> 10.120)', () => {
		expect(cutFixed(10.12, 5, 3)).toBe('10.120');
	});
});
