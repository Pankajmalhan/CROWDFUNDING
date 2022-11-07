import { Web3Storage } from "web3.storage/dist/bundle.esm.min.js";

const API_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGZjZDJEMjcyMGE3YjMzYzRiQkExZjEwNEMxYmIwZTVhNjA1NzVmRGMiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NjczMTMxNDg2OTEsIm5hbWUiOiJjcm93ZGZ1bmRpbmcifQ.wW-i0_7uqiM1Jyh7hTWfpPGrH7I18f6LS47nAZzj9Ts"

export async function handleImageUpload() {
    try{
    const fileInput = document.querySelector('input[type="file"]');
    if(fileInput.files.length){
    const client = new Web3Storage({ token: API_TOKEN });
    const rootCid = await client.put(fileInput.files);

    const info = await client.status(rootCid);
    console.log(info);
    // Fetch and verify files from web3.storage
    const res = await client.get(rootCid);
    const files = await res.files();
    for (const file of files) {
      console.log(`${file.cid} ${file.name} ${file.size}`);
      return `${file.cid}`
    }
  }
  else return
  }
  catch (error) {
    console.log(error , "Error")
  }
  }