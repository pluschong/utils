import dayjs, { OpUnitType } from 'dayjs';
import isToday from 'dayjs/plugin/isToday';
import relativeTime from 'dayjs/plugin/relativeTime';
import IsSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import IsSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import 'dayjs/locale/zh-cn';
import { Observable } from 'rxjs';
import { SafeTimer } from '@pluschong/safe-type';

const config = {
	thresholds: [
		{ l: 's', r: 59, d: 'second' },
		{ l: 'm', r: 119 },
		{ l: 'mm', r: 59, d: 'minute' },
		{ l: 'h', r: 119 },
		{ l: 'hh', r: 23, d: 'hour' },
		{ l: 'd', r: 47 },
		{ l: 'dd', r: 29, d: 'day' },
		{ l: 'M', r: 59 },
		{ l: 'MM', r: 11, d: 'month' },
		{ l: 'y', r: 23 },
		{ l: 'yy', d: 'year' }
	]
};

dayjs.locale('zh-cn');
dayjs.extend(isToday);
dayjs.extend(relativeTime, config);
dayjs.extend(IsSameOrBefore);
dayjs.extend(IsSameOrAfter);

/**
 * 根据传入的令牌字符串获取格式化的日期
 * @param template - 默认值 `YYYY-MM-DD HH:mm:ss`
 */
export function format(time: string | number | Date, template = 'YYYY-MM-DD HH:mm:ss') {
	return dayjs(time).format(template);
}

/**
 * 获取指定日期毫秒数
 */
export function getMillisecond(time: string | number | Date) {
	return dayjs(time).valueOf();
}

/**
 * 表示指定单元中两个日期-时间之间的差异。
 * @param date1 - 靠后日期 `大日期 2022-8-05`
 * @param date2 - 靠前日期 `小日期 2022-8-04`
 * @param unit - 差值级别 默认值 `day`
 */
export function diff(
	date1: string | number | Date,
	date2: string | number | Date,
	unit: 'millisecond' | 'second' | 'minute' | 'hour' | 'day' | 'month' | 'year' = 'day'
) {
	const _date1 = dayjs(date1);
	const _date2 = dayjs(date2);
	return _date1.diff(_date2, unit);
}

/**
 * 计算时间差值
 * @param date1 - 源时间(当前时间)
 * @param date2 - 目标时间(开奖时间)
 * @param unit - 差值级别 默认值 `second`
 */
export function diffDate(
	date1: string | number | Date,
	date2: string | number | Date,
	unit: 'millisecond' | 'second' | 'minute' | 'hour' | 'day' | 'month' | 'year' = 'second'
) {
	const _date1 = dayjs(date1);
	const _date2 = dayjs(date2);
	const diff = _date1.diff(_date2, unit);

	const ds = 60 * 60 * 24;
	const hs = 60 * 60;
	const ms = 60;

	const absDiff = Math.abs(diff);
	const d = Math.floor(absDiff / ds);
	const h = Math.floor((absDiff - d * ds) / hs);
	const m = Math.floor((absDiff - d * ds - h * hs) / ms);
	const s = Math.floor(absDiff - d * ds - h * hs - m * ms);

	return { diff, day: d, hour: h, minute: m, millisecond: s };
}

/**
 * 添加指定的时间
 * @param date - 要计算的日期
 * @param num - 要添加的数量
 * @param unit - 要添加的级别 默认值 `day`
 */
export function add(
	date: string | number | Date,
	num: number,
	unit: 'millisecond' | 'second' | 'minute' | 'hour' | 'day' | 'month' | 'year' = 'day'
) {
	return dayjs(date).add(num, unit).valueOf();
}

/**
 * 判断指定日期是否今天
 */
export function dateIsToday(date: string | number | Date) {
	return dayjs(date).isToday();
}

/**
 * 时间到当前
 */
export function toNow(date: string | number | Date) {
	return dayjs(date).toNow();
}

/**
 * 到指定时间
 */
export function toSpecified(date: string | number | Date) {
	return dayjs().to(date);
}

/**
 * 毫秒转秒
 */
export function millisecondsToSeconds(milliseconds: number) {
	return parseInt((milliseconds / 1000).toString());
}

/**
 * 到今天结束还剩多少秒
 */
export function dayEndOf() {
	const time = new Date().getTime();
	return diff(dayjs(time).endOf('day').valueOf(), time, 'second');
}

/**
 * 倒计时
 * @param endTime - 结束时间
 * @param diffTime - 本地时间和服务器时间差值 (毫秒)
 */
export function countdown(
	endTime: string | number | Date,
	diffTime = 0
): Observable<{ day: string; hour: string; min: string; sec: string }> {
	return new Observable(subscriber => {
		const endMilliseconds = dayjs(endTime).valueOf();
		const startTime = Date.now(); // 记录开始时间
		let tickCount = 0; // 记录已执行的tick次数
		let timerId: SafeTimer | null = null;

		const repair = (n: number) => (n >= 0 && n < 10 ? `0${n}` : `${n}`);

		const tick = () => {
			if (subscriber.closed) {
				if (timerId) clearTimeout(timerId);
				return;
			}

			tickCount++;
			// 基于开始时间和tick次数计算当前时间，避免累积误差
			const currMilliseconds = startTime + diffTime + tickCount * 1000;

			if (currMilliseconds >= endMilliseconds) {
				subscriber.next({ day: '00', hour: '00', min: '00', sec: '00' });
				subscriber.complete();
				return;
			}

			let second = millisecondsToSeconds(endMilliseconds - currMilliseconds);
			const day = Math.floor(second / 86400);
			second = second % 86400;
			const hour = Math.floor(second / 3600);
			second %= 3600;
			const minute = Math.floor(second / 60);
			second %= 60;

			subscriber.next({
				day: repair(day),
				hour: repair(hour),
				min: repair(minute),
				sec: repair(second)
			});

			// 计算下次执行的精确时间
			const nextTickTime = startTime + diffTime + (tickCount + 1) * 1000;
			const delay = nextTickTime - Date.now();

			// 确保延迟时间在合理范围内
			timerId = setTimeout(tick, Math.max(0, delay));
		};

		// 立即执行第一次
		tick();

		// 清理函数
		return () => {
			if (timerId) clearTimeout(timerId);
		};
	});
}

/**
 * 相同
 */
export function isSame(date: string | number | Date, unit: OpUnitType = 'day') {
	return dayjs().isSame(date, unit);
}

/**
 * 当前日期是否在提供的日期时间 之后
 */
export function isAfter(date: string | number | Date, unit: OpUnitType = 'day') {
	return dayjs().isAfter(date, unit);
}

/**
 * 当前日期是否在提供的日期时间 相同或之前
 */
export function isSameOrBefore(date: string | number | Date, unit: OpUnitType = 'day') {
	return dayjs().isSameOrBefore(date, unit);
}

/**
 * 当前日期是否在提供的日期时间 相同或之后
 */
export function isSameOrAfter(date: string | number | Date, unit: OpUnitType = 'day') {
	return dayjs().isSameOrAfter(date, unit);
}
