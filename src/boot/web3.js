import { boot } from "quasar/wrappers";
import WalletConnectProvider from "@walletconnect/web3-provider";
import detectEthereumProvider from "@metamask/detect-provider";
//  Create WalletConnect Provider
const walletConnectProvider = new WalletConnectProvider({
  infuraId: "27e484dcd9e3efcfd25a83a78777cdf1", // Required
});

//  Enable session (triggers QR Code modal)
// await walletConnectProvider.enable();

const metamaskProvider = await detectEthereumProvider();
console.log(metamaskProvider);
// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ app }) => {
  app.provide("walletConnectProvider", walletConnectProvider);
  app.provide("metaMaskProvider", metamaskProvider);

});
