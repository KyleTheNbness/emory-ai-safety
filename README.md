# Emory AI Safety 网站

Emory AI Safety 社团官网。网站由 GitHub Pages 免费托管，改完文字后大约 1 分钟自动更新。

## 怎么改文字（不用懂代码）

所有文字都在下面这些文件里。在 GitHub 网页上点开文件，点右上角的铅笔图标编辑，改完点 **Commit changes** 保存。

| 想改什么 | 打开哪个文件 |
|---|---|
| 社团名字、邮箱、报名表链接 | `_config.yml` |
| 首页各段标题和介绍文字 | `_data/text.yml` |
| 活动 | `_data/events.yml` |
| Fellowship 每周课表 | `_data/syllabus.yml` |
| 三个项目（Technical / Policy / Research） | `_data/programs.yml` |
| 干部名单和照片 | `_data/team.yml` |
| 常见问题 | `_data/faq.yml` |

### 编辑时注意三点

1. 冒号后面要**空一格**再写内容，例如 `title: Info session`。
2. 如果句子里本身有冒号，整句用英文双引号包起来，例如 `title: "Reading: Sleeper Agents"`。
3. 缩进用空格，不要用 Tab，并且和上下行对齐。

改坏了也不用担心：GitHub 会保留每一次修改，在 **History** 里可以找回旧版本。

### 加活动

在 `_data/events.yml` 里复制一整块，改掉内容：

```yaml
- date: Jan 22
  title: Spring kickoff
  details: 6:00 PM · White Hall 101
```

### 换干部照片

1. 打开 `assets/img/team/` 文件夹，点 **Add file → Upload files** 上传照片（正方形效果最好，比如 `jane.jpg`）。
2. 在 `_data/team.yml` 里把对应的人写成 `photo: assets/img/team/jane.jpg`。

### 换首页照片

把新照片上传到 `assets/img/`，然后在 `_data/text.yml` 里改对应的 `photo:`。如果换了照片，记得同时改掉或删掉页脚的照片署名（`footer_credit`）。

## 第一次上线（只需做一次）

1. 在仓库页面点 **Settings → Pages**。
2. **Source** 选 **Deploy from a branch**，Branch 选 `main`，文件夹选 `/ (root)`，点 **Save**。
3. 等 1–2 分钟，页面顶部会显示网址，类似 `https://你的用户名.github.io/仓库名/`。

## 邀请 co-organizer 一起编辑

**Settings → Collaborators → Add people**，输入对方的 GitHub 用户名。对方接受邀请后就能直接编辑。

## 在自己电脑上预览（可选）

```bash
gem install jekyll
jekyll serve
```

然后打开 http://localhost:4000 。

## 照片来源

首页三张校园照片来自 Wikimedia Commons，摄影师 Marc Merlin，授权协议 CC BY-SA 4.0。使用时必须保留页脚的署名。
