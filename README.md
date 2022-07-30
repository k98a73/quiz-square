# アプリケーション名

Quiz Square

# アプリケーション概要

クイズを作成したり、解答したりできます。

# URL

https://quiz-square.vercel.app/

# テスト用アカウント

問題作成用

- メール：test1@test1.com
- パスワード：test1test1

問題解答用

- メール：test2@test2.com
- パスワード：test2test2

# 利用方法

## 問題作成
[問題作成](https://www.loom.com/share/03dbab9e7ed9417094358a471ec6c573)

<a href="https://www.loom.com/share/03dbab9e7ed9417094358a471ec6c573">
<img width="400px" alt="問題作成" src="https://cdn.loom.com/sessions/thumbnails/03dbab9e7ed9417094358a471ec6c573-with-play.gif"></a>

1. トップページのヘッダーにある「新規登録」ボタンをクリックし、ユーザー登録を行う

[ユーザー登録](https://www.loom.com/share/efa1b03e5bce4569ba97285638bfc4af)
   <img width="400px" alt="ユーザー登録" src="https://cdn.loom.com/sessions/thumbnails/efa1b03e5bce4569ba97285638bfc4af-with-play.gif">
1. 問題一覧ページの「＋」ボタンを押す
2. 問題の内容（ジャンル、問題文、選択肢 A〜D、正解、解説）を入力し、「問題の作成」を押す

## 問題解答
[問題解答](https://www.loom.com/share/197e3103a50c493f8f591df39bb2f048)

<a href="https://www.loom.com/share/197e3103a50c493f8f591df39bb2f048"><img width="400px" alt="問題解答" src="https://cdn.loom.com/sessions/thumbnails/197e3103a50c493f8f591df39bb2f048-with-play.gif"></a>

1. 問題一覧ページにて解答したい問題をクリック
2. 正解だと思う選択肢をクリック
3. 「解答」ボタンを押す

# アプリケーションを作成した背景

プログラミングを学ぶ中で、学習効率を上げるためにはアウトプットが重要だと認識ました。  
しかし、学生時代を振り返ると、その様な機会が少なく、インプット中心の非効率な学習をしていました。  
そこで、クイズを作成できるアプリを開発し、学生達にアウトプットする場の一つとして提供したいと考えました。

# 実装予定の機能

- いいねボタン
- ソート機能（更新日時順、いいねが多い順）

# 開発環境

- フロントエンド
  - React 17.0.2
  - Next.js 12.1.6
  - TypeScript
  - Recoil
  - React Hook Form
  - Chakra UI
- バックエンド
  - Firebase 8.10.0
- Vercel

# ローカルでの動作方法

以下のコマンドを順に実行  
% git clone https://github.com/k98a73/quiz-square.git  
% cd XXXXX  
% yarn install  
% yarn dev

# 工夫した点

1 つ目はユーザーの認証状態により、ページへのアクセスをコントロール機能を実装したことです。ページをリロードしたり、アドレスバーに入力して遷移してきた際もユーザー状態を取得する方法に苦労しました。マウント状態を監視するカスタムフックを用いることで、その問題を解決することが出来ました。

2 つ目はクイズの解答ボタンを押した後に表示されるモーダルの UI です。react-confetti というライブラリを導入し、正解すると、紙吹雪が表示できる様にしました。そうすることで、問題を解くモチベーションの向上に期待して、実装しております。

知人に実際に利用してもらい、ユーザーヒアリングを行いながら改善を行っています。
