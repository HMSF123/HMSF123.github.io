# Codeforces 1466E Apollo versus Pan

# $\\mathcal{Translate}$

[题目链接](https://codeforces.com/contest/1466/problem/E)

给定 $n$ 和长度为 $n$ 的序列 $x$，求下面的式子。

$$
\\sum_{i=1}^n \\sum_{j=1}^n \\sum_{k=1}^n (x_i \\, \\& \\, x_j) \\cdot (x_j \\, | \\, x_k)
$$

$1 \\leq n \\leq 5 \\cdot 10^5,0 \\leq x_i < 2^{60}$

# $\\mathcal{Solution}$

先交换求和号之后就可以拆位求了。

$$
\\sum_{i=1}^n \\sum_{j=1}^n \\sum_{k=1}^n (x_i \\, \\& \\, x_j) \\cdot (x_j \\, | \\, x_k)
$$

$$
\\sum_{j=1}^n \\sum_{i=1}^n \\sum_{k=1}^n (x_i \\, \\& \\, x_j) \\cdot (x_j \\, | \\, x_k)
$$

$$
\\sum_{j=1}^n \\sum_{i=1}^n \\left((x_i \\, \\& \\, x_j) \\cdot \\sum_{k=1}^n  (x_j \\, | \\, x_k)\\right)
$$

$$
\\sum_{j=1}^n \\left(\\sum_{i=1}^n (x_i \\, \\& \\, x_j)\\right) \\cdot \\left(\\sum_{k=1}^n  (x_j \\, | \\, x_k)\\right)
$$

先拆位预处理后就能快速计算里面两个式子了。

时间复杂度 $\\mathcal{O(n\\log x_i)}$

# $\\mathcal{Code}$

```cpp
#include<iostream>
#include<cstdio>
#include<algorithm>
#include<cstring>
#include<string>
#define ll long long
#define re register
#define int long long
inline int Max(int x, int y) { return x > y ? x : y; }
inline int Min(int x, int y) { return x < y ? x : y; }
inline int Abs(int x) { return x < 0 ? ~x + 1 : x; }
inline int read() {
	int r = 0; bool w = 0; char ch = getchar();
	while(ch < '0' || ch > '9') {
		if(ch == '-') w = 1;
		ch = getchar();
	}
	while(ch >= '0' && ch <= '9') {
		r = (r << 3) + (r << 1) + (ch ^ 48);
		ch = getchar();
	}
	return w ? ~r + 1 : r;
}
#undef int
const int N = 5e5 + 10; 
const ll mod = 1e9 + 7;

int T, n;
ll a[N], sum[N], ans;

signed main() { T = read(); while(T--) {
	n = read();
	for(int i = 1; i <= n; ++i) a[i] = read();
	for(int i = 0; i <= 60; ++i) sum[i] = 0; ans = 0;
	for(int i = 1; i <= n; ++i) {
		for(int j = 0; j <= 60; ++j)
			if((1ll << j) & a[i])
				++sum[j];
	}
	for(int i = 1; i <= n; ++i) {
		ll sum1 = 0, sum2 = 0;
		for(int j = 0; j <= 60; ++j) {
			ll ss = (1ll << j) % mod;
			if((1ll << j) & a[i]) sum1 += sum[j] * ss % mod,  sum2 += n * ss % mod;
			else sum2 += sum[j] * ss % mod;
			sum1 %= mod, sum2 %= mod;
		}
		ans = (ans + sum1 * sum2 % mod) % mod;
	}
	printf("%lld\n", ans);
}
	return 0;
}
```
