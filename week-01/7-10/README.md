## 7 月 10 日日志

### Git 常用命令

#### clone

> 基本格式为：`git clone [url] [directory]`，其中`[directory]`表示需要创建目录的本地名称，省略则默认为版本库的名称。
> 有一些附加参数如下
>
> - `-l | --local`：只有当指定的版本库是一个本地路径才会生效，能跳过正常的传输机制，直接复制`.git`目录下的部分文件，即使不指定这个选项默认也会采用本地优化，但注意由于硬链接的特性，本地优化的克隆方式存在一些风险。
> - `-s | --shared`：当远程版本库在本地机器上时，使用这个选项可以让本地版本库与远程版本库共享对象文件，而不是复制或链接。
> - `--depth <depth>`：使用这个选项可以创建一个浅克隆，即只获取最近的`<depth>`个提交，而不是整个历史记录。这样可以节省时间和空间。
> - `--single-branch`：使用这个选项可以只克隆远程版本库的一个分支，而不是所有分支,来节省克隆时间。默认情况下，这个分支是当前活动分支。

```bash
# 克隆本地机器上的一个项目到本地，目录名为another-runoob-name
git clone /path/to/repo another-runoob-name
# 克隆一个项目到本地，只获取最近的10个提交，目录名为shallow-clone
git clone --depth 10 https://github.com/tianqixin/runoob-git-test shallow-clone
# 克隆一个项目到本地，只获取远程的dev分支，目录名为dev-clone
git clone --single-branch -b dev https://github.com/tianqixin/runoob-git-test dev-clone
```

#### add

> 基本格式为：`git add [file1] [file2] … `，其中`file`为文件名称。
> 有一些附加参数如下
>
> - `-u`：只会添加已经被跟踪的文件，也就是说，它会将修改过或删除过的文件添加到暂存区，但是不会添加新文件。
> - `-A`：会添加所有的文件，包括修改过、删除过和新建的文件。

```bash
# 一个项目，里面有三个文件：a.txt, b.txt, c.txt。其中 a.txt 和 b.txt 是已经被跟踪的文件，c.txt 是新建的文件。

# 添加所有文件
git add .
# 添加 a.txt 和 b.txt
git add -u
# 添加所有的文件
git add -A
```

#### commit

> 基本格式为：`git commit [file1] [file2] … -m 'msg' `，没有`file`文件默认为全部提交。

```bash
git commit test.txt -m 'test'
```

#### branch

> 基本格式为：`git branch <branchname>`，创建一个新的分支。
>
> 有一些附加参数如下
>
> - `-a`：显示本地分支和远程分支。
> - `-m | -M`：重命名当前分支，`-M`为强制重命名，即使名称已存在会强制覆盖掉远程名称。
> - `-d | -D`：删除分支，`-D`强制删除。
> - `-v | -vv`：显示本地分支最后一次提交记录，`-vv`显示本地分支与远程分支的关联。

```bash
# 创建一个 test 分支
git branch test
# 显示本地分支和远程分支
git branch -a
# 删除本地的 test 分支
git branch -d test
# 显示本地分支与远程分支的关联
git branch -vv
```

#### status

> 基本格式为：`git status`
> 快速合并的时候是不会生成提交记录的

```bash
git status
```

#### merge

> 基本格式为：`git merge <branchname>`。

```bash
# 合并 dev 分支
git merge dev
# 合并
git merge --abort
```

#### switch

> `git switch`相比与`git checkout`而言更注重于分支操作，而不会用于恢复文件
> 基本格式为：`git switch <branchname`。
> 常用命令：
>
> - 切换到已存在的分支：`git switch <branch>`
> - 创建并切换到新的分支：`git switch -c <new-branch> [<start-point>]`
> - 从任意分支分离工作树：`git switch --detach [<start-point>]`
> - 创建并切换到孤儿分支：`git switch --orphan <new-branch>`
> - 切换到上一次切换的分支：`git switch -`
>   其中，`<branch>`是要切换到的分支名，`<new-branch>`是要创建的新分支名，`<start-point>`是新分支的起始点，可以是一个提交或者另一个分支。如果省略`<start-point>`，则默认为当前 HEAD 所指向的位置。

```bash
# 切换到 dev 分支
git switch dev
# 创建一个新的分支 feature 并从 dev 分支进行开发
git switch -c feature dev
# 检查某个提交的状态
git switch --detach HEAD~2
# 切换到孤儿分支 docs
git switch --orphan docs
# 切换到上一次分支
git switch -
```

#### restore

> 将文件恢复到最近一次提交的状态
> 基本格式为：`git restore <file>`

```bash
# 恢复工作树的文件
git restore file.txt
# 恢复暂存区的文件
git restore --staged file.txt
# 恢复到特定提交或者分支的状态
git restore --source=dev file.txt
# 交互式模式
git restore --patch
# 同时恢复暂存区和工作树的文件
git restore --staged --worktree file.txt
```

#### log

> 用于显示日志提交信息
> 基本格式为`git log`
> 进入`git log`界面后的操作
>
> - 空格键：向下滚动一屏幕的内容
> - 回车键：向下滚动一行的内容
> - `b` 键：向上滚动一屏幕的内容
> - `k` 键：向上滚动一行的内容
> - `q` 键：退出 `git log` 界面

```bash
git log
```

#### fetch

> 从远程仓库获取数据但不会自动合并
> 基本用法为：`git fetch <remote>`
>
> - 从默认的远程仓库获取数据：`git fetch`
> - 从指定的远程仓库获取数据：`git fetch <remote>`
> - 从指定的远程仓库和分支获取数据：`git fetch <remote> <branch>`
> - 从指定的远程仓库和分支获取数据并更新本地分支：`git fetch <remote> <branch>:<branch>`
> - 从所有配置的远程仓库获取数据：`git fetch --all`

```bash
# fetch 远程库
git fetch origin
# 切换到 main 分支
git switch main
# 合并分支远程 main 分支
git merge origin/main
```

#### push

> 将本地的提交向远程库推送
> 基本格式为：`git push <remote> <branch>`

```bash
# 推送所有分支
git push -a origin
# 推送标签
git push --tags origin
# 强制推送
git push -f origin main
# 删除远程仓库的 feature 分支
git push origin --delete feature
```

#### pull

> 从远程库获取数据并合并
> 基本格式为：`git pull <remote> <branch>`

```bash
# 拉去远程库 main 分支的数据并合并到当前分支
git pull origin main
# 要从 origin 远程仓库的 dev 分支获取最新的提交并合并到当前分支的 my-dev 分支
git pull origin dev:my-dev
# 使用 rebase 选项来拉取代码，在远程库的基础上应用本地更改，不会额外生成合并提交
git pull --rebase origin main
```

#### checkout

> 用于切换分支、恢复文件或检出提交。
> 基本格式为：`git checkout <branch>`

```bash
# 创建新的分支并切换
git checkout dev
# 恢复文件状态，效果与 git restore <file>
git checkout -- file.txt
# 分离工作树，相当于 git switch --detach <commit>
git checkout abc123
```

#### reset

> 用于将当前的`HEAD`复位到指定状态
> 基本格式为：`git reset --[option] <commit>`
> 有三个选项
>
> - `mixed`：将文件回退到工作区，此时会保留工作区中的文件，但会丢弃暂存区中的文件。
> - `soft`：将文件回退到暂存区，此时会保留工作区和暂存区中的文件。
> - `hard`：将文件回退到修改前，此时会丢弃工作区和暂存区中的文件。
>   当版本不同的时候，更改会存放在工作区或者暂存区。

```bash
# 将 HEAD 复位到上一个状态
git reset --hard HEAD^
```

#### revert

> 用于创建一次新的提交来回滚版本
> 基本格式为：`git revert <commit>`

```bash
git revert HEAD
```

#### stash

> 该命令用于将当前工作目录中的临时更改保存到一个栈中，以便你可以切换到其他分支或提交上继续工作。
> 基本格式为：`git stash`

```bash
git stash save "Work in progress"
git stash list
# 恢复并删除stash中存储的最新修改
git stash pop
# 恢复但不删除stash中存储的最新修改
git stash apply
# 恢复但不删除stash中存储的特定提交
git stash apply stash@{0}
```

#### remote

> 用于对远程库进行操作

```bash
# 添加远程库
git remote add upstream https://github.com/runoob/runoob-git-test.git
# 更改远程库的连接
git remote set-url origin git@github.com:tianqixin/runoob-git-test.git
# 将远程库 upstream 重命名为 source
git remote rename upstream source
# 删除远程库
git remote rm source
```

#### cherry-pick

> 基本格式为`git cherry-pick <commitHash>`
>
> - `git cherry-pick <commitHash>`：将某一提交应用到当前分支。
> - `git cherry-pick <branchname>`：将某一分支的最新提交应用到当前分支
> - `git cherry-pick <HashA> <HashB>`：将多个提交应用到当前分支
>
> 选项：
>
> - `-x`:在提交信息的末尾追加一行`(cherry picked from commit ...)`，方便以后查到这个提交是如何产生的。
> - `-s，--signoff`：在提交信息的末尾追加一行操作者的签名，表示是谁进行了这个操作。

```bash
# 转移 A 到 B 之间的提交，不包括 A
git cherry-pick A..B
# 转移 A 到 B 之间的提交，包括 A
git cherry-pick A^..B
```

### Git 使用技巧

#### 查看本地分支与远程分支的关联

```bash
git branch -vv
git remote show origin
```

#### 将本地分支与远程分支关联

```bash
# 本地创建了分支而远程没有
git push -u origin main
git push --set-upstream origin main
# 远程创建了分支而本地没有
git checkout -b dev origin/dev
git checkout --track origin/dev
# 远程分支与本地分支都有
git branch --set-upstream-to=origin/dev
```

#### 如何回退版本

- `git reset --hard HEAD^`
- `git revert HEAD`
- `git checkout commit_id`

#### 查看 Git 日志

```bash
git log
```

#### 如何修改 git commit 信息

> `vim`编辑器的使用
>
> - 按下`i`键，进入插入模式，可以修改提交信息。
> - 按下`Esc`键，退出插入模式，回到命令模式。
> - 在命令模式下，输入`:wq`，保存并退出编辑界面。
> - 在命令模式下，输入`:q!`，放弃修改并退出编辑界面。

```bash
git commit --amend
```

#### 暂存工作区

```bash
git stash
git stash pop
```

#### 多个上游的管理

> 需要多种命令的组合

```bash
# 添加远程库
git remote add upstream https://github.com/runoob/runoob-git-test.git
# fetch 远程库
git fetch origin
# 合并分支
git merge upstream1/main
# 删除远程仓库的 feature 分支
git push origin --delete feature
```
