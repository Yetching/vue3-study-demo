import { reactive, readonly } from "@vue/reactivity";
//持久化转换函数
import { createPersistStorage } from "./persistence";

export interface IState {
  code: string,
  token: string,
  user: any
}

//创建state

export const State: IState = {
  code: '',
  token: '',
  user: {}
}

export function createState() {
  return reactive(State)
}


//创建action

function updateCode(state: IState) {
  return (code: string) => {
    state.code = code
  }
}

function updateToken(state: IState) {
  return (token: string) => {
    state.token = token
  }
}

function updateUser(state: IState) {
  return (user: any) => {
    state.user = user
  }
}

//为什么要写成返回函数？

export function createAction(state: IState) {
  return {
    updateToken: updateToken(state),
    updateCode: updateCode(state),
    updateUser: updateUser(state)
  }
}

//创建store

const state = createState()
const action = createAction(state)

export const userStore  = () => {
  const store = {
    // state: readonly(state),
    state: createPersistStorage<IState>(state),
    action: readonly(action)
  }

  return store
}