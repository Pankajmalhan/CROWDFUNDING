import Web3 from "web3";

export const getNonce = async (userAddress) => {
  console.log(userAddress, "userAdd");
  try {
    let res =await fetch(`http://localhost:4080/users/getNonce`, {
      body: JSON.stringify({ publicAddress: userAddress }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    })
    const userObj = await res.json();
    if (!userObj?.data) {
        registerWalletAddress(userAddress);
      } else {
        createSignatureRequest(userObj?.data.publicAddress, userObj?.data.nonce);
      }
    //   .then((response) => response.json())
    //   // If yes, retrieve it. If no, create it.
    //   .then((user) => {
    //     if (!user.data) {
    //       registerWalletAddress(userAddress);
    //     } else {
    //       createSignatureRequest(user?.data.publicAddress, user?.data.nonce);
    //     }
    //   });
  } catch (error) {
    console.log(error);
  }
};

export const createSignatureRequest = async (publicAddress, nonce) => {
  try {
    let web3 = new Web3(window.ethereum);
    const signature = await web3.eth.personal.sign(
      `I am signing my one-time nonce: ${nonce}`,
      publicAddress,
      "" // MetaMask will ignore the password argument here
    );
    await validateUser(publicAddress, signature);
  } catch (err) {
    console.log(err);
    throw new Error("You need to sign the message to be able to log in.");
  }
};

export const validateUser = async(publicAddress, signature) => {
  try{
    let res = await fetch(`http://localhost:4080/validateUser`, {
    body: JSON.stringify({ publicAddress, signature }),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  })
  const data= await res?.json();
  console.log(data)
  return data
    // .then((response) => response.json())
    // .then((data) => {
    //   console.log(data);
    // });
}
catch(error){
    console.log(error, "Error from HandleAuthenticate")
}
};

export const registerWalletAddress = async (publicAddress) => {
  try{
    let res = await fetch(`http://localhost:4080/register`, {
    body: JSON.stringify({ publicAddress }),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  })
  const userData = await res?.json();
  await createSignatureRequest(userData?.data?.publicAddress, userData?.data?.nonce);
    // .then((response) => response.json())
    // .then((user) => {
    //   createSignatureRequest(user?.data?.publicAddress, user?.data?.nonce);
    // })
    // .catch((err) => console.log(err));
}
catch(error){
    console.log(error, "Error from HandleSignup")
}
};
