# Learn Next.js-TypeScript

## 目次
- [Learn Next.js-TypeScript](#learn-nextjs-typescript)
	- [目次](#目次)
	- [セットアップ](#セットアップ)
		- [Node.jsのインストール](#nodejsのインストール)
		- [パッケージマネージャーのインストール](#パッケージマネージャーのインストール)
	- [1 | プロジェクトの作成](#1--プロジェクトの作成)
	- [2 | プロジェクトの開発](#2--プロジェクトの開発)
	- [2.1 | ページの作成](#21--ページの作成)
	- [2.2 | リンクの作成](#22--リンクの作成)
	- [2.3 | アセット、メタデータ、CSSの追加](#23--アセットメタデータcssの追加)

## [セットアップ](#セットアップ)
まずはNext.jsを使用する環境を作成します。

プロジェクトに作成するために必要なものをインストールします。

- Node.js
- パッケージマネージャー
  - npm
  - yarn

### Node.jsのインストール
[Node.js](https://nodejs.org/)の公式サイトからインストーラーをダウンロードしてインストールします。

### パッケージマネージャーのインストール
パッケージマネージャーは、プロジェクトに必要なパッケージを管理するツールです。
これらは、コマンドからインストールすることができます。
```bash
npm install -g yarn
```

以上で、Next.jsを使用する環境が整いました。

## [1 | プロジェクトの作成](#プロジェクトの作成)

それでは、早速プロジェクトの作成に入っていきます。
通常、Next.jsのプロジェクトを作成するには、以下のコマンドで作成する必要があります。
```bash
npx create-next-app
```
しかし、今回は事前に作成しておいたテンプレートを使用してプロジェクトを作成します。

以下のコマンドで、GitHubからテンプレートをクローンすることができます。
```bash
git clone -b learn https://github.com/MiuraManato/nextjs-blog.git
```

クローンして取得したリポジトリは、Next.jsやTypeScript,ESLint,Prettierといったツールを使用するための設定がすでにされています。

## [2 | プロジェクトの開発](#プロジェクトの開発)

それでは、プロジェクトの開発に入っていきます。

今回は、公式チュートリアルを使用していきます。。。が公式チュートリアルはJavaScriptを使用しているため、読み替える必要があります。

そこで、今回はQiitaの記事を参考にしながら、公式チュートリアルをTypeScriptで実装していきます。

[【意訳】Next.jsのチュートリアルをTypeScriptでする](https://qiita.com/h-taro/items/f47bf010d07dc18d190c#navigate-between-pages)


## [2.1 | ページの作成](#ページの作成)
まずは以下のように、ディレクトリ、ファイルを作成します。
```
├── src
│   ├── pages
│   │   ├── index.tsx
│   │   ├── posts
│   │   │   └── first-post.tsx
```

```tsx
// src/pages/posts/first-post.tsx
const FirstPost = () => {
  return (
    <h1>First Post</h1>
  )
};

export default FirstPost;
```

ここではアロー関数という書き方をしています。今回は、functionは使用せず、アロー関数を使用していきます。

ここまで出来たら、以下のコマンドで開発サーバーを起動します。
```bash
npm run dev
```
[localhost:3000](http://localhost:3000/posts/first-post)

## [2.2 | リンクの作成](#リンクの作成)
次に、既存のコードを修正して画面遷移を行えるようにします。

```tsx
// src/pages/posts/first-post.tsx
import Link from "next/link";

const FirstPost = () => {
  return (
    <>
      <h1>First Post</h1>
      <Link href="/">Back to home</Link>
    </>
  )
};

export default FirstPost;
```

```tsx
// src/pages/index.tsx
import Link from "next/link"

const Home = () => {
  return (
    <h1 className="title">
      Read <Link href="/posts/first-post">this page!</Link>
    </h1>
  )
};

export default Home;
```

これらのページでは、Next.jsのLinkコンポーネントを使用しています。

Linkコンポーネントの使い方は、aタグと同じようにhref属性を指定するだけです。しかし、外部のWebページに遷移する場合は、aタグを使用してください。

hrefでの指定は、pagesディレクトリをルートとして指定します。

## [2.3 | アセット、メタデータ、CSSの追加](#アセット、メタデータ、CSSの追加)
次に、アセット、メタデータ、CSSを追加していきます。

まずは、first-post.tsxにタイトルを追加します。
```tsx
// src/pages/posts/first-post.tsx
import Link from "next/link";
import Head from "next/head";

const FirstPost = () => {
  return (
    <>
      <Head>
        <title>First Post</title>
      </Head>

      <h1>First Post</h1>
      <h2>
        <Link href="/">Back to home</Link>
      </h2>
    </>
  );
};

export default FirstPost;
```

次に、複数のページで使用できる共通のレイアウトを作成します。

```tsx
// src/components/Layout/index.tsx
import { LayoutProps } from "@/types/components/Layout";

const Layout = ({ children }: LayoutProps) => {
  return (
    <div>
      {children}
    </div>
  )
};

export default Layout;
```

```ts
// src/types/src/components/Layout/index.ts
import { ReactNode } from "react";

export interface LayoutProps {
  children: ReactNode;
};
```

ここでは、Layoutの引数として、childrenを受け取っています。
引数は型を指定する必要があるため、別の型定義ファイルを作成しています。

次に、作成したLayoutをfirst-post.tsxに適用します。

```tsx
// src/pages/posts/first-post.tsx
import Link from "next/link";
import Head from "next/head";
import Layout from "@/components/Layout";

const FirstPost = () => {
	return (
		<Layout>
			<Head>
				<title>First Post</title>
			</Head>

			<h1>First Post</h1>
			<h2>
				<Link href="/">Back to home</Link>
			</h2>
		</Layout>
	);
}

export default FirstPost;
```

次に、CSSを追加していきます。

```css
/* src/components/Layout/index.module.css */
.container {
  max-width: 36rem;
  padding: 0 1rem;
  margin: 3rem auto 6rem;
}

.header {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.backToHome {
  margin: 3rem 0 0;
}
```

```tsx
// src/components/Layout/index.tsx
import { LayoutProps } from "@/types/components/Layout";
import styles from './index.module.css'

const Layout = ({ children }: LayoutProps) => {
	return (
		<div className={styles.container}>
			{children}
		</div>
	)
};

export default Layout;
```

```css
/* src/globals.css */
html,
body {
  padding: 0;
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu,
    Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  line-height: 1.6;
  font-size: 18px;
}

* {
  box-sizing: border-box;
}

a {
  color: #0070f3;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

img {
  max-width: 100%;
  display: block;
}
```

```css
/* src/styles/utils.module.css */
.heading2Xl {
  font-size: 2.5rem;
  line-height: 1.2;
  font-weight: 800;
  letter-spacing: -0.05rem;
  margin: 1rem 0;
}

.headingXl {
  font-size: 2rem;
  line-height: 1.3;
  font-weight: 800;
  letter-spacing: -0.05rem;
  margin: 1rem 0;
}

.headingLg {
  font-size: 1.5rem;
  line-height: 1.4;
  margin: 1rem 0;
}

.headingMd {
  font-size: 1.2rem;
  line-height: 1.5;
}

.borderCircle {
  border-radius: 9999px;
}

.colorInherit {
  color: inherit;
}

.padding1px {
  padding-top: 1px;
}

.list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.listItem {
  margin: 0 0 1.25rem;
}

.lightText {
  color: #666;
}
```

ここまでの確認をします。

```tsx
├── src
│   ├── components
│   │   └── Layout
│   │       ├── index.module.css
│   │       └── index.tsx
│   ├── pages
│   │   ├── index.tsx
│   │   ├── posts
│   │   │   └── first-post.tsx
│   ├── styles
│   │   ├── utils.module.css
│   │   └── globals.css
│   └── types
│       └── src
│           └── components
│               └── Layout
│                   └── index.ts
```

次に、共通コンポーネントのLayoutを大きく編集していきます。

```tsx
// src/components/Layout/index.tsx
import Head from "next/head";
import Image from "next/image";
import styles from "./index.module.css";
import utilStyles from "@/styles/utils.module.css";
import Link from "next/link";
import { LayoutProps } from "./type";

export const siteTitle = "Next.js Sample Website";

const Layout = ({ children, home }: LayoutProps) => {
	return (
		<div className={styles.container}>
			<Head>
				<link rel="icon" href="/favicon.ico" />
				<meta
					name="description"
					content="Learn how to build a personal website using Next.js"
				/>
				<meta
					property="og:image"
					content={`https://og-image.vercel.app/${encodeURI(
						siteTitle,
					)}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
				/>
				<meta name="og:title" content={siteTitle} />
				<meta name="twitter:card" content="summary_large_image" />
			</Head>
			<header className={styles.header}>
				{home ? (
					<>
						<Image
							priority
							src="/images/profile.jpg"
							className={utilStyles.borderCircle}
							height={144}
							width={144}
							alt=""
						/>
						<h1 className={utilStyles.heading2Xl}>{siteTitle}</h1>
					</>
				) : (
					<>
						<Link href="/">
							<Image
								priority
								src="/images/profile.jpg"
								className={utilStyles.borderCircle}
								height={108}
								width={108}
								alt=""
							/>
						</Link>
						<h2 className={utilStyles.headingLg}>
							<Link href="/" className={utilStyles.colorInherit}>
								{siteTitle}
							</Link>
						</h2>
					</>
				)}
			</header>
			<main>{children}</main>
			{!home && (
				<div className={styles.backToHome}>
					<Link href="/">← Back to home</Link>
				</div>
			)}
		</div>
	);
};

export default Layout;
```

ここでは、Imageタグを使用して画像を表示しています。Imageのsrcは、publicディレクトリをルートとして指定します。

そのため、Imageタグを使用して画像を表示する場合は、publicディレクトリに画像を配置する必要があります。

今回は、/public/images/profile.jpgを指定しているため、任意の画像を配置してください。

ない場合は、以下の画像を使用してください。

![profile.jpg](https://i.imgur.com/cam3Dnx.jpg)

```tsx
// src/components/Layout/type.tsx
import { ReactNode } from "react";

export interface LayoutProps {
	children: ReactNode;
	home?: boolean;
}
```

新しいLayoutをWebサイトのルートに適用します。

```tsx
// src/pages/index.tsx
import Head from "next/head";
import Layout, { siteTitle } from "@/components/Layout";
import utilStyles from "@/styles/utils.module.css";

const Home = () => {
	return (
		<Layout home>
			<Head>
				<title>{siteTitle}</title>
			</Head>
			<section className={utilStyles.headingMd}>
				<p>Hello, World</p>
				<p>
					(This is a sample website - you’ll be building a site like this on{" "}
					<a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
				</p>
			</section>
		</Layout>
	);
};

export default Home;
```

最後に、以下のコマンドを使用してください。
```bash
yarn test-all
```
これを行う事で、コードの自動フォーマットやルールに沿った書き方をしているかを確認することができます。

エラーが発生した場合は、エラー内容を確認して修正してください。

最終的なディレクトリ構成は以下のようになります。
```dir
├── public
│       └── images
│           └── profile.jpg
├── src
│   ├── components
│   │   └── Layout
│   │       ├── index.module.css
│   │       └── index.tsx
│   ├── pages
│   │   ├── index.tsx
│   │   ├── posts
│   │   │   └── first-post.tsx
│   └── styles
│       ├── utils.module.css
│       └── globals.css
```


これで一区切りです。これまでに使用した、よく使われる関数、キーワードなどを確認します。


| 関数、キーワード | 説明 | 補足 |
| --- | --- | --- |
| import | モジュールを読み込む | |
| export | モジュールをエクスポートする | つけることで、importができるようになる |
| default | モジュールのデフォルトエクスポートを指定する | 読み込まれたときに、実行される |
