<template>
  <q-page v-if="!getAccounts" class="flex flex-center">
    <q-btn @click="connectMetaMask" color="primary" class="q-ma-md">Connect with MetaMask</q-btn>
    <q-btn @click="WalletConnect" color="secondary" class="q-ma-md">Connect with WalletConnect</q-btn>
  </q-page>
  <q-page v-else class="flex flex-center">
    <div>{{ getAccounts }}</div>
    <q-btn color="white" text-color="black" @click="switchAccount" label="Switch Account" />
  </q-page>
</template>
<script setup>
import { computed, onMounted } from "vue";
import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { useStore } from "vuex";
let web3 = {};

let walletConnectProvider = null;
const $store = useStore();

async function connectMetaMask() {
  const metaMaskProvider = await detectEthereumProvider({
    mustBeMetaMask: true,
  });
  console.log(metaMaskProvider);

  const accounts = await metaMaskProvider.request({
    method: "eth_requestAccounts",
  });
  web3 = new Web3(metaMaskProvider);
  $store.commit("setUserAccount", accounts[0]);
  metaMaskProvider.on("disconnect", function () {
    console.log("disconnected");
  });
}
const getAccounts = computed(() => {
  return $store.state.account;
});
// Subscribe to session disconnection

/**
 * Wallet connect provider
 */
async function WalletConnect() {
  walletConnectProvider = new WalletConnectProvider({
    infuraId: "e8f8c34dc1dd47b2a00d6569d52b8ec7", // Required
    qrcodeModalOptions: {
      mobileLinks: ["metamask", "trust"],
    },
  });
  walletConnectProvider.on("connect", () => {
    console.log("connect");
  });

  walletConnectProvider.on("disconnect", (code, reason) => {
    console.log(code, reason);
    console.log(reason);
  });
  await walletConnectProvider.enable();
  web3 = new Web3(walletConnectProvider);

  //  Get Accounts
  const accounts = await web3.eth.getAccounts();
  if (accounts.length !== 0) {
    const signedMessage = await web3.eth.sign(
      "Welcome to Afroapes: The Origin",
      accounts[0]
    );
    $store.commit("setUserAccount", accounts[0]);
    // console.log(accounts)
    console.log(web3.eth);
    setUserAccount.value = accounts;
    //  Get Chain Id
    const chainId = await web3.eth.chainId();
    console.log(chainId);

    //  Get Network Id
    const networkId = await web3.eth.net.getId();
    console.log(networkId);
  }


  // walletConnectProvider.qrcodeModal.open();
}

/**
 * Restore existing Wallet Connection (Metamask)
 */
const checkIfWalletIsConnected = async () => {

  console.log("looking for connections");
  await isMetamaskConnected()
};
/**
 * Look for existing metamask connection
 */
const isMetamaskConnected = async () => {
  const metaMaskProvider = await detectEthereumProvider({
    mustBeMetaMask: true,
  });

  metaMaskProvider.on("disconnect", function () {
    alert("disconnected");
  });
  const accounts = await metaMaskProvider.request({ method: "eth_accounts" });
  console.log(accounts);
  if (accounts.length !== 0) {
    web3 = new Web3(metaMaskProvider);
    $store.commit("setUserAccount", accounts[0]);
    return;
  }

  return false;
};


const switchAccount = async () => {
  if (await isMetamaskConnected()) {
    const metaMaskProvider = await detectEthereumProvider({
      mustBeMetaMask: true,
    });
    await metaMaskProvider.request({
      method: "wallet_requestPermissions",
      params: [
        {
          eth_accounts: {},
        },
      ],
    });
    window.location.reload();
  }
};

onMounted(() => {
  checkIfWalletIsConnected();
});
</script>

