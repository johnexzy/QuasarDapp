<script setup>
import { inject } from "vue";

const metaMaskProvider = inject("metaMaskProvider");
const walletConnectProvider = inject("walletConnectProvider");
console.log(walletConnectProvider);

async function MetaMask() {
  await metaMaskProvider.request({
    method: "eth_requestAccounts",
  });
}

async function WalletConnect() {
  await walletConnectProvider.enable()
  walletConnectProvider.qrcodeModal.open();
}

</script>

<template>
  <q-page class="flex flex-center">
    <q-btn @click="MetaMask" color="primary" class="q-ma-md">Connect with MetaMask</q-btn>
    <q-btn @click="WalletConnect" color="secondary" class="q-ma-md">Connect with WalletConnect </q-btn>
  </q-page>
</template>
