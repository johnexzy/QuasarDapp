<script setup>
// import { rejects } from "assert";
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
    alert("disconnected")
  });
}

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
    alert("connect");
  });

  walletConnectProvider.on("disconnect", (code, reason) => {
    console.log(code, reason);
    alert(reason);
  });
  await walletConnectProvider.enable();
  web3 = new Web3(walletConnectProvider);

  //  Get Accounts
  const accounts = await web3.eth.getAccounts();
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

  // walletConnectProvider.qrcodeModal.open();
}
const checkIfWalletIsConnected = async () => {
  /*
   * First: check if metamask is connected
   * Second: check if wallet connect is connected and active
   */
  alert("john");
  console.log("looking for connections");
  if (await isMetamaskConnected()) {
    // metaMaskProvider.on("disconnect", alert("disconnected"));

    const metaMaskProvider = await detectEthereumProvider({
      mustBeMetaMask: true,
    });
    const accounts = await metaMaskProvider.request({ method: "eth_accounts" });
    console.log(accounts)
    if (accounts.length !== 0) {
      web3 = new Web3(metaMaskProvider);
      $store.commit("setUserAccount", accounts[0]);
      return;
    }

  } else if (isWCconected()) {
    console.log("Wallet Connect is connected");
    // checkChainId();
  }

};

const isMetamaskConnected = async () => {
  const metaMaskProvider = await detectEthereumProvider({
    mustBeMetaMask: true,
  });
  if (metaMaskProvider && metaMaskProvider.isConnected()) {
    // console.log("Make sure you have metamask!");
    return true;
  }
};
const isWCconected = () => {
  walletConnectProvider = new WalletConnectProvider({
    infuraId: "e8f8c34dc1dd47b2a00d6569d52b8ec7", // Required
    qrcodeModalOptions: {
      mobileLinks: ["metamask", "trust"],
    },
  });
  if (walletConnectProvider && walletConnectProvider.connected) {
    return true;
  }
};
const Disconnect = () => {
  if (metaMaskProvider.isConnected()) {
  }
};
const getAccounts = computed(() => {
  return $store.state.account;
});
onMounted(() => {
  checkIfWalletIsConnected();
});
</script>
<template>
  <q-page class="flex flex-center">
    <q-btn @click="connectMetaMask" color="primary" class="q-ma-md">Connect with MetaMask</q-btn>
    <q-btn @click="WalletConnect" color="secondary" class="q-ma-md">Connect with WalletConnect</q-btn>
  </q-page>
  <!-- <q-page class="flex flex-center">
    <div>{{ getAccounts }}</div>
    <q-btn color="white" text-color="black" @click="Disconnect" label="disconnect" />
  </q-page>-->
</template>

