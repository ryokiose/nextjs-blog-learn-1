# Next.jsチュートリアル 簡易まとめ  [Next.js](https://nextjs.org/learn/foundations/about-nextjs)

## 目次
- [0 | はじめに](#0--はじめに)
    - [0-1 | Next.jsとは](#0-1--nextjsとは)
    - [0-2 | 環境構築](#0-2--環境構築)
- [1 | Next.jsアプリを作成する](#1--nextjsアプリを作成する)
    - [1-1 | セットアップ](#1-1--セットアップ)
    - [1-2 | ページを編集する](#1-2--ページを編集する)
- [2 | ページ間の移動・パス](#2--ページ間の移動・パス)
    - [2-1 | ページ間を移動する](#2-1--ページ間を移動する)
    - [2-2 | ページを移動する](#2-2--ページを移動する)
- [3 | アセット、メタデータ、css](#3--アセットメタデータcss)
    - [3-1 | アセット](#3-1--アセット)
    - [3-2 | メタデータ](#3-2--メタデータ)
    - [3-3 | サードパーティーJavaScript](#3-3--サードパーティーjavascript)
    - [3-4 | CSS](#3-4--css)
    - [3-5 | Layoutを進化させる](#3-5--layoutを進化させる)

# [0 | はじめに](#)
## [0-1 | Next.jsとは](#)
Next.js は、高速Web アプリケーションを作成するための構成要素を提供する柔軟なReact フレームワークです。

## [0-2 | 環境構築](#)
Next.jsはReactのライブラリです。
そのため、Next.jsを利用するためにReactを利用する環境が必要です。

Reactを利用するためには、Node.jsのバージョン18以降が必要になります。
Node.jsの環境構築はPDFがあるため、そちらを参照してください。

# [1 | Next.jsアプリを作成する](#)
## [1-1 | セットアップ](https://nextjs.org/learn/basics/create-nextjs-app/setup)
まずはNext.jsのアプリケーションを作成します。今回はexampleという用意されたものを使用します。

まずはコマンドプロンプトを起動し、アプリケーションを作成したいディレクトリまで移動してください。

次に、以下のコマンドを打ち込みます。
```cmd
npx create-next-app@latest nextjs-blog-learning --use-npm --example "https://github.com/vercel/next-learn/tree/main/basics/learn-starter"
```
このコマンドを使用すると、Nextのテンプレートアプリケーションがダウンロードされます。

次に開発サーバーを実行します。以下のコマンドを実行してください。
```cmd
cd nextjs-blog-learning
npm run dev
```

実行したコマンドを簡単に解説します。

cd - カレントディレクトリを変更します。ここでは、ダウンロードしたnextjs-blog-learningというディレクトリに移動しています。

npm run dev - Next.jsの開発サーバーをポート3000で起動しています。詳しくは後述します。

npm run devで開発サーバーを立ち上げたのでアクセスしてみましょう。
[ここを押してアクセス](http://localhost:3000/)

開発サーバーはコードが変更されると即時に処理が更新されます。
そのため、開発中にサーバーを再起動する必要があまりなく、開発効率が上がります。

これまでで、Webサイトを作成するための準備が整いました。次はページの編集を行っていきます。

## [1-2 | ページを編集する](https://nextjs.org/learn/basics/create-nextjs-app/editing-the-page)
次はnextjs-blog-learning配下のpagesディレクトリにあるindex.jsを編集していきます。

まずはpages/index.jsを開いてください。

index.jsの中から、以下のような\<h1>タグの部分を探してください。

```html
<h1 className={styles.title}>
    Welcome to <a href="https://nextjs.org">Next.js!</a>
</h1>
```

この部分を以下のように変更してください。

```html
<h1 className={styles.title}>
    Learn <a href="https://nextjs.org">Next.js!</a>
</h1>
```
ここでは、Welcome toをLearnに変更しています。

変更が完了したら、ブラウザ開きリロードしてください。文章が変更されているのを確認できます。

# [2 | ページ間の移動・パス](#)
## [2-1 | ページを作成する](https://nextjs.org/learn/basics/navigate-between-pages/pages-in-nextjs)
次はページ間を移動する方法を学びます。

まず、pagesディレクトリにpostsディレクトリを作成してください。

postsディレクトリにfirst-post.jsを作成してください。

ディレクト構成は以下のようになります。
```
pages/posts/first-post.js
```

first-post.jsの中身は以下のようにしてください。

```js
export default function FirstPost() {
    return <h1>First Post</h1>;
}
```

保存したら、このページにアクセスしてみましょう！
[ここを押してアクセス](http://localhost:3000/posts/first-post)

URLを見ると、http://localhost:3000/posts/first-postとなっています。

Next.jsでは、pagesディレクトリにあるファイルは、URLのパスとして認識されます。

このようにして簡単にページを作成することができます。

次にコードの説明をします。

```js
export default function FirstPost()
```
export defaultは、このファイルを他のファイルからimportする際に、この関数をデフォルトで使用することを意味します。つまり、ページが開かれた際に、この関数が実行されます。

```js
return <h1>First Post</h1>;
```
上のコードでexport defaultが起動したときに、returnでHTMLのコードが返却されます。

HTMLをJavaScriptで先に読み込んで置くことで、ページの読み込みを高速化しています。


## [2-2 | ページを移動する](https://nextjs.org/learn/basics/navigate-between-pages/client-side)
次はページを移動する方法を学びます。

Next.jsではページを移動する際に、HTMLの\<a>タグではなく、Next.jsが提供するLinkコンポーネントを使用します。

\<a>タグとLinkコンポーネントの違いは、\<a>タグはページを移動する際に、ページをリロードしますが、Linkコンポーネントはページを移動する際に、ページをリロードしません。

なぜ再読み込みしないかというと、Next.jsではページを事前に読み込んでおくことで、ページの移動を高速化しているためです。詳しくは[公式ドキュメント(ENG)](https://nextjs.org/learn/basics/navigate-between-pages/client-side)を参照してください

### しかし、外部のページに移動する際にはLinkコンポーネントではなく、\<a>タグを使用する必要があるので注意してください。

実際にLinkコンポーネントを使用してみましょう。

まずは、pages/index.jsを開いてください。

一番上の行に以下のようなimport文を追加してください。

```js
import Link from 'next/link';
```
これは、Linkコンポーネントを使用するために必要なimport文です。

次に、index.jsの中から、以下のような\<h1>タグの部分を探してください。

```html
<h1 className={styles.title}>
    Learn <a href="https://nextjs.org">Next.js!</a>
</h1>
```
この部分を以下のように変更してください。
```html
<h1 className={styles.title}>
    Read <Link href="/posts/first-post">this page!</Link>
</h1>
```

変更が完了したら、[http://localhost:3000](http://localhost:3000)にアクセスしてください。

ページの一番上にあるthis page!という文字をクリックすると、/posts/first-postのリンクに飛べるはずです。

次に、pages/posts/first-post.jsを開いてください。

first-post.jsを以下のように変更してください。

```js
import Link from 'next/link';

export default function FirstPost() {
    return (
        <>
            <h1>First Post</h1>
            <h2>
                <Link href="/">Back to home</Link>
            </h2>
        </>
    );
}
```

変更が完了したら、[http://localhost:3000/posts/first-post](http://localhost:3000/posts/first-post)にアクセスしてください。

ページの一番上にあるBack to homeという文字をクリックすると、/のリンクに飛べるはずです。

これで、ページ間を相互に移動できるようになりました。Webサイトではこの機能を使用してページ間を移動していきます。必ず使うのでしっかり覚えておきましょう！

次にコードの解説をします。
```js
return(
    <>
        // any code
    </>
);
```
以前のコードでは、returnの中に\<h1>タグのみがありましたが、今回は\<h1>タグと\<h2>タグがあります。
このようにreturnに複数行記述する場合は、return()の中に\<>と\</>で囲んでから記述します。

こうすることで、return()の中に複数行記述することができます。

# [3 | アセット、メタデータ、css](https://nextjs.org/learn/basics/assets-metadata-css/assets)
## [3-1 | アセット](https://nextjs.org/learn/basics/assets-metadata-css/assets)

まずは[このリンクにアクセス](https://github.com/vercel/next-learn/blob/main/basics/basics-final/public/images/profile.jpg)してprofile.jpgをダウンロードし、/public/images/にprofile.jpgを配置してください。

次に、pages/index.jsを開いてください。

index.jsの中から<footer>を探し、以下のように変更してください。

```html
<img src="/images/profile.jpg" alt="Vercel" className={styles.logo} />
```
このようにすることで静的ファイルを読み込むことができます。(ただし、これは最適化されていないので、後ほど最適化する方法を学びます。)

変更が完了したら、[http://localhost:3000](http://localhost:3000)にアクセスしてください。

ページの一番下にあるVercelのロゴが変更されているはずです。

## [3-2 | メタデータ](https://nextjs.org/learn/basics/assets-metadata-css/metadata)
次はメタデータを変更していきます。

まずはpages/index.jsを開いてください。

index.jsの中の\<Head>タグを探してください。これがメタデータを設定するためのタグです。
\<Head>タグを使うためには、import文を追加する必要があります。

**HTMLにある\<head>タグとNext.jsで使用される\<Head>は別のものです。*H*の大文字と小文字に注意しましょう！**

以下がその例です。

```js
import Head from 'next/head';
```
```html
<Head>
    <title>Create Next App</title>
    <link rel="icon" href="/favicon.ico" />
</Head>
```
ここでは、タイトルをCreate Next Appに設定し、アイコンをfavicon.icoに設定しています。

実際にメタデータを設定してみましょう。

まずは、pages/posts/first-post.jsを開いてください。

メタデータを設定するための\<Head>タグを使用するには、import文を追加する必要があります。追加しましょう。
```js
import Head from 'next/head';
```

次にメタデータを設定していきます。
```html
<Head>
    <title>First Post</title>
</Head>
```

変更が完了したら、[http://localhost:3000/posts/first-post](http://localhost:3000/posts/first-post)にアクセスしてください。

ページのタイトルが変更されているのを確認できます。

## [3-3 | サードパーティーJavaScript](https://nextjs.org/learn/basics/assets-metadata-css/third-party-javascript)

通常のアプリケーションでは以下のように\<head>タグの中に記述して外部Scriptを読み込みます。
```html
<head>
    <script src="https://www.sample.api/"></script>
</head>
```

Next.jsでは、タイトルなどと同様に\<Head>タグを使用して外部Scriptを読み込みむことができます。
```html
<!-- 非推奨 -->
<Head>
    <script src="https://www.sample.api/"></script>
</Head>
```
しかし、この方法では、外部Scriptが読み込まれるまでページが表示されないため、パフォーマンスが低下します。

したがって、\<Head>タグにScriptを記述することは<u>**推奨されていません。**</u>

そこで、Next.jsでは\<Script>タグというものが用意されています。

First-post.jsを編集してみましょう。

\<Script>タグを使用するにはimportをする必要があります。まずはimport文を追加しましょう。
```js
import Script from 'next/script';
```

次に\<Script>タグを使用して外部Scriptを読み込んでみましょう。
ここでは、FacebookのSDKを読み込んでみます。

```js
export default function FirstPost() {
    return (
        <>
            <Head>
                <title>Fist Post</title>
            </Head>
            <Script
                src="https://connect.facebook.net/en_US/sdk.js"
                strategy="lazyOnload"
                onLoad={() =>
                console.log(`script loaded correctly, window.FB has been populated`)
                }
            />
            <h1>First Post</h1>
            <h2>
                <Link href="/">Back to home</Link>
            </h2>
        </>
    );
}
```

\<Script>タグとそのプロパティについて解説します。詳しく知りたい方は[公式ドキュメント](https://nextjs.org/docs/pages/api-reference/components/script)を参照してください。

### src(必須)
読み込む外部ScriptのURLを指定します。

### strategy(任意)
srcで指定した外部Scriptを読み込むタイミングを指定します。
ここではよく使用される2つを紹介します。

**・ afterInteractive(デフォルト)** - ページが開かれ、ある程度ページが読み込まれた後に。

**・ lazyOnload** - ページが読み込まれた後に読み込みます。

### onLoad(任意)
外部Scriptの読み込みが完了した際に実行する関数を指定します。

今回は"script loaded correctly, window.FB has been populated"というメッセージをコンソールに表示し、外部Scriptの読み込みが完了したことを確認できるようにしています。


変更が完了したらコードを保存し、[http://localhost:3000/posts/first-post](http://localhost:3000/posts/first-post)にアクセスしてください。

開発者コンソールを開き、consoleにメッセージが表示されているのを確認できます。

## [3-4 | CSS](https://nextjs.org/learn/basics/assets-metadata-css/css-styling)
Next.jsでは通常の.cssファイルの他、cssモジュールやTailwand CSSのようなライブラリを使用することができます。


### コンポーネントにCSSを適用する
First-post.jsにcssを適用させてみます。

まずは以下のフォルダとファイルを作成してください。
```
/components/layout.js
/components/layout.module.css
```

layout.js
```js
import styles from './layout.module.css';

export default function Layout({ children }) {
    return <div className={styles.container}>{children}</div>;
}
```

layout.module.css
```css
.container {
    max-width: 36rem;
    padding: 0 1rem;
    margin: 3rem auto 6rem;
}
```
/pages/posts/first-post.js
```js
import Link from 'next/link';
import Head from 'next/head';
import Script from 'next/script';
import Layout from '../../components/layout'; // 相対パスでlayout.jsをimportする

export default function FirstPost() {
    return (
        <Layout> <!-- <>から<Layout>に変更 -->
        <Head>
            <title>Fist Post</title>
        </Head>
        <Script
            src="https://connect.facebook.net/en_US/sdk.js"
            strategy="lazyOnload"
            onLoad={() =>
            console.log(`script loaded correctly, window.FB has been populated`)
            }
        />
        <h1>First Post</h1>
        <h2>
            <Link href="/">Back to home</Link>
        </h2>
        </Layout> <!-- <>から変更 -->
    );
}
```

変更が完了したらコードを保存し、[http://localhost:3000/posts/first-post](http://localhost:3000/posts/first-post)にアクセスしてください。

ここではどのような動作をしているかを説明します。

まず、layout.jsをimportしています。これは、\<Layout>タグを使用するために必要なimport文です。

次に、\<Layout>で囲んだ理由を説明します。

\<Layout>タグで囲うと、layout.jsで指定されたlayout.module.cssの.containerのスタイルが適用されます。

この方法はコンポーネントごとにcssを適用するのに役立ちます

### グローバルCSSを作成する
グローバルCSSを作成するには、pages/_app.jsを作成します。
```
pages/_app.js
```
_app.jsには、以下のように記述してください。
```js
import '../styles/global.css';

export default function App({ Component, pageProps }) {
    return <Component {...pageProps} />;
}
```
次にここでimportしているglobal.cssを作成します。最初からあるglobals.cssでは無いので注意してください。
```css
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

**[重要]**
_app.jsは、pagesディレクトリにある全てのページで使用されるコンポーネントです。このファイルを作成したときには、Ctrl + cを押してサーバーを停止し、再度サーバーを起動してください。

グローバルCSSは全てのファイルに影響を及ぼします。そのため、外にimport出来ません。そのため、グローバルCSSを作成するには、pagesディレクトリにある_app.jsを使用します。


ここまで出来たら、サーバーを再起動し、[http://localhost:3000/posts/first-post](http://localhost:3000/posts/first-post)にアクセスしてください。

## [3-5 | Layoutを進化させる](https://nextjs.org/learn/basics/assets-metadata-css/polishing-layout)
これまでは最小限のReactとCSSのコードでした。次のステップに進む前にページを少し改善します。それぞれのファイルを以下のものに書き換えてください。

components/layout.module.css
```css
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
次に新しいファイルを作成します。stylesにutils.module.cssというファイルを作成し、以下のように記述してください。

styles/utils.module.css
```css
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

components/layout.js
```js
import Head from 'next/head';
import Image from 'next/image';
import styles from './layout.module.css';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';

const name = 'Your Name'; // ここに自分の名前を入れてください
export const siteTitle = 'Next.js Sample Website';

export default function Layout({ children, home }) {
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
                <h1 className={utilStyles.heading2Xl}>{name}</h1>
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
                    {name}
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
}
```
それぞれの変更点などを説明します。

### components/layout.module.css
ここでは後ほど使用するheaderとbackToHomeのスタイルを定義しています。
cssの内容については省略します。

### styles/utils.module.css
utils.module.cssはglobalを含む全てのファイルから再利用できるスタイルを定義しています。

### components/layout.js
ここではheaderや戻るボタンなどのコンポーネントを定義しています。

詳しく説明します。

```js
const name = 'Manato Miura';
export const siteTitle = 'Next.js Sample Website';
```
ここでは、サイトのタイトルと名前を定義しています。

exportが付かない場合は、このファイル内でしか使用できませんが、exportを付けることで、他のファイルから使用することができます。

次に\<header>タグの記述について説明します。
```js
export default function Layout({ children, home }) {
    // ...省略
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
                <h1 className={utilStyles.heading2Xl}>{name}</h1>
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
                    {name}
                </Link>
            </h2>
        </>
        )}
    </header>
}
```

ここでは、homeかどうかを判断して表示を変えています。
```js
{home ? (
    // homeが開かれているときの処理
) : (
    // home以外が開かれているときの処理
)}
```

\<main>タグの中にchildrenを表示しています。childrenは、呼び出し元のコンポーネントの中身を表示するためのものです。

```js
<main>{children}</main>
```

ここでは、home以外のページが開かれている時に表示する戻るボタンを定義しています。
```js
{!home && (
<div className={styles.backToHome}>
    <Link href="/">← Back to home</Link>
</div>
)}
```

これらのものを簡潔にまとめると、\<header>、\<main>(呼び出し元)、戻るボタンを表示できます。

これらを使用することでheaderやfooter、など複数の場所で使用することができるコンポーネントを作成、使用することができます。
