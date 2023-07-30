<script setup lang="ts">
import handleResize from '@/utils/resize'
import { useContactStore } from '@/stores/contact'
import { useUserStore } from '@/stores/user'
import type { privateMessage } from '@/types/message'
import { IPAddress } from '@/utils/request'
import { getGroupInfoAPI } from '@/apis/group'
import type { groupMember } from '@/types/group'
const userStore = useUserStore()
const concatStore = useContactStore()
const edit = ref<HTMLDivElement | null>(null)
let socket: WebSocket | null
const privateMessageList = ref<privateMessage[]>([])
let receiver_id: number | null = 0
const initSocket = () => {
  if (socket) {
    socket.close()
    socket = null
    privateMessageList.value = []
  }
  if (concatStore.currentRoom.type) {
    socket = new WebSocket(
      `ws://127.0.0.1:8888/api/chat/v1/message/chat?room=${concatStore.currentRoom.room}&id=${concatStore.currentRoom.group}&type=group`
    )
    receiver_id = concatStore.currentRoom.group
  } else {
    socket = new WebSocket(
      `ws://127.0.0.1:8888/api/chat/v1/message/chat?room=${concatStore.currentRoom.room}&id=${userStore.userInfo?.id}&type=private`
    )
    receiver_id = userStore.userInfo!.id
  }

  socket.onopen = () => {
    console.log('连接成功')
  }
  socket.onmessage = (message) => {
    //通知列表更新
    // $emit('updateList')
    let data = JSON.parse(message.data)

    if (data instanceof Array) {
      privateMessageList.value.push(...data)
    } else {
      privateMessageList.value.push(data)
    }

    // setTimeout(() => {
    //   $nextTick(() => {
    //     $refs.record.scrollTop = $refs.record.scrollHeight
    //   })
    // }, 50)
  }
  socket.onclose = () => {
    console.log('连接关闭')
  }
}
watch(concatStore.currentRoom, () => {
  initSocket()
  if (concatStore.currentRoom.type) {
    getGroupInfo()
  }
})
const editor = ref<HTMLDivElement | null>(null)
// 定义发送文本消息的方法
const sendMessage = () => {
  if (editor.value?.innerText == '') {
    return
  }
  let sendMessage = editor.value?.innerText.replace(/^\s+|\s+$/g, '')
  socket!.send(
    JSON.stringify({
      sender_id: userStore.userInfo?.id,
      receiver_id: receiver_id,
      content: sendMessage,
      avatar: userStore.userInfo?.avatar.replace(IPAddress, ''),
      room: concatStore.currentRoom.room,
      type: 'text'
    })
  )
  editor.value!.innerText = ''
}
const msgList = ref<HTMLDivElement | null>(null)
onUpdated(() => {
  setTimeout(() => {
    msgList.value!.scrollTop = msgList.value!.scrollHeight
  }, 100)
})
// 处理发送图片的逻辑
const SendImage = (e: any) => {
  if (e.target.files.length > 0) {
    let file = e.target.files[0]
    const reader = new FileReader()
    reader.readAsArrayBuffer(file)
    reader.onload = (event) => {
      const fileContent = reader.result
      const content = new Uint8Array(fileContent as ArrayBuffer)
      let filename = file.name
      socket!.send(
        JSON.stringify({
          filename: filename,
          sender_id: userStore.userInfo?.id,
          receiver_id: receiver_id,
          content: Array.from(content),
          avatar: userStore.userInfo?.avatar.replace(IPAddress, ''),
          room: concatStore.currentRoom.room,
          type: 'image'
        })
      )
    }
  }
}
const imgUp = ref<HTMLInputElement | null>(null)
const groupInfo = ref<groupMember[]>([])
const getGroupInfo = async () => {
  const res = await getGroupInfoAPI({ group_id: concatStore.currentRoom.group })
  if (res.code === 200) {
    groupInfo.value = res.data.members
  }
}
</script>
<template>
  <div class="chat-room">
    <div class="header">
      <div class="name">{{ concatStore.currentRoom.name }}</div>
      <div class="tool-box">
        <div class="tool">
          <i class="iconfont icon-icon_yingyongguanli" onclick="toggle()"></i
          ><i class="iconfont icon-xiala"></i>
          <div class="box" id="box">
            <div class="group">
              <div><i class="iconfont icon-folder1"></i></div>
              <div>群文件</div>
            </div>
            <div class="group">
              <div><i class="iconfont icon-photo"></i></div>
              <div>群相册</div>
            </div>
            <div class="group">
              <div><i class="iconfont icon-paper"></i></div>
              <div>群作业</div>
            </div>
            <div class="group">
              <div><i class="iconfont icon-video"></i></div>
              <div>群视频</div>
            </div>
            <div class="group">
              <div><i class="iconfont icon-jingpinketang"></i></div>
              <div>群课堂</div>
            </div>
          </div>
        </div>
        <div class="tool" onclick="openModal()">
          <i class="iconfont icon-iconfontphone"></i>
        </div>
        <div class="tool" onclick="openModal()">
          <i class="iconfont icon-video"></i>
        </div>
        <div class="tool" onclick="openModal()">
          <i class="iconfont icon-pingmugongxiang"></i>
        </div>
        <div class="tool" onclick="openModal()">
          <i class="iconfont icon-tianjiahaoyou"></i>
        </div>
        <div class="tool" onclick="openSide()">
          <i class="iconfont icon-iosgengduo"></i>
        </div>
      </div>
      <div class="modal" id="myModal">
        <!-- 模态框的内容 -->
        <div class="modal-dialog" id="dialog">
          <div class="left">
            <div class="search">
              <span><i class="iconfont icon-search"></i></span>
              <input type="text" class="search-bar1" id="search2" placeholder="搜索" autofocus />
              <span id="clear2" class="clear"><i class="iconfont icon-clear"></i></span>
            </div>
            <div class="contact">
              <div class="row drag-row">
                <i class="iconfont icon-xiala" id="icon" style="transform: rotate(-90deg)"></i
                >最近联系人
                <div class="user-list" id="userList">
                  <div class="user">
                    <label>
                      <input type="checkbox" id="check-only" class="check-only" />
                      <label for="check-only" class="label">✓</label>
                      <div class="avatar">
                        <img src="./images/noa.png" alt="" />
                      </div>
                      <div class="name">测试测试测试</div></label
                    >
                  </div>
                  <div class="user">
                    <label>
                      <input type="checkbox" id="check-only1" class="check-only" />
                      <label for="check-only1" class="label">✓</label>
                      <div class="avatar">
                        <img src="./images/noa.png" alt="" />
                      </div>
                      <div class="name">测试测试测试</div></label
                    >
                  </div>
                  <div class="user">
                    <label>
                      <input type="checkbox" id="check-only3" class="check-only" />
                      <label for="check-only3" class="label">✓</label>
                      <div class="avatar">
                        <img src="./images/noa.png" alt="" />
                      </div>
                      <div class="name">测试测试测试</div></label
                    >
                  </div>
                  <div class="user">
                    <label>
                      <input type="checkbox" id="check-only4" class="check-only" />
                      <label for="check-only4" class="label">✓</label>
                      <div class="avatar">
                        <img src="./images/noa.png" alt="" />
                      </div>
                      <div class="name">测试测试测试</div></label
                    >
                  </div>
                  <div class="user">
                    <label>
                      <input type="checkbox" id="check-only5" class="check-only" />
                      <label for="check-only5" class="label">✓</label>
                      <div class="avatar">
                        <img src="./images/noa.png" alt="" />
                      </div>
                      <div class="name">测试测试测试</div></label
                    >
                  </div>
                  <div class="user">
                    <label>
                      <input type="checkbox" id="check-only6" class="check-only" />
                      <label for="check-only6" class="label">✓</label>
                      <div class="avatar">
                        <img src="./images/noa.png" alt="" />
                      </div>
                      <div class="name">测试测试测试</div></label
                    >
                  </div>
                </div>
              </div>
              <div class="row"><i class="iconfont icon-xiala"></i>家人</div>
              <div class="row"><i class="iconfont icon-xiala"></i>同学</div>
              <div class="row"><i class="iconfont icon-xiala"></i>群聊</div>
            </div>
          </div>
          <div class="right">
            <div class="desc" style="font-size: 20px">添加成员</div>
            <div class="modal-footer">
              <button class="modal-button modal-button-confirm" onclick="closeModal()">确定</button>
              <button class="modal-button modal-button-cancel" onclick="closeModal()">取消</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="chat-area">
      <div class="chat">
        <div class="msg" id="msg-list" ref="msgList">
          <template v-for="message in privateMessageList" :key="message.created_at">
            <template v-if="message.sender_id !== userStore.userInfo?.id">
              <div class="msg-left" v-if="message.type === 'text'">
                <div class="avatar">
                  <el-avatar :size="48" :src="message.avatar ? IPAddress + message.avatar : null">
                    <el-icon :size="24"><IEpUserFilled /></el-icon
                  ></el-avatar>
                </div>
                <div class="bubble">
                  <div class="text">
                    {{ message.content }}
                  </div>
                </div>
              </div>
              <div class="msg-left" v-if="message.type === 'image'">
                <div class="avatar">
                  <el-avatar :size="48" :src="message.avatar ? IPAddress + message.avatar : null">
                    <el-icon :size="24"><IEpUserFilled /></el-icon
                  ></el-avatar>
                </div>
                <div class="bubble">
                  <div class="text">
                    <img :src="IPAddress + message.content" alt="" srcset="" />
                  </div>
                </div></div
            ></template>
            <template v-else>
              <div class="msg-right" v-if="message.type === 'image'">
                <div class="bubble">
                  <div class="text">
                    <img :src="IPAddress + message.content" alt="" srcset="" />
                  </div>
                </div>
                <div class="avatar">
                  <el-avatar :size="48" :src="message.avatar ? IPAddress + message.avatar : null">
                    <el-icon :size="24"><IEpUserFilled /></el-icon
                  ></el-avatar>
                </div>
              </div>
              <div class="msg-right" v-if="message.type === 'text'">
                <div class="bubble">
                  <div class="text">{{ message.content }}</div>
                </div>
                <div class="avatar">
                  <el-avatar :size="48" :src="message.avatar ? IPAddress + message.avatar : null">
                    <el-icon :size="24"><IEpUserFilled /></el-icon
                  ></el-avatar>
                </div>
              </div>
            </template>
          </template>
        </div>
        <div class="resize" @mousedown="handleResize($event, edit!, false)"></div>
        <input
          type="file"
          accept="image/*"
          id="upload"
          @change="SendImage"
          style="display: none"
          ref="imgUp"
        />
        <div class="edit" ref="edit">
          <div class="tools">
            <div class="left">
              <div class="tool">
                <i class="iconfont icon-smile"></i>
              </div>
              <div class="tool">
                <i class="iconfont icon-jiandao"></i><i class="iconfont icon-xiala"></i>
              </div>
              <div class="tool">
                <i class="iconfont icon-folder1"></i>
              </div>
              <div class="tool">
                <i class="iconfont icon-photo" @click="imgUp?.click()"></i>
              </div>
              <div class="tool">
                <i class="iconfont icon-hongbao"></i>
              </div>
              <div class="tool">
                <i class="iconfont icon-microphone"></i>
              </div>
            </div>
            <div class="right">
              <div class="tool">
                <i class="iconfont icon-clock"></i>
              </div>
            </div>
          </div>
          <div class="write" contenteditable="true" ref="editor" @keydown.enter="sendMessage"></div>
          <div class="btn">
            <button id="sendMsg">
              <div>发送</div>
              <div>|</div>
              <div><i class="iconfont icon-xiala"></i></div>
            </button>
          </div>
        </div>
      </div>
      <div class="aside" v-if="concatStore.currentRoom.type">
        <div class="member-info">
          <div class="num">群成员 {{ groupInfo.length }}</div>
          <div class="icon" onclick="addMember()">
            <i class="iconfont icon-search"></i>
          </div>
        </div>
        <div class="member-list" id="memberList">
          <div
            class="member"
            oncontextmenu="rightPanel(event)"
            v-for="(member, i) in groupInfo"
            :key="member.user_id"
          >
            <div class="avatar">
              <el-avatar :size="30" :src="member.avatar ? IPAddress + member.avatar : null">
                <el-icon><IEpUserFilled /></el-icon
              ></el-avatar>
            </div>
            <div class="name">
              {{ member.nickname }}
            </div>
            <div class="status" v-if="i === 0">群主</div>
            <div class="status manager" v-else>群员</div>
          </div>
        </div>
      </div>
      <div class="more" id="aside">
        <div class="name">群聊名称</div>
        <input type="text" class="aside-input" value="test" />
        <div class="name">我的本群昵称</div>
        <input type="text" class="aside-input" value="test" />
        <div class="name">群聊备注</div>
        <input type="text" class="aside-input" placeholder="填写备注" />
        <div class="check-box">
          <div>
            <div class="text">设为置顶</div>
            <div class="checkbox">
              <input type="checkbox" class="switch" id="switch-checkbox1" />
              <label for="switch-checkbox1" class="switch-checkbox"></label>
            </div>
          </div>
          <div>
            <div class="text">消息免打扰</div>
            <div class="checkbox">
              <input type="checkbox" class="switch" id="switch-checkbox" />
              <label for="switch-checkbox" class="switch-checkbox"></label>
            </div>
          </div>
        </div>
        <div class="ban">
          <div>
            <div class="text">全体禁言</div>
            <div class="checkbox">
              <input type="checkbox" class="switch" id="switch-checkbox3" />
              <label for="switch-checkbox3" class="switch-checkbox"></label>
            </div>
          </div>
        </div>
        <div class="delete">删除聊天记录</div>
        <div class="delete">解散群聊</div>
        <div class="delete">转让群聊</div>
        <div class="spec">被骚扰了？举报该群</div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.chat-room {
  min-width: 720px;
  padding-top: 24px;

  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: rgb(242, 242, 242);
  // overflow: hidden;
  .header {
    height: 60px;
    border-bottom: $border-line;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 30px;
    div {
      font-size: 28px;
    }
    .tool-box {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .tool {
        padding: 0 10px;
        &:first-child {
          display: flex;
          align-items: center;
          position: relative;
          &:hover {
            color: $qq-blue;
          }
          .iconfont:last-child {
            font-size: 15px;
          }
          .box {
            width: 150px;
            height: 290px;
            padding: 0 10px;
            border-radius: 10px;
            box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
            background-color: white;
            position: absolute;
            display: none;
            top: 40px;
            user-select: none;
            color: black;
            z-index: 1000;
            .group {
              margin-top: 15px;
              display: flex;
              align-items: center;
              justify-content: space-around;
              padding: 0 10px;
              height: 40px;
              border-radius: 10px;
              .iconfont {
                font-size: 20px;
              }
              div {
                font-size: 20px;
              }
              &:hover {
                background-color: rgb(245, 245, 245);
              }
            }
          }
        }
        .iconfont {
          font-size: 30px;
        }
        &:first-child {
          padding-right: 0px;
        }
        &:last-child {
          padding-right: 0;
        }
        & .iconfont:hover {
          color: $qq-blue;
        }
      }
    }
    .modal {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: none;
      align-items: center;
      justify-content: center;
      z-index: 2000;
      background-color: rgba(0, 0, 0, 0.5);
      @keyframes enter-in {
        0% {
          opacity: 0;
          transform: translateY(-50px);
        }
        100% {
          opacity: 1;
          transform: translateY(0);
        }
      }
      @keyframes enter-out {
        0% {
          opacity: 1;
          transform: translateY(0);
        }
        100% {
          opacity: 0;
          transform: translateY(-50px);
        }
      }
      .modal-dialog {
        width: 810px;
        height: 660px;
        overflow: auto;
        background-color: white;
        border-radius: 10px;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
        display: flex;
        &.show {
          animation: enter-in 0.3s ease-in;
        }
        &.hide {
          animation: enter-out 0.3s ease-out;
        }
        .left,
        .right {
          width: 100%;
          height: 100%;
          padding: 30px 0;
        }
        .left {
          user-select: none;
          border-right: 1px solid rgb(245, 245, 245);
          display: flex;
          flex-direction: column;
          .search {
            @include search();
            width: 330px;
            flex: 0 0 auto;
            margin: 0 30px;
          }
          .contact {
            padding: 0 30px;
            @include scroll-bar();
            overflow: auto;
            height: 100%;
            .row {
              font-size: 24px;
              margin-top: 40px;
              .iconfont {
                font-size: 24px;
                transform: rotate(-90deg);
                display: inline-block;
                margin-right: 10px;
              }
            }
            .drag-row {
              #icon {
                transition: 0.3s;
              }
              .user-list {
                display: none;
                .user > label {
                  width: 100%;
                  height: 70px;
                  border-radius: 10px;
                  display: flex;
                  align-items: center;
                  padding: 10px;
                  .check-only {
                    display: none;
                    &:checked {
                      + .label {
                        background-color: rgb(0, 153, 255);
                        color: white;
                      }
                    }
                  }
                  .label {
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                    border: 1px solid rgb(212, 212, 212);
                    background-color: white;
                    transition: 0.3s;
                    font-size: 20px;
                    text-align: center;
                    color: transparent;
                    margin-right: 20px;
                  }
                  .avatar {
                    width: 50px;
                    height: 50px;
                    border-radius: 25px;
                    margin-right: 20px;
                    overflow: hidden;
                    img {
                      width: 100%;
                      height: 100%;
                    }
                  }
                  .name {
                    font-size: 24px;
                  }
                  &:hover {
                    background-color: rgb(245, 245, 245);
                  }
                  &:first-child {
                    margin-top: 10px;
                  }
                }
              }
            }
          }
        }
        .right {
          padding: 30px;
          position: relative;
          .modal-footer {
            position: absolute;
            bottom: 30px;
            right: 30px;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            font-size: 16px;
            padding: 10px 20px;
            /* 模态框的底部按钮 */
            .modal-button {
              width: 120px;
              min-width: 60px;
              height: 40px;
              margin-left: 10px;
              border-radius: 4px;
              border: none;
              color: white;
              cursor: pointer;
            }

            /* 模态框的取消按钮 */
            .modal-button-cancel {
              background-color: white;
              color: black;
              border: 1px solid rgb(204, 204, 204);
              &:hover {
                background-color: rgb(245, 245, 245);
              }
            }

            /* 模态框的确定按钮 */
            .modal-button-confirm {
              background-color: #409eff;
              border: 1px solid #409eff;
              &:hover {
                background-color: rgb(0, 141, 235);
              }
            }
          }
        }
      }
    }
  }
  .chat-area {
    flex: 1;
    display: flex;
    min-height: 0;
    position: relative;
    overflow: hidden;
    .chat {
      flex: 1;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      .msg {
        flex: 1;
        display: flex;
        flex-direction: column;
        padding: 10px;
        overflow: auto;
        @include scroll-bar();
        .msg-left {
          @include msg();
        }
        .msg-right {
          @include msg(flex-end, white, rgb(0, 153, 255));
        }
      }
      .resize {
        height: 4px;
        cursor: ns-resize;
        flex-shrink: 0;
      }
      .edit {
        flex-shrink: 0;
        min-height: 180px;
        max-height: 360px;
        height: 280px;
        border-top: $border-line;
        display: flex;
        flex-direction: column;
        .tools {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 30px;
          .left {
            display: flex;
            .tool {
              margin-right: 20px;
              .iconfont {
                font-size: 30px;
              }
              &:nth-child(2) {
                display: flex;
                align-items: center;
                .iconfont:last-child {
                  font-size: 20px;
                }
              }
              &:hover {
                color: $qq-blue;
              }
            }
          }

          .right {
            .iconfont {
              font-size: 30px;
            }
            &:hover {
              color: $qq-blue;
            }
          }
        }
        .write {
          @include scroll-bar();
          height: 100%;
          padding: 10px 30px;
          font-size: 16px;
          overflow: auto;
          img {
            width: 400px;
          }
        }
        .btn {
          height: 80px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          padding: 20px 30px;
          button {
            display: flex;
            align-items: center;
            justify-content: space-evenly;
            width: 140px;
            height: 40px;
            font-size: 20px;
            color: white;
            background-color: rgb(0, 153, 255);
            border: none;
            border-radius: 5px;
            .iconfont {
              font-size: 20px;
            }
            &:hover {
              background-color: rgb(0, 147, 245);
            }
            &:active {
              background-color: rgb(0, 134, 224);
            }
          }
        }
      }
    }
    .aside {
      flex-shrink: 0;
      width: 270px;
      padding-top: 30px;
      display: flex;
      flex-direction: column;
      user-select: none;
      border-left: $border-line;
      .member-info {
        margin: 0 15px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 18px;
        flex-shrink: 0;
        .iconfont {
          font-size: 20px;
          font-weight: bold;
        }
      }
      .member-list {
        overflow: auto;
        @include scroll-bar();
        .member {
          margin: 0 15px;
          height: 35px;
          margin-top: 15px;
          display: flex;
          align-items: center;
          border-radius: 5px;
          padding: 0 10px;
          .avatar {
            flex-shrink: 0;
            width: 30px;
            height: 30px;
            border-radius: 15px;
            overflow: hidden;

            img {
              width: 100%;
              height: 100%;
            }
          }
          .name {
            @include flex-ellipsis();
            margin: 0 12px;
            font-size: 18px;
            color: rgb(153, 153, 153);
          }
          .status {
            flex-shrink: 0;
            padding: 5px;
            border-radius: 5px;
            background-color: rgb(237, 214, 199);
            color: rgb(255, 141, 64);
            font-size: 14px;
            &.manager {
              background-color: rgb(194, 225, 245);
              color: rgb(0, 153, 255);
            }
          }
          &:hover {
            background-color: rgb(233, 233, 233);
          }
        }
      }
    }
    .more {
      @include scroll-bar();
      overflow: auto;
      position: absolute;
      width: 480px;
      height: 100%;
      right: 0;
      background-color: rgb(242, 242, 242);
      z-index: 999;
      transform: translateX(100%);
      user-select: none;
      transition: 0.3s;
      padding: 30px;
      box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);
      &.show {
        transform: none;
      }
      .name {
        font-size: 24px;
        color: rgb(121, 121, 121);
        padding-left: 20px;
        margin: 20px 0;
      }
      .aside-input {
        border: none;
        width: 100%;
        border-radius: 10px;
        height: 50px;
        font-size: 24px;
        padding: 20px;
        margin-bottom: 20px;
        &:focus {
          border: 1px solid rgb(0, 153, 255);
        }
        &::placeholder {
          color: rgb(178, 178, 178);
        }
      }
      .check-box {
        width: 100%;
        height: 110px;
        border-radius: 10px;
        background-color: white;
        display: flex;
        flex-direction: column;
        padding: 10px 25px;
        > div {
          display: flex;
          height: 100%;
          justify-content: space-between;
          align-items: center;
          .text {
            font-size: 24px;
          }
          &:first-child {
            border-bottom: 1px solid rgb(245, 245, 245);
          }
          .checkbox {
            width: 48px;
            height: 24px;
            .switch {
              display: none;
              &:checked {
                + .switch-checkbox {
                  background-color: rgb(0, 141, 235);
                  &::before {
                    transform: translateX(24px);
                  }
                }
              }
            }
            .switch-checkbox {
              display: block;
              width: 100%;
              height: 100%;
              border-radius: 12px;
              background-color: rgb(204, 204, 204);
              padding: 2px;
              transition: 0.3s;
              &:before {
                content: '';
                display: block;
                width: 20px;
                height: 20px;
                background-color: white;
                border-radius: 50%;
                transition: 0.3s;
              }
            }
          }
        }
      }
      .ban {
        width: 100%;
        border-radius: 10px;
        height: 50px;
        padding: 25px;
        background-color: white;
        align-items: center;
        margin-top: 60px;
        @include check();
      }
      .delete {
        width: 100%;
        height: 55px;
        background-color: white;
        border-radius: 10px;
        text-align: center;
        line-height: 55px;
        color: rgb(247, 76, 48);
        margin-top: 30px;
        font-size: 24px;
      }
    }
    .spec {
      margin-top: 40px;
      color: rgb(45, 119, 229);
      text-align: center;
      font-size: 16px;
    }
  }
}
</style>
