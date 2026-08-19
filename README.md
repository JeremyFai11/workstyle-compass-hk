# 職場型格｜自適應深度辨型

給初入職場人士使用的繁體中文（香港用語）性格探索 Web App。測驗以 40 題通用職場情境為核心，只有當四維傾向接近、首兩個類型互相拉扯，或認知功能排序未完全一致時，才追加 8、12 或最多 16 題針對性追問。

線上版本：[workstyle-compass-hk.jeremyfai1126.chatgpt.site](https://workstyle-compass-hk.jeremyfai1126.chatgpt.site)

## 功能

- 手機友善的逐題作答流程及進度顯示
- 五點 A／B 傾向程度，而非強迫二選一
- 40 題核心測驗及自適應追問停止條件
- 最可能及第二可能 MBTI 類型
- E／I、S／N、T／F、J／P 四維傾向
- Ne、Ni、Se、Si、Te、Ti、Fe、Fi 認知功能排序
- 職場優勢、潛在盲點及發展方向
- 結果清晰度、複製摘要及原生分享
- 作答進度只儲存在使用者本機裝置

## 重要說明

本工具參考 MBTI 四維及 Jungian cognitive functions 作自我探索，並非官方 MBTI® Assessment，亦非心理診斷或招聘篩選工具。結果應視為可以透過真實經歷再驗證的最佳吻合假設，而不是固定人格標籤。

MBTI® 是 The Myers-Briggs Company 的註冊商標；本項目與該機構並無關聯。

## 本機開發

需要 Node.js `>=22.13.0`。

```bash
npm install
npm run dev
```

驗證正式版本：

```bash
npm run build
node --test tests/rendered-html.test.mjs
```

主要內容位於：

- `app/quiz-data.ts`：40 題核心題庫、16 題追問題庫、類型內容
- `app/page.tsx`：自適應流程、計分、結果及分享功能
- `app/globals.css`：桌面及手機版視覺樣式

## 技術

- React 19
- TypeScript
- vinext / Vite
- OpenAI Sites hosting

## GitHub Pages

項目包括 GitHub Actions workflow，可把已建置版本輸出成靜態網站並發佈到 GitHub Pages。私人 repository 使用 GitHub Pages 需要支援該功能的 GitHub 付費計劃；Pages 網站本身一般仍是公開網址。
