export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">PayMeNow</h1>
        <p>Welcome to your Ethereum payment link generator!</p>
        <p>Visit /pay/[address]?amount=[eth] to test a payment</p>
      </div>
    </main>
  );
}
