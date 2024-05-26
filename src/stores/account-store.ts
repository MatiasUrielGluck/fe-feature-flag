import { defineStore } from 'pinia';
import AccountType from 'src/types/AccountType';

const initialState: AccountType = {
  email: '',
  fullName: '',
};

export const useAccountStore = defineStore('account', {
  state: (): AccountType => initialState,

  getters: {},

  actions: {
    setAccount(payload: AccountType) {
      this.email = payload.email;
      this.fullName = payload.fullName;
    },

    resetAccount() {
      this.$state = initialState;
    },
  },
});
