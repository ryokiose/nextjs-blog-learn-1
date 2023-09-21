# Next.jsチュートリアル 簡易まとめ  [Next.js](https://nextjs.org/learn/foundations/about-nextjs)

## 目次
- [はじめに](#はじめに)
    - [0-1 | Next.jsとは](#0-1--nextjsとは)
    - [0-2 | 環境構築](#0-2--環境構築)
- [Next.jsアプリを作成する](#nextjsアプリを作成する)
    - [1-1 | セットアップ](#1-1--セットアップ)
    - [1-2 | ページを編集する](#1-2--ページを編集する)
    - [1-3 | ページ間を移動する](#1-3--ページ間を移動する)

# [はじめに](#)
## [0-1 | Next.jsとは](#)
Next.js は、高速Web アプリケーションを作成するための構成要素を提供する柔軟なReact フレームワークです。

## [0-2 | 環境構築](#)
Next.jsはReactのライブラリです。
そのため、Next.jsを利用するためにReactを利用する環境が必要です。

Reactを利用するためには、Node.jsのバージョン18以降が必要になります。
Node.jsの環境構築は別のPDFを参照してください。

# [Next.jsアプリを作成する](#)
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

これまでで、Webサイトを作成するための準備が整いました。次はページの編集を行っていきます。

## [1-2 | ページを編集する](#)
次はnextjs-blog-learning配下のpagesディレクトリにあるindex.jsを編集していきます。

まずはpages/index.jsを開いてください。

index.jsの中から、以下のような\<h1>タグの部分を探してください。

``` javascript
<h1 className={styles.title}>
    Welcome to <a href="https://nextjs.org">Next.js!</a>
</h1>
```

この部分を以下のように変更してください。

``` javascript
<h1 className={styles.title}>
    Read <Link href="/posts/first-post">this page!</Link>
</h1>
```

この変更では、Welcome to Next.js!という文字列をRead this page!に変更しています。

また、aタグをLinkコンポーネントに変更しています。(Linkコンポーネントについては後述します。)

変更が完了したら、ブラウザ開きリロードしてください。文章が変更されているのを確認できます。

## [1-3 | ページ間を移動する](#)
次はページ間を移動する方法を学びます。

まず、pagesディレクトリにpostsディレクトリを作成してください。

postsディレクトリにfirst-post.jsを作成してください。

ディレクト構成は以下のようになります。
```
pages/posts/first-post.js
```