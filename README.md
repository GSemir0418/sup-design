### 1 项目搭建

- `pnpm create vite `

### 2 配置 sass

- `pnpm i sass`

- shared/reset.scss

```scss
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
*::before,
*::after {
  box-sizing: border-box;
}

a {
  color: inherit;
  text-decoration: none;
}

h1,
h2,
h3,
h4,
h5 {
  font-weight: normal;
}

button,
input {
  font: inherit;
}
```

- shared/vars.scss

```scss
:root {
  --text-color: red;
}
```

### 3 配置路由

- 安装`react-router-dom`

```bash
$ pnpm add react-router-dom
```

- src 下创建路由配置文件`src/config/routes`，利用 react 路由的懒加载——即对组件进行分割打包成多个 chunk 来减少一次性加载的资源大小，从而加快首屏渲染速度，提升用户体验

```ts
import { lazy } from "react";

const routes = [
  {
    path: "/",
    exact: true,
    component: lazy(() => import("../view/home")),
    name: "Home",
  },
  {
    path: "/home",
    component: lazy(() => import("../view/home")),
    name: "Home",
  },
  {
    path: "/page1",
    component: lazy(() => import("../view/page1")),
    name: "Page1",
  },
  ...
];
export default routes;
```

- 封装`router.tsx`作为路由文件入口。由于路由是以懒加载的形式渲染的，所以切换页面时可能会产生延迟，因此使用`Suspense`组件将路由组件包裹，并在 fallback 中声明懒加载组件加载完成前做的事，优化整个页面的交互
- 注意 Route 中的`component`属性改为了`element`

```tsx
import { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import routes from './config/routes'

const Router = () => {
  const myRoutes = routes.map(item => {
    return (
      <Route key={item.path} path={item.path} element={<item.component />} />
    )
  })
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>{myRoutes}</Routes>
    </Suspense>
  )
}

export default Router
```

- `App.tsx`，注意使用`HashRouter`或`BrowserRouter`组件包裹`Router`

```tsx
import Router from './router'
import { HashRouter, Link } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Link to="/">Home Page</Link>
        <Link to="/page1">Page1</Link>
        <Link to="/page2">Page2</Link>
        <Router />
      </HashRouter>
    </div>
  )
}

export default App
```

### 4 eslint 与 prettier 配置

- 安装 eslint 与 prettier

```bash
$ pnpm add -D @typescript-eslint/eslint-plugin eslint eslint-plugin-react @typescript-eslint/parser prettier
```

- `.eslintrc.js`

```js
module.exports = {
  // react17以上的版本，使用plugin:react/jsx-runtime
  extends: ['eslint:recommended', 'plugin:react/jsx-runtime'],
  // 代码运行环境
  env: {
    browser: true,
    commonjs: true,
    es6: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      modules: true,
    },
    sourceType: 'module',
    ecmaVersion: 6,
  },
  plugins: ['react', '@typescript-eslint'],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.tsx', '.ts', '.js', '.json'],
        alias: [['@', './src']],
      },
    },
  },
  rules: {
    /*
     * 建议规则
     */
    // 必须使用全等
    eqeqeq: 2,
    // 不建议使用consolelog
    'no-console': 1,
    // 不建议使用alert
    'no-alert': 2,
    // 强制对多行注释使用特定风格，块注释或行注释
    // 'multiline-comment-style': 2,
    // 不建议使用不必要的分号
    'no-extra-semi': 2,
    // 不建议使用短符号进行类型转换（禁用隐式转换）
    'no-implicit-coercion': 2,
    // 不建议注释与代码在同一行
    'no-inline-comments': 2,
    // 不建议在三元操作数中间换行
    // 'no-nested-ternary': 2,
    // 不建议将变量初始化为undefined
    'no-undef-init': 2,
    // 不建议在有更简单的可替代的表达式时(||)使用三元操作符
    'no-unneeded-ternary': 2,
    // 不建议变量定义却不使用
    'no-unused-expressions': 2,
    // 不建议使用var
    'no-var': 2,
    // 推荐对象字面量简写语法
    'object-shorthand': 1,
    // 推荐回调函数使用箭头函数形式
    'prefer-arrow-callback': 1,
    // 优先使用对象与数组的解构语法
    'prefer-destructuring': 1,
    // 建议使用模板字符串而非字符串拼接
    'prefer-template': 2,
    // 在注释内容前建议添加空格
    'spaced-comment': 1,

    /*
     * 布局风格
     */
    // 在数组开括号后和闭括号前强制换行
    'array-bracket-newline': ['error', { multiline: true }],
    // 建议数组方括号中使用一致的空格？
    'array-bracket-spacing': 0,
    // 建议多项数据的最后一项保留逗号
    'comma-dangle': ['error', 'always-multiline'],
    // 建议逗号前添加空格
    'comma-spacing': ['error', { before: false, after: true }],
    // 箭头函数前后应有空格
    'arrow-spacing': 2,
    // 强制使用一致的空格，默认逗号放在数组元素、对象属性或变量声明之后
    'comma-style': 2,
    // 不建议在计算属性（obj[foo] || { [foo]: 1 }）中使用空格
    'computed-property-spacing': 2,
    // 强制在点号之前或之后换行
    // 'dot-location': ['error', 'object'],
    // 函数调用时，名称与括号之间不建议存在空格
    'func-call-spacing': 2,
    // 在迭代器函数名与*号之间是否存在空格
    /* 'generator-star-spacing': ['error', 'before'], */
    // 缩进为2
    indent: ['error', 2, { SwitchCase: 1 }],
    // jsx元素中的属性使用双引号
    'jsx-quotes': ['error', 'prefer-double'],
    // 对象的key和value之间要有空格
    'key-spacing': ['error', { beforeColon: false, afterColon: true }],
    // 强制在关键字（else this function）前后使用一致的空格
    'keyword-spacing': ['error', { before: true }],
    // 允许注释周围存在空行
    'lines-around-comment': [
      'error',
      // 在对象字面量的开始位置、在块语句的结束位置允许注释
      { allowObjectStart: true, allowBlockStart: true },
    ],
    // 要求调用无参构造函数时带括号
    'new-parens': 'error',
    // 要求方法链中每个调用都有一个换行符
    'newline-per-chained-call': 'error',
    // 空格只允许一个
    'no-multi-spaces': 'error',
    // 不允许出现多个空行
    'no-multiple-empty-lines': 'error',
    // 行尾禁止出现空格
    'no-trailing-spaces': 'error',
    // 属性前（foo. bar）不允许出现空格
    'no-whitespace-before-property': 'error',
    // enforce consistent line breaks after opening and before closing braces
    // 'object-curly-newline': ['error', { multiline: true }],
    // 花括号前后要有空格
    'object-curly-spacing': ['error', 'always'],
    // 当代码块只有一条语句时，省略花括号
    curly: ['error', 'multi-or-nest'],
    // 换行时换行符放在操作符后面（即操作符后换行）
    'operator-linebreak': ['error', 'after'],
    // 建议对象的属性在各自的独立行
    'object-property-newline': [
      'error',
      { allowAllPropertiesOnSameLine: true },
    ],
    // 在剩余和扩展运算符及其表达式之间不需要空格（... a）
    'rest-spread-spacing': ['error', 'never'],
    // 分号前无空格，分号后有空格（for循环）
    'semi-spacing': ['error', { before: false, after: true }],
    // 强制分号出现在行尾
    'semi-style': ['error', 'last'],
    // 要求块语句之前有空格（func() {}，try {}，if() {}）
    'space-before-blocks': 'error',
    // 函数圆括号之前是否存在空格
    'space-before-function-paren': [
      'error',
      { anonymous: 'always', named: 'never', asyncArrow: 'always' },
    ],
    // 禁止圆括号内出现空格
    'space-in-parens': ['error', 'never'],
    // 要求操作符周围有空格（1 === 1）
    'space-infix-ops': 'error',
    // 要求一元操作符（new delete typeof ! ++）在之前或之后存在空格
    'space-unary-ops': [2, { words: true }],
    // 要求包裹正则表达式
    'wrap-regex': 2,
    // Enforce spacing around the * in yield* expressions
    /* 'yield-star-spacing': ['error', 'before'], */
  },
}
```

- `.prettierrc.js`

```js
module.exports = {
  // 对象花括号内部前后有空格
  bracketSpacing: true,
  // 缩进 2
  tabWidth: 2,
  // 句尾分号
  semi: false,
  // 使用单引号
  singleQuote: true,
  // 最后一项后的逗号
  trailingComma: 'all',
  // 元素的‘>’单独一行
  bracketSameLine: false,
  arrowParens: 'avoid',
  // jsx中使用双引号
  jsxSingleQuote: false,
  stylelintIntegration: true,
  eslintIntegration: true,
}
```

### 5 husky 配置 github 提交代码规范

- 安装 husky

- > [Husky - Git hooks (typicode.github.io)](https://typicode.github.io/husky/#/?id=install)

```bash
$ pnpm add husky -D
# 初始化husky，将git hooks交由husky执行
$ npx husky install
husky - Git hooks installed
# 在package.json添加命令
$ npm set-script prepare "husky install"
# 会在每次pnpm install时自动执行，神奇呀！
```

- 安装 pre-commit，在 commit 之前（`git add`后），代码会自动判断暂存区的代码是否符合规范，并对暂存区指定文件进行格式化

- > [okonet/lint-staged: 🚫💩 — Run linters on git staged files (github.com)](https://github.com/okonet/lint-staged#examples)

```bash
# 自动格式化lint-staged
$ pnpm add lint-staged -D
$ npx husky add .husky/pre-commit "npx lint-staged"
husky - created .husky/pre-commit
# 提交一下
$ git add .husky/pre-commit
```

- 创建`.lintstagedrc.json`

```json
{
  "*.{js,jsx,ts,tsx}": ["npx prettier --write", "npx eslint --fix"],
  // 暂无stylelint
  "*.{css,less,scss}": ["npx prettier --write", "npx stylelint --fix"],
  "*.{json,md}": ["npx prettier --write"]
}
```

- 安装`commitlint`，在 pre-commit 之后运行，检查 commit 的内容

- > [Local setup (commitlint.js.org)](https://commitlint.js.org/#/guides-local-setup)

```bash
# 安装anglar的提交规范
$ pnpm add @commitlint/config-conventional @commitlint/cli -D
# 配置commitlint去使用conventional的配置
$ echo "module.exports = { extends: ['@commitlint/config-conventional'] };" > commitlint.config.js
# 添加commit-msg钩子，会在pre-commit之后运行，检查commit message的内容
$ npx husky add .husky/commit-msg 'npx --no -- commitlint --edit $1'
```

### 6 stylelint 配置

- `pnpm i -D stylelint stylelint-config-standard postcss postcss-scss`

- .stylelintrc.js

```js
module.exports = {
  extends: ['stylelint-config-standard'],
  plugins: ['stylelint-order'],
  customSyntax: 'postcss-scss',
  rules: {
    indentation: 2,
    'no-descending-specificity': null,
  },
}
```

### 7 axios 配置

- 安装

```bash
$ pnpm add axios
```

- 封装`(src/api/request.ts)`

```tsx
import { notification } from 'antd'
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
}

class MyAxios {
  instance: AxiosInstance

  constructor(config: AxiosRequestConfig) {
    this.instance = axios.create(config)
    // 全局请求拦截
    this.instance.interceptors.request.use(
      config => config,
      error => error,
    )
    // 全局响应拦截
    this.instance.interceptors.response.use(
      res => res.data,
      error => {
        // 在响应拦截器中添加统一的错误处理
        const { response, request } = error
        if (response && response.status) {
          const errorText = codeMessage[response.status] || response.statusText
          const { status } = response
          const { responseURL: url } = request
          notification.open({
            message: `请求错误 ${status}: ${url}`,
            description: errorText,
          })
        } else if (!response) {
          notification.open({
            message: '网络错误',
            description: '您的网络发生异常，无法连接服务器',
          })
        }
        return response
      },
    )
  }

  // request作为原型方法继承给实例
  request(config: AxiosRequestConfig): Promise<AxiosResponse> {
    return new Promise<AxiosResponse>((resolve, reject) => {
      this.instance
        .request(config)
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}

const myAxios = new MyAxios({
  // 根据环境变量改变前缀
  baseURL: '/api',
  timeout: 0,
  headers: {
    Authorization: `Bearer d38de888-cb73-4cf1-a335-d3f47312f148`,
  },
})

export default myAxios
```

- 开发环境`proxy`代理

```tsx
// vite.config.ts
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "http://10.30.20.203:8080",
        // changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  ...
}
```

### 8 classnames

- `pnpm add classnames`

```tsx
import classnames from 'classnames'
import s from './About.module.scss'
const About = () => {
  return (
    <div className={classnames(s.wrapper, s.test_clns)}>This is About Page</div>
  )
}
export default About
```

- 修改 stylelint，支持蛇形命名(snake_case)

```js
rules: {
	indentation: 2,
	'no-descending-specificity': null,
	'selector-class-pattern': '^([a-z][a-z0-9]*)(_[a-z0-9]+)*$',
},
```

### 9 打包发布

#### 9.0 注意

- 目前在默认的构建结果中 JS 和 CSS 文件是分开的，这样的做法就导致了在引入这个库时还需要额外引入它的 CSS

- 关于库模式下 CSS 可否作为样式被注入有这样一个 issue，[Can css be styleInjected in library mode?](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fvitejs%2Fvite%2Fissues%2F1579)。当前 Vite 并没有对此进行支持

#### 9.1eslint 添加 node 环境支持

```js
// .eslintrc.js
module.exports = {
  // 代码运行环境
  env: {
  	...
    node: true,
  },
}
```

#### 9.2 自动生成.d.ts 类型声明文件

- 方案一 将 tsc 的配置通过命令行的方式传递，并写入 npm scripts，在 build 后自动执行 tsc 以输出层类型文件

```shell
tsc src/components/index.ts --declaration --emitDeclarationOnly --jsx react-jsx --esModuleInterop --outDir dist
```

- 方案二 为构建过程单独撰写配置文件，构建时通过`-p`参数指定此配置文件即可

```json
// tsconfig.build.json
{
  "extends": "./tsconfig.json", // 拓展 tsconfig.json 的配置
  "compilerOptions": {
    "noEmit": false, // 允许生成文件
    "declaration": true, // 需要设置为 true 来支持类型
    "emitDeclarationOnly": true, // 只生成类型文件
    "declarationDir": "dist", // 类型文件的导出目录
    "jsx": "react-jsx", // 允许使用 jsx
    "esModuleInterop": true
  },
  "include": ["src/components/index.ts"] // 编译目标仅为 src 文件夹下的文件
}

// package.json
"scripts": {
    "build-lib": "vite build && tsc -p tsconfig.build.json",
    // "build-lib": "tsc && vite build && tsc src/components/index.ts --declaration --emitDeclarationOnly --jsx react-jsx --esModuleInterop --outDir dist",
},
```

#### 9.3 vite 构建 lib 的配置

```ts
// vite.config.ts
export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/components/index.ts'),
      name: 'MyLib',
      formats: ['es'],
      fileName: format => `my-lib.${format}.js`,
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['react', 'react-dom'],
    },
  },
})
```

#### 9.4 添加 module scss 的类型声明

```ts
// index.d.ts
declare module '*.module.scss' {
  const classes: { [key: string]: string }
  export default classes
}
```

#### 9.5 发布

- 进入 dist 目录下
- `npm init -y `

```json
// package.json
{
  "name": "sup-design",
  "version": "0.0.7",
  "description": "",
  "main": "my-lib.es.js",
  "author": "GSemir",
  "keywords": ["react", "ui", "component", "typescript"],
  "homepage": "https://github.com/GSemir0418/sup-design",
  "repository": {
    "type": "git",
    "url": "https://github.com/GSemir0418/sup-design"
  },
  "bugs": {
    "url": "https://github.com/GSemir0418/sup-design/issues",
    "email": "gsemir0418@gmail.com"
  },
  "license": "MIT",
  "private": false,
  "module": "my-lib.es.js",
  "types": "index.d.ts",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  }
}
```

- `npm adduser`
- 如果添加用户失败需要恢复镜像源，不用淘宝源
  - `npm config set registry https://registry.npmjs.org/ `
- `npm publish`

### 10 Icon 组件

#### 10.1 配置 svg 雪碧图制作插件

> [vite-plugin-svg-icons/README.zh_CN.md at main · vbenjs/vite-plugin-svg-icons (github.com)](https://github.com/vbenjs/vite-plugin-svg-icons/blob/main/README.zh_CN.md)

```ts
// 安装
pnpm install vite-plugin-svg-icons -D
// vite.config.ts
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
const path = require('path')

export default () => {
  return {
    plugins: [
      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [path.resolve(process.cwd(), 'src/icons')],
        // 指定symbolId格式
        symbolId: 'icon-[dir]-[name]',

        /**
         * 自定义插入位置
         * @default: body-last
         */
        inject?: 'body-last' | 'body-first'

        /**
         * custom dom id
         * @default: __svg__icons__dom__
         */
        customDomId: '__svg__icons__dom__',
      }),
    ],
  }
}
// 在 src/main.ts 内引入svg雪碧图插件的注册脚本
import 'virtual:svg-icons-register'
```

#### 10.2 编写 Icon 组件

- 目录结构

```
├── Icon.module.scss
├── Icon.tsx
└── icons
    ├── factory.svg
    ├── resource.svg
    └── workshop.svg
```

- 组件源码，支持自定义 classname 以及 fill-color

```tsx
import classnames from 'classnames'
import s from './Icon.module.scss'
interface IconProps {
  name: IconName
  color?: string
  className?: string
}
type IconName = 'factory' | 'workshop' | 'resource'
const Icon = (props: IconProps) => {
  const { name, color, className } = props
  const symbol = `icon-${name}`
  return (
    <svg className={classnames(s.icon, className)} fill={color}>
      <use xlinkHref={`#${symbol}`} />
    </svg>
  )
}
export default Icon
```

#### 10.3 雪碧图原理

在项目启动后，将 icons 中的 svg 文件批量引入，并形成一个大 svg 元素，每个小 svg 文件作为大 svg 元素中的`symbol`标签，同时指定每个 symbol 的`id`，最终将大 svg 标签插入到 dom 结构中隐藏起来，这样我们在使用时就可以通过`<use xlinkHref={#symbol-id}/>`的形式展示图标了

#### 10.4 Icon Api

| 属性      | 说明                                                | 类型   | 默认值 |
| --------- | --------------------------------------------------- | ------ | ------ |
| name      | 项目图标库中的图标名称                              | string | -      |
| className | 组件 svg 元素类名，用于自定义样式，支持 CSS Modules | string | -      |
| color     | 图标填充颜色                                        | string | '#333' |

- 使用

```tsx
import { Icon } from 'sup-design'
...
<Icon name='factory' color='red' className='custom-icon'>

// CSS
.custom-icon {
    height: 16px;
    width: 16px;
}
```
