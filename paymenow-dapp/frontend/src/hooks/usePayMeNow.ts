import { useWalletClient } from "wagmi";
import { ethers } from "ethers";
import PayMeNowABI from "../../artifacts/contracts/PayMeNow.sol/PayMeNow.json";

export function usePayMeNow(contractAddress: string) {
  const { data: walletClient } = useWalletClient();

  const pay = async (recipient: string, message: string, amountEth: string) => {
    if (!walletClient) throw new Error("Wallet not connected");
    if (!amountEth || isNaN(Number(amountEth)) || Number(amountEth) <= 0) {
      throw new Error("Invalid amount");
    }
    if (!ethers.isAddress(recipient)) {
      throw new Error("Invalid recipient address");
    }

    // Use walletClient as the provider
    const provider = new ethers.BrowserProvider(walletClient);
    const signer = await provider.getSigner();

    const contract = new ethers.Contract(
      contractAddress,
      PayMeNowABI.abi,
      signer
    );

    const tx = await contract.pay(recipient, message, {
      value: ethers.parseEther(amountEth),
    });

    return tx;
  };

  return { pay };
}
