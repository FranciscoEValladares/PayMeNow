
import { useRouter } from "next/router";
import { useAccount, useSendTransaction } from "wagmi";
import { parseEther } from "viem";
import { useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function PayPage() {
  const router = useRouter();
  const { slug } = router.query;
  const amount = router.query.amount as string;
  const recipient = slug as `0x${string}`;
  const { isConnected } = useAccount();
  const { data, sendTransaction, isPending, isSuccess, error: txError } = useSendTransaction();
  const [txHash, setTxHash] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handlePayment = () => {
    setError(null);
    sendTransaction({
      to: recipient,
      value: parseEther(amount || "0"),
    });
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-4">
      <div className="max-w-md w-full bg-gray-800 rounded-2xl shadow-xl p-6 space-y-4">
        <h1 className="text-xl font-semibold">Send ETH</h1>
        <p>To: {recipient}</p>
        <p>Amount: {amount} ETH</p>

        {!isConnected ? (
          <ConnectButton />
        ) : (
          <button
            onClick={handlePayment}
            className="w-full py-2 mt-2 rounded bg-blue-600 hover:bg-blue-700 transition"
          >
            Pay Now
          </button>
        )}

        {isSuccess && data && (
          <p className="text-green-500">Tx Sent: {data}</p>
        )}
        {(error || txError) && (
          <p className="text-red-500">Error: {error || txError?.message}</p>
        )}
      </div>
    </main>
  );
}
