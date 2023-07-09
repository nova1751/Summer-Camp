## 7 月 10 日日志

### Git 的操作与使用

#### clone

> 基本格式为：`git clone [url] [directory]`，其中`[directory]`表示需要创建目录的本地名称，省略则默认为版本库的名称。
> 有一些附加参数如下
>
> - `-l | --local`：只有当指定的版本库是一个本地路径才会生效，能跳过正常的传输机制，直接复制`.git`目录下的所有文件，即使不指定这个选项默认也会采用本地优化，但注意由于硬链接的特性，本地优化的克隆方式存在一些风险。
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
