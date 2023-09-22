# Next.jsチュートリアル 簡易まとめ  [Next.js](https://nextjs.org/learn/foundations/about-nextjs)

## 目次
- [はじめに](#0--はじめに)
    - [0-1 | Next.jsとは](#0-1--nextjsとは)
    - [0-2 | 環境構築](#0-2--環境構築)
- [Next.jsアプリを作成する](#1--nextjsアプリを作成する)
    - [1-1 | セットアップ](#1-1--セットアップ)
    - [1-2 | ページを編集する](#1-2--ページを編集する)
- [ページ間の移動・パス](#2--ページ間の移動・パス)
    - [2-1 | ページ間を移動する](#2-1--ページ間を移動する)
    - [2-2 | ページを移動する](#2-2--ページを移動する)

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

なぜ再読み込みしないかというと、Next.jsではページを事前に読み込んでおくことで、ページの移動を高速化しているためです。詳しくは[公式ドキュメント(ENG)]を参照してください(https://nextjs.org/learn/basics/navigate-between-pages/client-side)

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
