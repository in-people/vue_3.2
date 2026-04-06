# Git Commit 规范详解

## 📋 规范概述

本项目使用了 **Commitlint** + **Commitizen** 来规范 Git 提交信息，确保提交信息的统一性和可读性。

## 📝 Commit 信息格式

### 基本格式
```
<type>: <subject>
```

### 完整格式
```
<type>: <subject>

<body>

<footer>
```

## 🎯 提交类型

根据配置文件，项目定义了 **10 种提交类型**：

| Type | 名称 | 说明 | 示例 |
|------|------|------|------|
| **feat** | 新功能 | 添加新功能或特性 | `feat: 用户管理添加创建时间列` |
| **fix** | 修复 | 修复 bug | `fix: 修复搜索框无法清空的问题` |
| **docs** | 文档 | 文档变更 | `docs: 更新 README 项目说明` |
| **style** | 格式 | 代码格式调整 | `style: 统一代码缩进格式` |
| **refactor** | 重构 | 代码重构 | `refactor: 重构表格列渲染逻辑` |
| **perf** | 性能 | 性能优化 | `perf: 优化列表渲染性能` |
| **test** | 测试 | 增加测试 | `test: 添加用户管理单元测试` |
| **chore** | 构建 | 构建工具变动 | `chore: 更新依赖包版本` |
| **revert** | 回退 | 回退之前的提交 | `revert: 回退 feat/user-login` |
| **build** | 打包 | 打包构建 | `build: 更新 webpack 配置` |

## ⚙️ 规则配置

### 1. Commitlint 配置

**文件位置**: `commitlint.config.js`

```javascript
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // type 必须在定义的范围内
    'type-enum': [2, 'always', [
      'feat', 'fix', 'docs', 'style', 
      'refactor', 'perf', 'test', 
      'chore', 'revert', 'build'
    ]],
    // subject 大小写不做校验
    'subject-case': [0]
  }
}
```

**规则说明**:
- `type-enum`: 强制使用定义的类型
- `level 2`: 错误级别，会阻止提交
- `always`: 始终检查
- `subject-case`: 不限制 subject 的大小写

### 2. Commitizen 配置

**文件位置**: `.cz-config.js`

```javascript
module.exports = {
  types: [
    { value: 'feat', name: 'feat:     新功能' },
    { value: 'fix', name: 'fix:      修复' },
    { value: 'docs', name: 'docs:     文档变更' },
    { value: 'style', name: 'style:    代码格式(不影响代码运行的变动)' },
    {
      value: 'refactor',
      name: 'refactor: 重构(既不是增加feature，也不是修复bug)'
    },
    { value: 'perf', name: 'perf:     性能优化' },
    { value: 'test', name: 'test:     增加测试' },
    { value: 'chore', name: 'chore:    构建过程或辅助工具的变动' },
    { value: 'revert', name: 'revert:   回退' },
    { value: 'build', name: 'build:    打包' }
  ],
  messages: {
    type: '请选择提交类型:',
    customScope: '请输入修改范围(可选):',
    subject: '请简要描述提交(必填):',
    body: '请输入详细描述(可选):',
    footer: '请输入要关闭的issue(可选):',
    confirmCommit: '确认使用以上信息提交？(y/n/e/h)'
  },
  // 跳过详细描述和 footer
  skipQuestions: ['body', 'footer'],
  subjectLimit: 72
}
```

## 🚀 使用方式

### 方式 1: 使用 Commitizen 交互式提交（推荐）

```bash
# 安装 commitizen 全局工具
npm install -g commitizen

# 在项目中提交代码
git add .
npm run commit  # 或 git commit
```

**交互流程**:
```
? 请选择提交类型:
❯ feat:     新功能
  fix:      修复
  docs:     文档变更
  style:    代码格式(不影响代码运行的变动)
  refactor: 重构(既不是增加feature，也不是修复bug)
  perf:     性能优化
  test:     增加测试
  chore:    构建过程或辅助工具的变动
  revert:   回退
  build:    打包

? 请简要描述提交(必填): 用户管理添加创建时间列

? 确认使用以上信息提交？(y/n/e/h) 
```

### 方式 2: 手动编写提交信息

```bash
git commit -m "feat: 用户管理添加创建时间列"
```

**⚠️ 注意**: 必须遵循规范格式，否则会报错

```bash
# ❌ 错误示例（会被阻止）
git commit -m "添加时间列"
# ERROR: type must be one of [feat, fix, docs, ...]

# ✅ 正确示例
git commit -m "feat: 用户管理添加创建时间列"
```

## 💡 实际提交示例

### 示例 1: 新功能
```bash
feat: 用户管理添加创建时间列

- 创建时间格式化工具函数（src/utils/filters.js）
- 用户管理表格新增创建时间列，位于状态和操作之间
- Mock 数据添加 create_time 字段，模拟不同时间的用户注册记录
- 添加国际化翻译支持（中文/英文）
- 使用 dayjs 格式化时间戳，默认格式为 YYYY-MM-DD HH:mm:ss

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
```

### 示例 2: 修复 bug
```bash
fix: 用户搜索框添加清空按钮功能

- 为用户搜索输入框添加 clearable 属性
- 点击清空按钮时自动触发搜索刷新数据
- 提升用户体验，无需手动删除搜索内容
```

### 示例 3: 文档更新
```bash
docs: 更新项目设计文档

添加全屏功能、面包屑、菜单等功能的详细分析
- 全屏功能实现分析
- 动态面包屑功能实现分析  
- 汉堡按钮功能实现分析
- Layout 布局架构实现分析
- 路由守卫实现分析
- Axios 拦截器实现分析
```

### 示例 4: 重构
```bash
refactor: 抽离表格列配置到独立文件

- 创建 tableColumns.js 统一管理列配置
- 使用循环渲染替代硬编码的表格列
- 优化代码结构，提升可维护性
- 支持通过 slot 属性配置自定义插槽
```

### 示例 5: 样式调整
```bash
style: 统一表格样式格式

- 调整表格列宽配置
- 统一缩进和空格格式
- 优化代码可读性
```

## ✨ 提交规范的好处

| 好处 | 说明 |
|------|------|
| **统一性** | 所有提交信息格式统一，易于阅读 |
| **自动化** | 可以自动生成 CHANGELOG |
| **回溯性** | 清晰的提交历史，便于查找 |
| **协作** | 团队成员快速理解修改内容 |
| **发布** | 基于提交类型自动确定版本号 |

## 🔧 Git Hooks 集成

项目配置了 Husky，在 Git commit 时自动执行 commitlint：

**文件位置**: `.husky/commit-msg`

```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npx --no -- commitlint --edit $1
```

**作用**: 每次提交时自动检查 commit 信息格式

## ⚠️ 错误处理

### 常见错误

**错误 1: 类型不匹配**
```bash
✗ type must be one of [feat, fix, docs, style, refactor, perf, test, chore, revert, build]
```
**解决**: 使用正确的类型前缀

**错误 2: 格式不正确**
```bash
✗ subject may not be empty
```
**解决**: 确保 `type:` 后面有描述内容

**错误 3: 缺少冒号**
```bash
✗ subject must be in form "type: subject"
```
**解决**: 确保 type 和 subject 之间有冒号和空格

## 📚 最佳实践

### ✅ 推荐做法

1. **使用交互式提交**
   ```bash
   npm run commit
   ```

2. **提交信息简洁明了**
   ```bash
   # ✅ 好的提交
   feat: 添加用户管理搜索功能
   
   # ❌ 不好的提交
   feat: add user search function to manage users and can search by username and email and mobile and other fields
   ```

3. **一个提交只做一件事**
   ```bash
   # ✅ 好的做法
   feat: 添加用户搜索
   fix: 修复搜索bug
   
   # ❌ 不好的做法
   feat: 添加搜索并修复bug和更新文档
   ```

4. **使用中文还是英文**
   - 根据团队规范选择
   - 本项目使用中文

5. **添加协作署名（可选）**
   ```bash
   feat: 添加新功能
   
   Co-Authored-By: 协作者名称 <email@example.com>
   ```

### ❌ 避免做法

```bash
# ❌ 避免无意义的提交
update
fix bug
tmp
test

# ❌ 避免混合多种修改
feat: 添加用户和修复bug和更新配置

# ❌ 避免过长的提交信息
feat: 这个提交包含了很多功能，包括用户管理、商品管理、订单管理等模块的开发和测试工作，涉及到前端的页面开发和后端的接口对接
```

## 📂 配置文件说明

```
项目根目录/
├── commitlint.config.js    # Commitlint 规则配置 ⭐
├── .cz-config.js           # Commitizen 配置 ⭐
├── .husky/
│   ├── commit-msg         # Git Hook 钩子 ⭐
│   └── pre-commit         # 提交前检查钩子
└── package.json
    ├── commitizen: {...}  # Commitizen 配置
    └── husky: {...}       # Husky 配置
```

## 🔄 完整工作流程

```bash
# 1. 修改代码
vim src/views/users/index.vue

# 2. 查看修改
git status
git diff

# 3. 暂存修改
git add .

# 4. 使用 Commitizen 提交
npm run commit

# 5. 按提示选择类型和填写描述
? 请选择提交类型: feat
? 请简要描述提交: 添加用户搜索功能

# 6. 如果格式正确，提交成功
[master abc1234] feat: 添加用户搜索功能
 1 file changed, 15 insertions(+)

# 7. 如果格式错误，Husky 会阻止提交
✗ type must be one of [feat, fix, docs, style, refactor, perf, test, chore, revert, build]
```

## 🎯 Subject 编写建议

### 长度限制
- 最大 72 个字符
- 保持简洁明了

### 语言风格
- 使用祈使句
- 不要句号结尾
- 首字母小写（中文除外）

### 好的示例
```bash
# ✅ 简洁清晰
feat: 添加用户搜索
fix: 修复登录bug
docs: 更新README

# ❌ 冗长模糊
feat: 实现了一个可以搜索用户的功能
fix: 修复了那个关于登录的问题
update: 更新了一些文件
```

## 📊 提交类型选择指南

不知道选择哪种类型？参考这个决策树：

```
是添加新功能吗？
├─ 是 → feat
└─ 否 → 是修复 bug 吗？
    ├─ 是 → fix
    └─ 否 → 是文档修改吗？
        ├─ 是 → docs
        └─ 否 → 是代码格式调整吗？
            ├─ 是 → style
            └─ 否 → 是代码重构吗？
                ├─ 是 → refactor
                └─ 否 → 是性能优化吗？
                    ├─ ��� → perf
                    └─ 否 → 是添加测试吗？
                        ├─ 是 → test
                        └─ 否 → 是构建/工具变动吗？
                            ├─ 是 → chore
                            └─ 否 → build
```

## 🔍 快速参考

### 提交类型速查表

| 场景 | 使用类型 |
|------|---------|
| 新增功能 | `feat` |
| 修复 bug | `fix` |
| 更新文档 | `docs` |
| 格式调整 | `style` |
| 代码重构 | `refactor` |
| 性能优化 | `perf` |
| 添加测试 | `test` |
| 构建/工具 | `chore` |
| 回退提交 | `revert` |
| 打包构建 | `build` |

### 常用命令

```bash
# 交互式提交
npm run commit

# 手动提交
git commit -m "feat: 简短描述"

# 修改最后一次提交
git commit --amend

# 查看提交历史
git log --oneline

# 查看提交详情
git show <commit-hash>
```

## 📖 总结

本项目的 commit 规范具有以下特点：

- ✅ **类型完整**: 覆盖所有常见的提交场景
- ✅ **工具支持**: Commitizen + Commitlint 自动化
- ✅ **中文友好**: 使用中文描述
- ✅ **强制执行**: Git Hooks 自动检查
- ✅ **易于使用**: 交互式提交界面

通过这套规范，可以确保项目的 Git 历史清晰、规范，便于团队协作和版本管理。

## 🤔 常见问题 FAQ

### Q1: 必须使用 Commitizen 吗？
**A**: 不是必须的，但强烈推荐。你也可以手动编写符合规范的提交信息。

### Q2: 提交信息可以使用英文吗？
**A**: 可以，只要遵循 `type: subject` 格式即可。本项目推荐使用中文。

### Q3: 如何跳过 Git Hooks 检查？
**A**: 使用 `--no-verify` 参数（不推荐）：
```bash
git commit --no-verify -m "your message"
```

### Q4: 忘记写详细描述怎么办？
**A**: 可以使用 `git commit --amend` 修改最后一次提交。

### Q5: 如何撤销已经 push 的提交？
**A**: 需要使用 `git revert` 创建一个新的提交来撤销之前的提交。

### Q6: Co-Authored-By 是什么？
**A**: 用于标记协作提交，当多人共同完成某个功能时使用。

## 📞 获取帮助

如果遇到问题，可以：
- 查看项目文档：`docs/`
- 查看 Commitizen 官方文档：https://github.com/commitizen/cz-cli
- 查看 Commitlint 官方文档：https://commitlint.js.org/

---

**最后更新**: 2026-04-06
**维护者**: 项目团队
