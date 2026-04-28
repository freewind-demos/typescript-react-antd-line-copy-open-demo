# React 19 + Vite + @line-copy-open 0.1

## 简介

这个 Demo 演示如何在 Vite + React 19 项目里使用 `@line-copy-open/vite@0.1.0` 和 `@line-copy-open/react@0.1.0`。

运行后可以在浏览器里按住 Option 或 Alt 检查页面元素，并从元素定位到 React 源码。

## 快速开始

### 环境要求

需要 Node.js 和 pnpm。

### 运行

```bash
pnpm install
pnpm dev
```

开发服务器固定使用端口 `48237`，启动脚本会执行：

```bash
vite --host --open
```

这个 Demo 使用 npm registry 上的 `@line-copy-open/vite@0.1.0` 和 `@line-copy-open/react@0.1.0`，没有使用本地 workspace 依赖。

## 概念讲解

### 第一部分：Vite 端注入客户端

核心配置在 `vite.config.ts`：

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import openEditorReact from '@line-copy-open/react/vite'
import openEditor from '@line-copy-open/vite'

export default defineConfig({
  plugins: [
    openEditorReact(),
    react(),
    openEditor({
      editor: 'code',
    }),
  ],
  server: {
    port: 48237,
  },
})
```

`openEditor()` 会在开发服务器里注入浏览器端检查器，并处理打开本地编辑器的请求。

这里设置了 `editor: 'code'`，所以点击可定位组件时会显式调用 VS Code 的 `code` 命令。

### 第二部分：React 端注入源码位置

`@line-copy-open/react/vite` 需要放在 React JSX 编译插件之前：

```ts
plugins: [
  openEditorReact(),
  react(),
  openEditor({
    editor: 'code',
  }),
]
```

它会在 JSX 编译前给 React element 补充源码位置信息。浏览器端检查器才能知道一个 DOM 节点来自哪个 React 组件、哪一行代码。

### 第三部分：页面组件

`src/App.tsx` 里有一个小组件：

```tsx
import { type ReactNode } from 'react'

function SourceCard(props: { title: string; children: ReactNode }) {
  return (
    <article className="card">
      <strong>{props.title}</strong>
      <span>{props.children}</span>
    </article>
  )
}
```

页面上渲染了多个 `SourceCard`。检查这些卡片时，可以验证插件是否能把浏览器元素映射回 `SourceCard` 的源码。

## 完整示例

下面是完整的 `vite.config.ts`：

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import openEditorReact from '@line-copy-open/react/vite'
import openEditor from '@line-copy-open/vite'

export default defineConfig({
  plugins: [
    openEditorReact(),
    react(),
    openEditor({
      editor: 'code',
    }),
  ],
  server: {
    port: 48237,
  },
})
```

下面是完整的 `src/App.tsx`：

```tsx
import { useState, type ReactNode } from 'react'
import './App.css'

function SourceCard(props: { title: string; children: ReactNode }) {
  return (
    <article className="card">
      <strong>{props.title}</strong>
      <span>{props.children}</span>
    </article>
  )
}

function App() {
  const [clicks, setClicks] = useState(0)

  return (
    <main className="app">
      <div className="shell">
        <section className="hero">
          <p className="eyebrow">@line-copy-open demo</p>
          <h1>Use Option/Alt inspection to jump from browser UI to React source.</h1>
          <p className="summary">
            This page is intentionally made of several small React components so the
            inspector can show source file, line, and column data injected by
            <code>@line-copy-open/react</code>.
          </p>
        </section>

        <section className="panel">
          <h2>Try it</h2>
          <p>
            Run the dev server, hold <code>Option</code> on macOS or <code>Alt</code> on
            Windows, then hover or long-press a card. Clicking a resolved component opens
            the source through <code>@line-copy-open/vite</code>.
          </p>
          <button className="demo-button" type="button" onClick={() => setClicks(clicks + 1)}>
            Click target: {clicks}
          </button>
        </section>

        <section className="cards" aria-label="Inspectable React cards">
          <SourceCard title="Vite plugin">
            Injects the browser client and handles the local open-editor request.
          </SourceCard>
          <SourceCard title="React plugin">
            Adds debug source metadata before JSX is compiled by the React plugin.
          </SourceCard>
          <SourceCard title="Editor command">
            This demo sets <code>editor: 'code'</code>, so VS Code is used explicitly.
          </SourceCard>
        </section>
      </div>
    </main>
  )
}

export default App
```

## 注意事项

这个 Demo 只用于开发环境。`@line-copy-open/vite` 和 `@line-copy-open/react` 的源码定位能力不应该作为生产功能依赖。

`editor: 'code'` 要求本机能在命令行里执行 `code`。如果你使用 WebStorm，可以把它改成对应的编辑器命令。

## 中文完整讲解

这个 Demo 的关键点是两个插件要配合使用。

`@line-copy-open/react/vite` 负责处理 React 源码。它会在 JSX 被 `@vitejs/plugin-react` 编译之前，把源码路径、行号和列号写进 React element 的调试信息里。因此它必须放在 `react()` 前面。

`@line-copy-open/vite` 负责处理浏览器和本地编辑器之间的连接。它会把检查器 UI 注入到开发页面里，也会在 Vite dev server 上注册打开编辑器的接口。

启动页面后，按住 Option 或 Alt 进入检查模式。鼠标移动到页面里的按钮、卡片或文本区域时，检查器会读取 React 插件注入的源码信息。点击或长按可定位元素后，Vite 插件会收到打开文件请求，并调用配置里的编辑器命令。

所以完整流程是：React 插件写入源码位置，浏览器检查器读取位置，Vite 插件接收请求，本地编辑器打开对应文件。
