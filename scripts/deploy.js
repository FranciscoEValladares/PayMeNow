const hre = require("hardhat");

async function main() {
  const PayMeNow = await hre.ethers.getContractFactory("PayMeNow");
  const payMeNow = await PayMeNow.deploy();
  await payMeNow.waitForDeployment(); // <-- Correct for Ethers v6
  console.log("PayMeNow deployed to:", await payMeNow.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});