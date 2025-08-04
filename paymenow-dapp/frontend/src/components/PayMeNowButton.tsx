import React, { useState } from "react";
import { usePayMeNow } from "../hooks/usePayMeNow";

interface PayMeNowButtonProps {
  contractAddress: string;
  recipient: string;
  message: string;
  amount: string;
}

export const PayMeNowButton: React.FC<PayMeNowButtonProps> = ({
  contractAddress,
  recipient,
  message,
  amount,
}) => {
  const { pay } = usePayMeNow(contractAddress);
  const [loading, setLoading] = useState(false);
  const [txHash, setTxHash] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handlePayment = async () => {
    setLoading(true);
    setError(null);
    setTxHash(null);
    try {
      const tx = await pay(recipient, message, amount);
      setTxHash(tx.hash);
    } catch (err: any) {
      setError(err.message || "Transaction failed");
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center space-y-2">
      <button
        onClick={handlePayment}
        disabled={loading}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition font-bold"
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>
      {txHash && (
        <div className="text-green-600 text-sm">
          Payment sent! Tx:{" "}
          <a
            href={`https://sepolia.etherscan.io/tx/${txHash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            {txHash}
          </a>
        </div>
      )}
      {error && <div className="text-red-600 text-sm">{error}</div>}
    </div>
  );
};