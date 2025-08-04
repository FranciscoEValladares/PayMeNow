import { useRouter } from "next/router";
import { useAccount, useSendTransaction } from "wagmi";
import { parseEther } from "viem";
import { useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import React from "react";

export default function PayPage() {
  const router = useRouter();
  const { slug } = router.query;
  const amount = router.query.amount as string;
  const recipient = slug as `0x${string}`;
  const { address, isConnected } = useAccount();
  const { data, sendTransaction, isPending, isSuccess, error: txError } = useSendTransaction();
  const [error, setError] = useState<string | null>(null);

  const handlePayment = () => {
    setError(null);
    sendTransaction({
      to: recipient,
      value: parseEther(amount || "0"),
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white rounded-xl shadow-md p-8 w-full max-w-md flex flex-col items-center space-y-4">
        <h1 className="text-2xl font-bold text-center">Pay</h1>
        <div className="w-full flex flex-col items-center space-y-2">
          <p className="text-gray-700 break-all text-center">To: {recipient}</p>
          <p className="text-gray-700 text-center">Amount: {amount} ETH</p>
        </div>
        <div className="w-full flex justify-center">
          {!isConnected ? (
            <ConnectButton />
          ) : (
            <button
              onClick={handlePayment}
              className="w-full py-2 rounded bg-blue-600 hover:bg-blue-700 text-white transition"
              disabled={isPending}
            >
              {isPending ? "Processing..." : "Pay Now"}
            </button>
          )}
        </div>
        {isSuccess && data && (
          <div className="w-full bg-green-50 border border-green-200 rounded-lg p-4 flex flex-col items-center space-y-2 mt-2">
            <span className="text-2xl">✅</span>
            <p className="text-green-700 font-semibold text-center">Payment Successful!</p>
            <div className="text-sm text-gray-700">
              <p><span className="font-bold">From:</span> {address}</p>
              <p><span className="font-bold">To:</span> {recipient}</p>
              <p><span className="font-bold">Amount:</span> {amount} ETH</p>
            </div>
            <p className="text-green-500 text-center break-all">Tx Sent: {data}</p>
          </div>
        )}
        {(error || txError) && (
          <p className="text-red-500 text-center break-all">Error: {error || txError?.message}</p>
        )}
      </div>
    </div>
  );
}
