import { setItem } from '../utlis/localStorage'

export const useUserStore = defineStore('userStore', {
    state: () => {
      return {
        user: {
          id: 0,
          account: "",
          avatar: "",
          email: "",
          nick_name: "",
          status_code: 0,
          role_id: 0,
          role: {
              id: 0,
              role_name: ""
          },
        }
      }
    },
    actions: {
      setUser({id, account, avatar, email, nick_name, status_code, role_id, role}) {
        this.user = {
          id: id,
          account: account,
          avatar: avatar,
          email: email,
          nick_name: nick_name,
          status_code: status_code,
          role_id: role_id,
          role: {
            id: role.id,
            role_name: role.role_name
          }
        }
        setItem(this.user)
      },
    },
  })