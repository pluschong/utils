# @pluschong/utils

> JavaScript/TypeScript 通用工具函数库

提供一套经过实践验证的工具函数集合，涵盖日期处理、数字运算、防抖节流、深拷贝、表单验证等常用场景，帮助开发者提升开发效率。

---

## 安装

```bash
npm install @pluschong/utils
# 或者
pnpm add @pluschong/utils
# 或者
yarn add @pluschong/utils
```

## 功能模块

### 📅 日期工具 (date)

基于 dayjs 封装的日期处理工具。

```ts
import { format, diff, countdown, dateIsToday } from '@pluschong/utils/date';

// 格式化日期
format(new Date(), 'YYYY-MM-DD HH:mm:ss');

// 计算日期差
diff('2024-12-31', '2024-01-01', 'day'); // 364

// 倒计时
countdown('2024-12-31 23:59:59').subscribe(time => {
  console.log(time); // { day: '30', hour: '12', min: '30', sec: '45' }
});

// 判断是否今天
dateIsToday(new Date()); // true
```

### ⏱️ 防抖 (debounce)

防止函数在短时间内被频繁调用，只执行最后一次。

```ts
import { debounce } from '@pluschong/utils/debounce';

const debounceSrv = debounce();

// 用户停止输入后才搜索
input.addEventListener('input', () => {
  debounceSrv.start(() => {
    search(input.value);
  }, 300);
});
```

### 🔄 节流 (throttle)

限制函数的执行频率，固定时间内只执行一次。

```ts
import { throttle } from '@pluschong/utils/throttle';

const throttleSrv = throttle();

// 滚动事件节流
window.addEventListener('scroll', () => {
  throttleSrv.start(() => {
    updateScrollPosition();
  }, 200);
});
```

### 🔢 数字工具 (number)

基于 decimal.js 的精确数字运算。

```ts
import { add, subtract, multiply, divide } from '@pluschong/utils/number';

// 避免浮点数精度问题
add(0.1, 0.2); // 0.3 (而不是 0.30000000000000004)
multiply(0.1, 0.2); // 0.02
```

### 📋 深拷贝 (deep)

深度复制对象或数组。

```ts
import { deepClone } from '@pluschong/utils/deep';

const original = { a: 1, b: { c: 2 } };
const cloned = deepClone(original);
cloned.b.c = 3; // 不会影响 original
```

### ✅ 表单验证 (validate)

常用的表单验证函数。

```ts
import { isEmail, isPhone, isIdCard } from '@pluschong/utils/validate';

isEmail('test@example.com'); // true
isPhone('13800138000'); // true
isIdCard('110101199001011234'); // true
```

## 依赖要求

- **rxjs**: ^7.0.0 (用于倒计时功能，需在项目中安装)

## 注意事项

- 日期处理默认使用中文语言环境
- 数字运算使用 decimal.js 保证精度
- 倒计时功能依赖 RxJS，使用前需确保项目已安装 rxjs

## License

MIT
