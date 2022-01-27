import { store } from "quasar/wrappers";
import { createStore } from "vuex";
// import web3 from "web3";
// import WalletConnectProvider from "@walletconnect/web3-provider";

// //  Create WalletConnect Provider
// const walletConnectProvider = new WalletConnectProvider({
//   infuraId: "27e484dcd9e3efcfd25a83a78777cdf1", // Required
// });

// //  Enable session (triggers QR Code modal)
// await provider.enable();
// import example from './module-example'

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default store(function ({ }) {

  const Store = createStore({

    state() {
      return {
        user: {},
      };
    },
    actions: {
      connectWalletConnect({commit}) {

      },

      connectMetamask({ commit }) {

      }
    },
    mutations: {
      setUser(state, payload) {
        state.user = payload;
      },
    },
    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: process.env.DEBUGGING,
  });

  return Store;
});
