---
title: "printf is weird"
date: 2024-08-02T13:59:27-07:00
summary: ...but in a surprisingly useful way
draft: false
---

Today I learned that the `printf` in bash is *weird*. In particular, it has one very strange feature that separates it from its C ancestor.

From the [reference manual](https://www.gnu.org/software/bash/manual/bash.html#index-printf):
> The format is **reused as necessary** to consume all of the arguments. If the format requires more arguments than are supplied, the extra format specifications behave as if a zero value or null string, as appropriate, had been supplied. The return value is zero on success, non-zero on failure.

Let's look at some examples.

```bash
printf ",%s" a b c d
```

What would you expect this to print?

Fans of the C programming language might assume a `-Wformat-extra-args` warning, and the string `",a"` to be printed. However, if we try this in our shell, we get this peculiar result:

```
,a,b,c,d
```

Even more interestingly, if we try this with multiple format specifiers:

```bash
printf "^%s%s$ " a b c d e
```

We get the result:

```
^ab$ ^cd$ ^e$
```

*weird.*
