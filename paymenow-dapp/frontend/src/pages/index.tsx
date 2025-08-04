import React, { useState } from "react";
import Image from "next/image";

export default function Home() {
  const [wallet, setWallet] = useState("");
  const [amount, setAmount] = useState("");
  const [link, setLink] = useState("");
  const [copied, setCopied] = useState(false);

  const generateLink = () => {
    if (!wallet || !amount) return;
    const url = `${window.location.origin}/pay/${wallet}?amount=${amount}`;
    setLink(url);
    setCopied(false);
  };

  const copyToClipboard = async () => {
    if (link) {
      await navigator.clipboard.writeText(link);
      setCopied(true);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="flex justify-center mb-8">
          <Image
            src="/PayMeNowLogo.png"
            alt="PayMeNow Logo"
            width={400}
            height={400}
            priority
          />
        </div>
        <h1 className="text-4xl font-extrabold mb-8 text-center">Payment Link Generator</h1>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2 text-lg font-semibold">Wallet Address</label>
          <input
            type="text"
            placeholder="0x..."
            value={wallet}
            onChange={(e) => setWallet(e.target.value)}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 mb-2 text-lg font-semibold">Amount (ETH)</label>
          <input
            type="number"
            min="0"
            step="any"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
          />
        </div>
        <button
          onClick={generateLink}
          className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition mb-4 text-lg font-bold"
        >
          Generate Link
        </button>
        {link && (
          <div className="flex flex-col items-center">
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline break-all mb-2 text-lg"
            >
              {link}
            </a>
            <button
              onClick={copyToClipboard}
              className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300 transition text-lg"
            >
              {copied ? "Copied!" : "Copy to Clipboard"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
