## 成果物URL

https://weather-react-peach.vercel.app

## 課題の取り組み開始から完了までに要した合計時間

約25〜30時間程度

## 初めて使用する技術があれば、それが何かとその代わりとなる経験があるか

### 初めて使用する技術

- React Testing Library

### 代替となる技術

- Enzyme

## 追加したnpmパッケージがあれば、その選定理由と役割について共有してください

- sass
  - バニラなCSSよりも簡潔に記述することができ、色やフォントのサイズなどの規律を守りやすくするため
- eslint系
- prettier系
- lint-staged
- husky
  - フォーマッター、リンター
  - コミット時のフォーマットやリントチェックの自動化し個人によるコードのばらつきを無くすため
- react-icons
  - デザインをより視覚的にわかりやすくするため
  - svg周りの設定や書き出しの作業をなくすため

---

---

---

## 要件

場所に基づいた天気を表示するアプリケーションの構築。

- [Weather API](https://www.weatherapi.com/) にあるエンドポイントとレスポンス情報を最大限に活用する
- 特定の日時を選択すると、その日時に関する詳細情報を表示する
- 地名または緯度経度を入力すると、特定の場所の天気を表示する

## 開発環境

**使用技術**  
React/TypeScript

**IDE**  
VSCode推奨

- 推奨Extension
  - ESLint
  - Prettier
  - Code Spell Checker

**タスクランナー、PKG管理**  
yarn

## スタイル

下記は基本的に`styles/_variables.scss`内の物を使用すること

- color
- fontSize
