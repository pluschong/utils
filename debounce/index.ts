import type { SafeTimer } from '@pluschong/safe-type';

export class DebounceService {
	private timer: SafeTimer | null = null;

	/**
	 * @param cb - 回调
	 * @param delay - 定时器时间（毫秒），默认 150ms
	 */
	start(cb: () => void, delay = 150) {
		this.cancel();
		this.timer = setTimeout(() => {
			cb();
			this.timer = null;
		}, delay);
	}

	/**
	 * 取消当前的防抖
	 */
	cancel() {
		if (this.timer) {
			clearTimeout(this.timer);
			this.timer = null;
		}
	}
}

/**
 * 创建一个新的防抖实例
 */
export function debounce() {
	return new DebounceService();
}
