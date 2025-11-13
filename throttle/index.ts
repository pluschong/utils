import type { SafeTimer } from '@pluschong/safe-type';

export class ThrottleService {
	private timer: SafeTimer | null = null;

	/**
	 * @param cb - 回调
	 * @param delay - 定时器时间（毫秒），默认 150ms
	 */
	start(cb: () => void, delay = 150) {
		if (this.timer) return;
		this.timer = setTimeout(() => {
			cb();
			this.timer = null;
		}, delay);
	}

	/**
	 * 取消当前的节流
	 */
	cancel() {
		if (this.timer) {
			clearTimeout(this.timer);
			this.timer = null;
		}
	}

	/**
	 * 检查是否正在节流中
	 */
	isActive() {
		return this.timer !== null;
	}
}

/**
 * 创建一个新的节流实例
 */
export function throttle() {
	return new ThrottleService();
}
