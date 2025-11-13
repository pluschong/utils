import Decimal from 'decimal.js';

/**
 * 减法
 */
export function subtraction(num1: number, num2: number) {
	return Decimal.sub(num1, num2);
}

/**
 * 加法
 */
export function addition(num1: number, num2: number) {
	return Decimal.add(num1, num2);
}

/**
 * 乘法
 */
export function multiplication(num1: number, num2: number) {
	return Decimal.mul(num1, num2);
}

/**
 * 除法
 */
export function division(num1: number, num2: number) {
	return Decimal.div(num1, num2);
}

/**
 * 截取小数点后 指定位数，非四舍五入
 * @param number - 要截取的数值
 * @param count - 要截取的位数 默认值 `2 小数点后两位`
 * @param refill - 小数不足时，要补齐的位数 默认值 `2 小数点后两位`
 */
export function cutFixed(number: number, count = 2, refill = 2) {
	const str = number.toString();
	const strSplit = str.split('.');
	const integer = strSplit[0];
	const decimals = strSplit[1];

	if (!decimals) {
		// 不存在小数，根据补位要求补位
		let refillStr = '';
		for (let i = 0; i < refill; i++) {
			refillStr += '0';
		}
		return `${integer}${refillStr ? '.' + refillStr : ''}`;
	}

	if (decimals.length >= count) {
		// 小数位数满足时，直接截取
		return `${integer}.${decimals.slice(0, count)}`;
	}

	// 小数不足时，根据补位数，视情况进行补位
	refill = refill - decimals.length;
	let refillStr = '';
	for (let i = 0; i < refill; i++) {
		refillStr += '0';
	}

	return `${integer}.${decimals}${refillStr}`;
}

/** 千分位显示函数封装*/
export function thousandsFormat(num: number) {
	const arr = num.toString().split('.');
	const str =
		(arr[0] || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') + (arr[1] ? '.' + arr[1] : '');
	return str;
}
