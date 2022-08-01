import logo from "../assets/images/logo.png";
import banner from "../assets/images/banner.png";
import bannerbtnicon from "../assets/images/icon.png";
import first from "../assets/images/first.png";
import fren1 from "../assets/images/fren1.png";
import fren2 from "../assets/images/fren2.png";
import fren3 from "../assets/images/fren3.png";
import fren4 from "../assets/images/fren2.png";
import fren5 from "../assets/images/fren5.png";
import heart from "../assets/images/heart.png";
import foot1 from "../assets/images/social-icons/icon-dd.png";
import foot2 from "../assets/images/social-icons/icon-ig.png";
import foot3 from "../assets/images/social-icons/icon-tlg.png";
import foot4 from "../assets/images/social-icons/icon-twt.png";
import foot5 from "../assets/images/social-icons/icon-ytb.png";
import timeicon from "../assets/images/timer.png";
import live1 from "../assets/images/live1.png";
import live2 from "../assets/images/live2.png";
import live3 from "../assets/images/live3.png";
import live4 from "../assets/images/live4.png";
import pro1 from "../assets/images/profile-imgs/pro1.png";
import pro2 from "../assets/images/profile-imgs/pro2.png";
import pro3 from "../assets/images/profile-imgs/pro3.png";
import pro4 from "../assets/images/profile-imgs/pro4.png";
import placebid from "../assets/images/place-bid.png";
import Ham from "../assets/images/ham.png";
import { Button, Modal } from "react-bootstrap";
import Countdown from "react-countdown";
import { useEffect, useState, useRef } from "react";
import { connectWallet, getCurrentWalletConnected } from "../utils/interact.js";
import Web3 from "web3";
import { ToastContainer, toast } from "react-toastify";
const { ethers } = require("ethers");

const Home = (props) => {
  //State variables
  const [walletAddress, setWallet] = useState("");

  const [auctionDetails, setAuctionDetails] = useState([]);
  const [bid, setBid] = useState("");

  const [auctionDetailsS, setAuctionDetailsS] = useState([]);
  const [bidS, setBidS] = useState("");

  const [showPopup, setshowPopup] = useState(false);
  const [minBid, setMinBid] = useState("");
  const [currBidder, setCurrBidder] = useState("");
  const [currBid, setCurrBid] = useState("");

  const [showPopupS, setshowPopupS] = useState(false);
  const [minBidS, setMinBidS] = useState("");
  const [currBidderS, setCurrBidderS] = useState("");
  const [currBidS, setCurrBidS] = useState("");
  const [indexS, setIndexS] = useState("");

  const [frensCount, setFrensCount] = useState("");

  window.scrollTo(0, 0);

  // const contractAuctionAddress = "0xB7123e97618a136ba140a5ec1B26737DbBAc6dc9";
  // const tokenContract = "0x2EDD7A51D82220Bb878980ff892380720442D892";
  const tokenContract = "0xFA30f8e110465056af8D2C3cF30b757ae061e9a2";
  const contractAuctionAddress = "0xD7300e11c28af2100B8F2C52907321DDa5C8e41C";

  function timeout(delay) {
    return new Promise((res) => setTimeout(res, delay));
  }

  useEffect(async () => {
    const { address, status } = await getCurrentWalletConnected();
    setWallet(address);

    getData();
    getDataS();
    getFrensCount();

    addWalletListener();
  }, []);

  const getData = async () => {
    const web3 = new Web3(window.ethereum);
    const contractAuctionABI = require("../abi/lilfrens_auction_abi.json");

    try {
      window.contract = await new web3.eth.Contract(
        contractAuctionABI,
        contractAuctionAddress
      );
      const all_bundle = await window.contract.methods
        .getBundleAllList()
        .call();
      var auctionData = [];

      for (var i = 0; i < all_bundle.length; i++) {
        const contractNftABI = require("../abi/lilfrens_nft_abi.json");
        const contractNftAddress = all_bundle[i].addressNFTCollection;
        window.contract1 = await new web3.eth.Contract(
          contractNftABI,
          contractNftAddress
        );

        var images_data = [];

        for (var j = 0; j < all_bundle[i].nftId.length; j++) {
          let nUrl = await window.contract1.methods
            .tokenURI(all_bundle[i].nftId[j])
            .call();
          if (nUrl.includes("ipfs://")) {
            nUrl = nUrl.replace("ipfs://", "https://ipfs.io/ipfs/");
          }
          const response = await fetch(nUrl);
          if (!response.ok) {
            throw new Error("Something went wrong");
          }
          const nft_data = await response.json();
          if (nft_data.image.includes("ipfs://")) {
            nft_data.image = nft_data.image.replace(
              "ipfs://",
              "https://ipfs.io/ipfs/"
            );
          }
          const opensea =
            "https://opensea.io/assets/ethereum/" +
            contractNftAddress +
            "/" +
            all_bundle[i].nftId[j];
          // console.log(opensea);
          // images_data.push(nft_data);
          const auc_data = {
            addressNFTCollection: all_bundle[i].addressNFTCollection,
            addressPaymentToken: all_bundle[i].addressPaymentToken,
            bidCount: all_bundle[i].bidCount,
            creator: all_bundle[i].creator,
            currentBidOwner: all_bundle[i].currentBidOwner,
            currentBidPrice: all_bundle[i].currentBidPrice,
            endAuction: all_bundle[i].endAuction,
            index: all_bundle[i].index,
            nftId: all_bundle[i].nftId,
            attributes: "",
            description: nft_data.description,
            edition: 0,
            image: nft_data.image,
            name: nft_data.name,
            opensea: opensea,
          };
          auctionData.push(auc_data);
        }
      }

      setAuctionDetails(auctionData);
    } catch (err) {
      console.log(err);
    }
  };

  const getDataS = async () => {
    const web3 = new Web3(window.ethereum);
    const contractAuctionABI = require("../abi/lilfrens_auction_abi.json");

    try {
      window.contract2 = await new web3.eth.Contract(
        contractAuctionABI,
        contractAuctionAddress
      );
      const all_single = await window.contract2.methods.getAllList().call();

      var auctionData = [];

      for (var i = 0; i < all_single.length; i++) {
        const contractNftABI = require("../abi/lilfrens_nft_abi.json");
        const contractNftAddress = all_single[i].addressNFTCollection;

        window.contract3 = await new web3.eth.Contract(
          contractNftABI,
          contractNftAddress
        );
        // const nUrl = await window.contract3.methods.tokenURI(all_single[i].nftId).call();
        if (
          contractNftAddress == "0xF4ee95274741437636e748DdAc70818B4ED7d043"
        ) {
          let nUrl = await window.contract3.methods.baseURI().call();
          nUrl = nUrl + "/" + all_single[i].nftId;
          const response = await fetch(nUrl);
          if (!response.ok) {
            throw new Error("Something went wrong");
          }
          const nft_data = await response.json();
          if (nft_data.image.includes("ipfs://")) {
            nft_data.image = nft_data.image.replace(
              "ipfs://",
              "https://ipfs.io/ipfs/"
            );
          }
          const opensea =
            "https://opensea.io/assets/ethereum/" +
            contractNftAddress +
            "/" +
            all_single[i].nftId;
          const auc_data = {
            addressNFTCollection: all_single[i].addressNFTCollection,
            addressPaymentToken: all_single[i].addressPaymentToken,
            bidCount: all_single[i].bidCount,
            creator: all_single[i].creator,
            currentBidOwner: all_single[i].currentBidOwner,
            currentBidPrice: all_single[i].currentBidPrice,
            endAuction: all_single[i].endAuction,
            index: all_single[i].index,
            nftId: all_single[i].nftId,
            attributes: nft_data.attributes,
            description: nft_data.description,
            edition: "",
            image: nft_data.image,
            name: nft_data.name,
            opensea: opensea,
          };
          auctionData.push(auc_data);
        } else {
          try {
            let nUrl = await window.contract3.methods
              .tokenURI(all_single[i].nftId)
              .call();
            if (nUrl.includes("ipfs://")) {
              nUrl = nUrl.replace("ipfs://", "https://ipfs.io/ipfs/");
            }
            const response = await fetch(nUrl);
            if (!response.ok) {
              throw new Error("Something went wrong");
            }
            const nft_data = await response.json();
            if (nft_data.image.includes("ipfs://")) {
              nft_data.image = nft_data.image.replace(
                "ipfs://",
                "https://ipfs.io/ipfs/"
              );
            }
            const opensea =
              "https://opensea.io/assets/ethereum/" +
              contractNftAddress +
              "/" +
              all_single[i].nftId;
            const auc_data = {
              addressNFTCollection: all_single[i].addressNFTCollection,
              addressPaymentToken: all_single[i].addressPaymentToken,
              bidCount: all_single[i].bidCount,
              creator: all_single[i].creator,
              currentBidOwner: all_single[i].currentBidOwner,
              currentBidPrice: all_single[i].currentBidPrice,
              endAuction: all_single[i].endAuction,
              index: all_single[i].index,
              nftId: all_single[i].nftId,
              attributes: nft_data.attributes,
              description: nft_data.description,
              edition: "",
              image: nft_data.image,
              name: nft_data.name,
              opensea: opensea,
            };
            auctionData.push(auc_data);
          } catch (err) {
            console.log(err + " " + all_single[i].nftId);
          }
        }

        // if (i == 1) {
        //   const auc_data = {
        //     "addressNFTCollection": all_single[i].addressNFTCollection,
        //     "addressPaymentToken": all_single[i].addressPaymentToken,
        //     "bidCount": all_single[i].bidCount,
        //     "creator": all_single[i].creator,
        //     "currentBidOwner": all_single[i].currentBidOwner,
        //     "currentBidPrice": all_single[i].currentBidPrice,
        //     "endAuction": all_single[i].endAuction,
        //     "index": all_single[i].index,
        //     "nftId": all_single[i].nftId,
        //     "attributes": "",
        //     "description": "The Doge Pound is 10,000 art pieces carefully chosen by Professor Elon. A unique digital collection of diverse NFTs lying on Ethereum Blockchain. Each one is thoughtfully designed, specifically picked, and impeccably shaped.",
        //     "edition": 0,
        //     "image": "https://img.seadn.io/files/c267b85fc23035ccd86c6b59dc346649.png",
        //     "name": "DOGGY #5696"
        //   }
        //   auctionData.push(auc_data);
        // } else {
        //   if (all_single[i].nftId == "2657") {
        //     const auc_data = {
        //       "addressNFTCollection": all_single[i].addressNFTCollection,
        //       "addressPaymentToken": all_single[i].addressPaymentToken,
        //       "bidCount": all_single[i].bidCount,
        //       "creator": all_single[i].creator,
        //       "currentBidOwner": all_single[i].currentBidOwner,
        //       "currentBidPrice": all_single[i].currentBidPrice,
        //       "endAuction": all_single[i].endAuction,
        //       "index": all_single[i].index,
        //       "nftId": all_single[i].nftId,
        //       "attributes": "",
        //       "description": "Funk, meet web 3. A collection of 8,888 unique digital hippies that are building the new free world before our eyes.",
        //       "edition": 0,
        //       "image": "https://img.seadn.io/files/dfff63c2151d7cebf3786d500e885194.png",
        //       "name": "Dippie #2657"
        //     }
        //     auctionData.push(auc_data);
        //   }
        //   else if (all_single[i].nftId == "5215") {
        //     const auc_data = {
        //       "addressNFTCollection": all_single[i].addressNFTCollection,
        //       "addressPaymentToken": all_single[i].addressPaymentToken,
        //       "bidCount": all_single[i].bidCount,
        //       "creator": all_single[i].creator,
        //       "currentBidOwner": all_single[i].currentBidOwner,
        //       "currentBidPrice": all_single[i].currentBidPrice,
        //       "endAuction": all_single[i].endAuction,
        //       "index": all_single[i].index,
        //       "nftId": all_single[i].nftId,
        //       "attributes": "",
        //       "description": "The on-chain idle MMO.",
        //       "edition": 0,
        //       "image": "https://img.seadn.io/files/0a84166204b227d619728b7cd80203ad.png",
        //       "name": "Hero #5215"
        //     }
        //     auctionData.push(auc_data);
        //   }
        //   else {
        //     const nUrl = await window.contract3.methods.tokenURI(all_single[i].nftId).call();
        //     const response = await fetch("https://opensea.mypinata.cloud/ipfs/" + nUrl.substring(7));
        //     if (!response.ok) {
        //       throw new Error('Something went wrong');
        //     }
        //     const nft_data = await response.json();
        //     const auc_data = {
        //       "addressNFTCollection": all_single[i].addressNFTCollection,
        //       "addressPaymentToken": all_single[i].addressPaymentToken,
        //       "bidCount": all_single[i].bidCount,
        //       "creator": all_single[i].creator,
        //       "currentBidOwner": all_single[i].currentBidOwner,
        //       "currentBidPrice": all_single[i].currentBidPrice,
        //       "endAuction": all_single[i].endAuction,
        //       "index": all_single[i].index,
        //       "nftId": all_single[i].nftId,
        //       "attributes": nft_data.attributes,
        //       "description": nft_data.description,
        //       "edition": nft_data.edition,
        //       "image": "https://ipfs.infura.io/ipfs/" + nft_data.image.substring(7),
        //       "name": nft_data.name
        //     }
        //     auctionData.push(auc_data);
        //   }
        // }
      }
      setAuctionDetailsS(auctionData);
    } catch (err) {
      console.log(err);
    }
  };

  const getFrensCount = async () => {
    //Contract Interaction
    const web3 = new Web3(window.ethereum);
    const contractABI = require("../abi/lilfrens_token_abi.json");

    try {
      //Approve Token
      window.contract = await new web3.eth.Contract(contractABI, tokenContract);
      const balance = await window.contract.methods
        .balanceOf(window.ethereum.selectedAddress)
        .call();
      const bal = parseInt(ethers.utils.formatEther(balance));
      setFrensCount(bal.toLocaleString());
    } catch (err) {
      console.log(err);
    }
  };

  const handleModal = async (myArray) => {
    setCurrBid(parseInt(ethers.utils.formatEther(myArray.currentBidPrice)));
    setCurrBidder(
      myArray.currentBidOwner.substring(0, 5) +
        "........" +
        myArray.currentBidOwner.substring(35)
    );
    setMinBid(
      parseInt(ethers.utils.formatEther(myArray.currentBidPrice)) +
        (5 * parseInt(ethers.utils.formatEther(myArray.currentBidPrice))) / 100
    );
    setBid(
      parseInt(ethers.utils.formatEther(myArray.currentBidPrice)) +
        (5 * parseInt(ethers.utils.formatEther(myArray.currentBidPrice))) / 100
    );
    setshowPopup(!showPopup);
  };

  const handleModalHide = async () => {
    setCurrBid("");
    setCurrBidder("");
    setMinBid("");
    setBid("");
    setshowPopup(!showPopup);
  };

  const handleModalS = async (myArray) => {
    setCurrBidS(parseInt(ethers.utils.formatEther(myArray.currentBidPrice)));
    setCurrBidderS(
      myArray.currentBidOwner.substring(0, 5) +
        "........" +
        myArray.currentBidOwner.substring(35)
    );
    setMinBidS(
      parseInt(ethers.utils.formatEther(myArray.currentBidPrice)) +
        (5 * parseInt(ethers.utils.formatEther(myArray.currentBidPrice))) / 100
    );
    setBidS(
      parseInt(ethers.utils.formatEther(myArray.currentBidPrice)) +
        (5 * parseInt(ethers.utils.formatEther(myArray.currentBidPrice))) / 100
    );
    setIndexS(myArray.index);
    setshowPopupS(!showPopupS);
  };

  const handleModalHideS = async () => {
    setCurrBidS("");
    setCurrBidderS("");
    setMinBidS("");
    setBidS("");
    setIndexS("");
    setshowPopupS(!showPopupS);
  };

  const claim = async (index) => {
    //Contract Interaction
    const web3 = new Web3(window.ethereum);
    const auction_contractABI = require("../abi/lilfrens_auction_abi.json");

    try {
      //Claim Bundle NFTs
      window.contract = await new web3.eth.Contract(
        auction_contractABI,
        contractAuctionAddress
      );
      //set up your Ethereum transaction
      const transactionParametersClaim = {
        to: contractAuctionAddress, // Required except during contract publications.
        from: window.ethereum.selectedAddress, // must match user's active address.
        data: window.contract.methods.claimBundleNFT(index).encodeABI(), //make call to NFT smart contract
      };
      //sign the transaction via Metamask
      const txHashBid = await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [transactionParametersClaim],
      });

      await timeout(5000);
      toast("✅ NFTs Claimed Successfully");
      await timeout(1000);
      window.location.reload(false);
    } catch (err) {
      console.log(err);
    }
  };

  const claimS = async (index) => {
    //Contract Interaction
    const web3 = new Web3(window.ethereum);
    const auction_contractABI = require("../abi/lilfrens_auction_abi.json");

    try {
      //Claim Bundle NFTs
      window.contract = await new web3.eth.Contract(
        auction_contractABI,
        contractAuctionAddress
      );
      //set up your Ethereum transaction
      const transactionParametersClaim = {
        to: contractAuctionAddress, // Required except during contract publications.
        from: window.ethereum.selectedAddress, // must match user's active address.
        data: window.contract.methods.claimNFT(index).encodeABI(), //make call to NFT smart contract
      };
      //sign the transaction via Metamask
      const txHashBid = await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [transactionParametersClaim],
      });

      await timeout(5000);
      toast("✅ NFT Claimed Successfully");
      await timeout(1000);
      window.location.reload(false);
    } catch (err) {
      console.log(err);
    }
  };

  const placeBid = async (index, finalBid) => {
    //Contract Interaction
    const web3 = new Web3(window.ethereum);
    const contractABI = require("../abi/lilfrens_token_abi.json");
    const auction_contractABI = require("../abi/lilfrens_auction_abi.json");
    const allow_price = ethers.utils.parseEther(finalBid.toString());

    try {
      //Approve Token
      window.contract = await new web3.eth.Contract(contractABI, tokenContract);
      //set up your Ethereum transaction
      const transactionParameters = {
        to: tokenContract, // Required except during contract publications.
        from: window.ethereum.selectedAddress, // must match user's active address.
        data: window.contract.methods
          .approve(contractAuctionAddress, allow_price)
          .encodeABI(), //make call to NFT smart contract
      };
      //sign the transaction via Metamask
      const txHash = await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [transactionParameters],
      });
      await timeout(5000);

      //Place Bid
      window.contract = await new web3.eth.Contract(
        auction_contractABI,
        contractAuctionAddress
      );
      //set up your Ethereum transaction
      const transactionParametersBid = {
        to: contractAuctionAddress, // Required except during contract publications.
        from: window.ethereum.selectedAddress, // must match user's active address.
        data: window.contract.methods.bundlebid(index, allow_price).encodeABI(), //make call to NFT smart contract
      };
      //sign the transaction via Metamask
      const txHashBid = await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [transactionParametersBid],
      });

      await timeout(5000);
      toast("✅ Bid Placed Successfully");
      await timeout(1000);
      window.location.reload(false);
    } catch (err) {
      console.log(err);
    }
  };

  const placeBidS = async (index, finalBid) => {
    //Contract Interaction
    const web3 = new Web3(window.ethereum);
    const contractABI = require("../abi/lilfrens_token_abi.json");
    const auction_contractABI = require("../abi/lilfrens_auction_abi.json");
    const allow_price = ethers.utils.parseEther(finalBid.toString());

    try {
      //Approve Token
      window.contract = await new web3.eth.Contract(contractABI, tokenContract);
      //set up your Ethereum transaction
      const transactionParameters = {
        to: tokenContract, // Required except during contract publications.
        from: window.ethereum.selectedAddress, // must match user's active address.
        data: window.contract.methods
          .approve(contractAuctionAddress, allow_price)
          .encodeABI(), //make call to NFT smart contract
      };
      //sign the transaction via Metamask
      const txHash = await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [transactionParameters],
      });
      await timeout(5000);

      //Place Bid
      window.contract = await new web3.eth.Contract(
        auction_contractABI,
        contractAuctionAddress
      );
      //set up your Ethereum transaction
      const transactionParametersBid = {
        to: contractAuctionAddress, // Required except during contract publications.
        from: window.ethereum.selectedAddress, // must match user's active address.
        data: window.contract.methods.bid(index, allow_price).encodeABI(), //make call to NFT smart contract
      };
      //sign the transaction via Metamask
      const txHashBid = await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [transactionParametersBid],
      });

      await timeout(5000);
      toast("✅ Bid Placed Successfully");
      await timeout(1000);
      window.location.reload(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleRange = async (e) => {
    setBid(parseInt(currBid) + (parseInt(e) * parseInt(currBid)) / 100);
  };

  const handleRangeS = async (e) => {
    setBidS(parseInt(currBidS) + (parseInt(e) * parseInt(currBidS)) / 100);
  };

  const onmouseEnters = async () => {
    // document.getElementById("place-a-bid-btn").style.visibility = "visible";
    var placebid = document.getElementsByClassName("place-bid");
    placebid[0].style.visibility = "visible";
    // console.log(placebid);
    // console.log("Mouse Enters");
  };

  const onmouseLeaves = async () => {
    // document.getElementById("place-a-bid-btn").style.visibility = "hidden";
    var placebid = document.getElementsByClassName("place-bid");
    placebid[0].style.visibility = "hidden";
    // console.log("On mouse leaves");
  };

  const countdownCompleted = async () => {
    // console.log("incompleted function");
    // var btn = document.getElementById("place-btn");
    // btn.style.display = "none";
    // var claimbtn = document.getElementById("claim-btn");
    // claimbtn.style.display = "block"
  };

  function addWalletListener() {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setWallet(accounts[0]);
          //setStatus("👆🏽 Write a message in the text-field above.");
        } else {
          setWallet("");
          toast("🦊 Connect to Metamask using the top right button.");
        }
      });
    } else {
      toast(
        "🦊  You must install Metamask, a virtual Ethereum wallet, in your browser."
      );
    }
  }

  const connectWalletPressed = async () => {
    const walletResponse = await connectWallet();
    setWallet(walletResponse.address);
  };
  const handleHam = () => {
    document.getElementById("for-haming").classList.toggle("mystyle");
  };

  // let imgBundles = [
  //   fren1,
  //   fren2,
  //   fren3,
  //   fren4,
  //   fren5
  // ]

  // console.log(imgBundles)

  return (
    <div>
      <Modal show={showPopupS} onHide={() => handleModalHideS()}>
        <Modal.Header closeButton>
          <h3 className="placeabid-tit">Place a bid</h3>
        </Modal.Header>
        <Modal.Body>
          <p className="must-bid">
            <strong>You must bid a minimum of 5%</strong>
          </p>
          {/* <input
            className="bid-input"
            placeholder="00 Frens"
            type="text"
          /> */}
          <p style={{ paddingTop: "30px" }} className="must-bid ">
            Your Bid : <span style={{ fontWeight: "600" }}>{bidS} FRENS</span>
          </p>
          <input
            className="range-input"
            type="range"
            id="vol"
            name="vol"
            min="5"
            max="10"
            defaultValue={5}
            onChange={(e) => handleRangeS(e.target.value)}
          />

          <div style={{ paddingTop: "30px" }} className="for-flexing-must">
            <p className="must-bid">Current Bidder: </p>
            <span className="minbids">{currBidderS}</span>
          </div>
          <div className="for-flexing-must">
            <p className="must-bid">Current Bid:</p>
            <span className="minbids">{currBidS} FRENS</span>
          </div>
          <div className="for-flexing-must">
            <p className="must-bid">You must bid at least:</p>
            <span className="minbids">{minBidS} FRENS</span>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="place-bid-end"
            onClick={() => placeBidS(indexS, bidS)}
          >
            Place a bid
          </Button>
        </Modal.Footer>
      </Modal>
      {/* <Modal show={this.state.show} onHide={() => this.handleModal()}> */}
      <Modal show={showPopup} onHide={() => handleModalHide()}>
        <Modal.Header closeButton>
          <h3 className="placeabid-tit">Place a bid</h3>
        </Modal.Header>
        <Modal.Body>
          <p className="must-bid">
            <strong>You must bid a minimum of 5%</strong>
          </p>
          {/* <input
            className="bid-input"
            placeholder="00 Frens"
            type="text"
          /> */}
          <p style={{ paddingTop: "30px" }} className="must-bid ">
            Your Bid : <span style={{ fontWeight: "600" }}>{bid} FRENS</span>
          </p>
          <input
            className="range-input"
            type="range"
            id="vol"
            name="vol"
            min="5"
            max="10"
            defaultValue={5}
            onChange={(e) => handleRange(e.target.value)}
          />

          <div style={{ paddingTop: "30px" }} className="for-flexing-must">
            <p className="must-bid">Current Bidder: </p>
            <span className="minbids">{currBidder}</span>
          </div>
          <div className="for-flexing-must">
            <p className="must-bid">Current Bid:</p>
            <span className="minbids">{currBid} FRENS</span>
          </div>
          <div className="for-flexing-must">
            <p className="must-bid">You must bid at least:</p>
            <span className="minbids">{minBid} FRENS</span>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button className="place-bid-end" onClick={() => placeBid(0, bid)}>
            Place a bid
          </Button>
        </Modal.Footer>
      </Modal>
      {/* <img className="banner" src={banner} alt="" /> */}
      <header>
        <div className="container">
          <div className="row">
            <div className="col-sm-5 col-5">
              <img className="logo" src={logo} alt="" />
            </div>
            <div className="col-sm-7 col-7">
              <ul id="for-haming" className="navigation">
                <li>
                  <a className="nav-links" href="/">
                    Home
                  </a>
                </li>

                <li>
                  <a className="nav-links" href="#">
                    {frensCount} $FREN
                  </a>
                </li>

                <li>
                  <button
                    id="walletButton"
                    style={{ marginTop: "-12px" }}
                    className="nav-links connect-wallet"
                    onClick={connectWalletPressed}
                  >
                    {walletAddress.length > 0 ? (
                      "Connected: " +
                      String(walletAddress).substring(0, 6) +
                      "..." +
                      String(walletAddress).substring(38)
                    ) : (
                      <span>Connect Wallet</span>
                    )}
                  </button>
                  {/* <a className="nav-links connect-wallet" href="#">
                    Connect Wallet
                  </a> */}
                </li>
              </ul>
              <img
                className="hamburger"
                src={Ham}
                alt=""
                onClick={() => handleHam()}
              />
            </div>
          </div>
        </div>
      </header>

      <section className="hero-section">
        <img className="banner" src={banner} alt="Snow" />

        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <div className="text-wrapper">
                <div className="text-wrapping">
                  <h1 className="first-tit">
                    Lil Auction House
                    <br />
                    <span className="sellauction">
                      Bid & Raffle on NFTs with $fren!
                    </span>
                    <br />
                    <span className="lilfrens">
                      Our precursor to the rainbow marketplace
                    </span>
                  </h1>
                  <div className="btn-wrapper">
                    <a className="banner-btn" href="#auctions_sec">
                      <img src={bannerbtnicon} alt="" /> Auctions
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="auctions_sec" className="bbody">
        <div className="container">
          <div className="row">
            <h3 className="liveaction">Live Bundles Auction </h3>
          </div>
        </div>

        {/* auction bundles */}
        <div className="container bundles-container">
          <div className="row">
            <div className="col-sm-6 col-lg-4 col-xl-3">
              <div
                className="full-card-active"
                // onMouseEnter={() => this.onmouseEnters()}
                // onMouseLeave={() => this.onmouseLeaves()}
              >
                {auctionDetails.length > 0 ? (
                  <>
                    <div className="for-overlay">
                      <div className="for-flexing">
                        {/* <div className="first-coloum">
                        <img src={first} alt="" />
                      </div> */}
                        <div className="second-coloum">
                          <h3 className="creative">
                            Lil Deployer
                            <br /> {auctionDetails[0].name}
                          </h3>
                          {/* <p className="createdby">
                          Created By: <br />
                          {auctionDetails[0].creator.substring(0, 6)} .........{auctionDetails[0].creator.substring(35)}
                        </p> */}
                        </div>
                        <div
                          className="third-coloum"
                          style={{ marginLeft: "auto" }}
                        >
                          <p className="heart">
                            <img className="heart" src={heart} alt="" />
                            {auctionDetails[0].bidCount}
                          </p>

                          <p className="current-bid">Current Bid</p>
                          <p className="frens">
                            {parseInt(
                              ethers.utils.formatEther(
                                auctionDetails[0].currentBidPrice
                              )
                            )}{" "}
                            FRENS
                          </p>
                        </div>
                      </div>

                      <div className="for-flexing five-image">
                        {/* <img className="fren1 first-img" src={"https://img.seadn.io/files/af52206910d2a2ce8b50455dec292a0a.png"} alt="" /> */}

                        {/* <img className="fren1 first-img" src={imgBundles.map[0]} alt="" /> */}

                        <div className="fourwrap">
                          <div>
                            {auctionDetails.map((item, idx) => {
                              return (
                                <a href={item.opensea} target="_blank">
                                  <img
                                    key={idx}
                                    className="fren1 second-img"
                                    src={item.image}
                                    alt=""
                                  />
                                </a>
                              );
                            })}
                            {/* 
                          <img className="fren1 second-img" src={"https://img.seadn.io/files/6be7bff732e22951aca03378933cc36e.png"} alt="" />
                          <img className="fren1 third-img" src={"https://img.seadn.io/files/26df582c16e9c9094a032454c1536db9.png"} alt="" />
                          <img className="fren1 second-img" src={"https://img.seadn.io/files/6be7bff732e22951aca03378933cc36e.png"} alt="" />
                          <img className="fren1 third-img" src={"https://img.seadn.io/files/26df582c16e9c9094a032454c1536db9.png"} alt="" />
                          <img className="fren1 second-img" src={"https://img.seadn.io/files/6be7bff732e22951aca03378933cc36e.png"} alt="" />
                          <img className="fren1 third-img" src={"https://img.seadn.io/files/26df582c16e9c9094a032454c1536db9.png"} alt="" /> */}
                            {/* {person.firstName} */}
                          </div>
                          <div>
                            {/* <img className="fren1 fourth-img" src={"https://ipfs.infura.io/ipfs/" + auctionDetails[0].image[3].image.substring(7)} alt="" />
                          <img className="fren1 fifth-img" src={"https://ipfs.infura.io/ipfs/" + auctionDetails[0].image[4].image.substring(7)} alt="" /> */}
                          </div>
                        </div>
                      </div>

                      <div className="timer">
                        <img className="time-icon" src={timeicon} alt="" />
                        {new Date() >
                        new Date(
                          parseInt(auctionDetails[0].endAuction) * 1000
                        ) ? (
                          <span className="auction_closed">Auction Closed</span>
                        ) : (
                          <Countdown
                            onComplete={() => window.location.reload(false)}
                            date={
                              new Date(
                                parseInt(auctionDetails[0].endAuction) * 1000
                              )
                            }
                          />
                        )}
                      </div>
                    </div>
                    <div id="place-a-bid-btn" className="place-bid">
                      {new Date() >
                        new Date(
                          parseInt(auctionDetails[0].endAuction) * 1000
                        ) &&
                      auctionDetails[0].currentBidOwner
                        .toString()
                        .toLowerCase() ===
                        window.ethereum.selectedAddress
                          .toString()
                          .toLowerCase() ? (
                        <Button
                          id="place-btn"
                          className="place-bid-btn"
                          onClick={() => claim(auctionDetails[0].index)}
                        >
                          Claim NFTs
                        </Button>
                      ) : // <Button
                      //   id="place-btn"
                      //   className="place-bid-btn"
                      //   disabled
                      // >
                      //   Claim - Coming Soon
                      // </Button>
                      new Date() >
                        new Date(
                          parseInt(auctionDetails[0].endAuction) * 1000
                        ) ? (
                        <Button
                          id="place-btn"
                          className="place-bid-btn"
                          disabled
                        >
                          Bidding Closed
                        </Button>
                      ) : (
                        <Button
                          id="place-btn"
                          className="place-bid-btn"
                          onClick={() => handleModal(auctionDetails[0])}
                        >
                          <img className="placebidico" src={placebid} alt="" />{" "}
                          Place Bid
                        </Button>
                      )}

                      {/* <Button
      id="claim-btn"
      className="place-bid-btn"

    >
      Claim Bid
    </Button> */}
                    </div>
                  </>
                ) : (
                  <div></div>
                )}
              </div>
            </div>
            <div className="col-sm-6 col-lg-4 col-xl-3">
              <div className="disabled">
                <div className="coming-soon">
                  <a className="coming-soon">Coming Soon</a>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-lg-4 col-xl-3">
              <div className="disabled">
                <div className="coming-soon">
                  <a className="coming-soon">Coming Soon</a>
                </div>
              </div>
            </div>
            {/* <div className="col-sm-6 col-lg-3 col-xl-3">
              <div className="disabled">
                <div className="coming-soon">
                  <a className="coming-soon">Coming Soon</a>
                </div>
              </div>
            </div> */}
          </div>
        </div>

        {/* auction single cards */}
        <div className="container">
          <div className="row">
            <h3 style={{ paddingTop: "80px" }} className="liveaction">
              Live Auctions
            </h3>
          </div>
          <div className="row">
            {auctionDetailsS.length > 0 ? (
              auctionDetailsS.map((item, index) => {
                return (
                  <div className="col-sm-6 col-lg-4 col-xl-3">
                    <div>
                      <div className="full-card s secondcard">
                        <a href={item.opensea} target="_blank">
                          <img className="fren" src={item.image} alt="" />
                        </a>
                        <div className="timers">
                          <img className="time-icon" src={timeicon} alt="" />
                          {new Date() >
                          new Date(parseInt(item.endAuction) * 1000) ? (
                            <span className="auction_closed">
                              Auction Closed
                            </span>
                          ) : (
                            <Countdown
                              onComplete={() => window.location.reload(false)}
                              date={new Date(parseInt(item.endAuction) * 1000)}
                            />
                          )}
                        </div>
                        <p className="heart second-heart">
                          <img className="heart" src={heart} alt="" />
                          {item.bidCount}
                        </p>

                        <div className="for-flexing first-flexing">
                          <div className="first-one">
                            <h3 className="creative second">{item.name}</h3>
                          </div>

                          <div className="secone-one">
                            <div className="bsc">FRENS</div>
                          </div>
                        </div>

                        <div className="for-flexing second-flexing">
                          <div className="img-two-text">
                            <div className="for-flexing">
                              <div>
                                <a href={item.opensea} target="_blank">
                                  {" "}
                                  <img
                                    className="prof-img"
                                    src={item.image}
                                    alt=""
                                  />
                                </a>
                              </div>
                              {/* <div className="creator-details">
                                  <p className="current-bid">Creator</p>
                                  <p className="frens">{item.creator.substring(0, 3)}........{item.creator.substring(37)}</p>
                                </div> */}
                            </div>
                          </div>
                          <div>
                            <div className="second-details">
                              <p className="current-bid">Current bid</p>
                              <p className="frens">
                                {parseInt(
                                  ethers.utils.formatEther(item.currentBidPrice)
                                )}{" "}
                                FRENS
                              </p>
                            </div>
                          </div>
                        </div>
                        <div
                          id="place-a-bid-btn"
                          className="place-bid"
                          // onmouseLeaves={() => this.onmouseLeaves()}
                        >
                          {new Date() >
                            new Date(parseInt(item.endAuction) * 1000) &&
                          item.currentBidOwner.toString().toLowerCase() ===
                            window.ethereum.selectedAddress
                              .toString()
                              .toLowerCase() ? (
                            <Button
                              id="place-btn"
                              className="place-bid-btn"
                              onClick={() => claimS(item.index)}
                            >
                              Claim NFT
                            </Button>
                          ) : // <Button
                          //   id="place-btn"
                          //   className="place-bid-btn"
                          //   disabled
                          // >
                          //   Claim - Coming Soon
                          // </Button>
                          new Date() >
                            new Date(parseInt(item.endAuction) * 1000) ? (
                            <Button
                              id="place-btn"
                              className="place-bid-btn"
                              disabled
                            >
                              Bidding Closed
                            </Button>
                          ) : (
                            <Button
                              id="place-btn"
                              className="place-bid-btn"
                              onClick={() => handleModalS(item)}
                            >
                              <img
                                className="placebidico"
                                src={placebid}
                                alt=""
                              />{" "}
                              Place Bid
                            </Button>
                          )}

                          {/* <Button
                              id="claim-btn"
                              className="place-bid-btn"

                            >
                              Claim Bid
                            </Button> */}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div></div>
            )}

            {/* <div className="col-sm-6 col-lg-4 col-xl-3">
                <div>
                  <div
                    className="full-card s secondcard"
                    onMouseEnter={() => this.onmouseEnters()}
                    onMouseLeave={() => this.onmouseLeaves()}
                  >
                    <img className="fren" src={live1} alt="" />
                    <div className="timers">
                      <img className="time-icon" src={timeicon} alt="" />

                      <Countdown
                        onComplete={() => this.countdownCompleted()}
                        date={new Date(parseInt(1656758888) * 1000)}
                      />
                    </div>
                    <p className="heart second-heart">
                      <img className="heart" src={heart} alt="" />
                      100
                    </p>

                    <div className="for-flexing first-flexing">
                      <div className="first-one">
                        <h3 className="creative second">Fren Cloud 2...</h3>
                      </div>

                      <div className="secone-one">
                        <div className="bsc">bsc</div>
                      </div>
                    </div>

                    <div className="for-flexing second-flexing">
                      <div className="img-two-text">
                        <div className="for-flexing">
                          <div>
                            <img className="prof-img" src={pro1} alt="" />
                          </div>
                          <div className="creator-details">
                            <p className="current-bid">Creator</p>
                            <p className="frens">4.89 FRENS</p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="second-details">
                          <p className="current-bid">Current bid</p>
                          <p className="frens">4.89 FRENS</p>
                        </div>
                      </div>
                    </div>
                    <div
                      id="place-a-bid-btn"
                      className="place-bid"
                      // onmouseLeaves={() => this.onmouseLeaves()}
                    >
                      <Button
                        id="place-btn"
                        className="place-bid-btn"
                        onClick={() => handleModal()}
                      >
                        <img className="placebidico" src={placebid} alt="" />{" "}
                        Place Bid
                      </Button>
                      <Button id="claim-btn" className="place-bid-btn">
                        Claim Bid
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-lg-4 col-xl-3">
                <div>
                  <div className="full-card secondcard">
                    <img className="fren" src={live2} alt="" />
                    <div className="timers">
                      <img className="time-icon" src={timeicon} alt="" />

                      <Countdown
                        onComplete={() => this.countdownCompleted()}
                        date={new Date(parseInt(1656758888) * 1000)}
                      />
                    </div>
                    <p className="heart second-heart">
                      <img className="heart" src={heart} alt="" />
                      100
                    </p>

                    <div className="for-flexing first-flexing">
                      <div className="first-one">
                        <h3 className="creative second">Fren Cloud 2...</h3>
                      </div>

                      <div className="secone-one">
                        <div className="bsc">bsc</div>
                      </div>
                    </div>

                    <div className="for-flexing second-flexing">
                      <div className="img-two-text">
                        <div className="for-flexing">
                          <div>
                            <img className="prof-img" src={pro2} alt="" />
                          </div>
                          <div className="creator-details">
                            <p className="current-bid">Creator</p>
                            <p className="frens">4.89 FRENS</p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="second-details">
                          <p className="current-bid">Current bid</p>
                          <p className="frens">4.89 FRENS</p>
                        </div>
                      </div>
                    </div>
                    <div
                      id="place-a-bid-btn"
                      className="place-bid"
                      // onmouseLeaves={() => this.onmouseLeaves()}
                    >
                      <Button
                        id="place-btn"
                        className="place-bid-btn"
                        onClick={() => this.handleModal()}
                      >
                        <img className="placebidico" src={placebid} alt="" />{" "}
                        Place Bid
                      </Button>
                      <Button id="claim-btn" className="place-bid-btn">
                        Claim Bid
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-lg-4 col-xl-3">
                <div>
                  <div className="full-card secondcard">
                    <img className="fren" src={live3} alt="" />
                    <div className="timers">
                      <img className="time-icon" src={timeicon} alt="" />

                      <Countdown
                        onComplete={() => this.countdownCompleted()}
                        date={new Date(parseInt(1656758888) * 1000)}
                      />
                    </div>
                    <p className="heart second-heart">
                      <img className="heart" src={heart} alt="" />
                      100
                    </p>

                    <div className="for-flexing first-flexing">
                      <div className="first-one">
                        <h3 className="creative second">Fren Cloud 2...</h3>
                      </div>

                      <div className="secone-one">
                        <div className="bsc">bsc</div>
                      </div>
                    </div>

                    <div className="for-flexing second-flexing">
                      <div className="img-two-text">
                        <div className="for-flexing">
                          <div>
                            <img className="prof-img" src={pro3} alt="" />
                          </div>
                          <div className="creator-details">
                            <p className="current-bid">Creator</p>
                            <p className="frens">4.89 FRENS</p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="second-details">
                          <p className="current-bid">Current bid</p>
                          <p className="frens">4.89 FRENS</p>
                        </div>
                      </div>
                    </div>
                    <div
                      id="place-a-bid-btn"
                      className="place-bid"
                      // onmouseLeaves={() => this.onmouseLeaves()}
                    >
                      <Button
                        id="place-btn"
                        className="place-bid-btn"
                        onClick={() => this.handleModal()}
                      >
                        <img className="placebidico" src={placebid} alt="" />{" "}
                        Place Bid
                      </Button>
                      <Button id="claim-btn" className="place-bid-btn">
                        Claim Bid
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-sm-6 col-lg-4 col-xl-3">
                <div>
                  <div className="full-card secondcard">
                    <img className="fren" src={live4} alt="" />
                    <div className="timers">
                      <img className="time-icon" src={timeicon} alt="" />

                      <Countdown
                        onComplete={() => this.countdownCompleted()}
                        date={new Date(parseInt(1656758888) * 1000)}
                      />
                    </div>
                    <p className="heart second-heart">
                      <img className="heart" src={heart} alt="" />
                      100
                    </p>

                    <div className="for-flexing first-flexing">
                      <div className="first-one">
                        <h3 className="creative second">Fren Cloud 2...</h3>
                      </div>

                      <div className="secone-one">
                        <div className="bsc">bsc</div>
                      </div>
                    </div>

                    <div className="for-flexing second-flexing">
                      <div className="img-two-text">
                        <div className="for-flexing">
                          <div>
                            <img className="prof-img" src={pro4} alt="" />
                          </div>
                          <div className="creator-details">
                            <p className="current-bid">Creator</p>
                            <p className="frens">4.89 FRENS</p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="second-details">
                          <p className="current-bid">Current bid</p>
                          <p className="frens">4.89 FRENS</p>
                        </div>
                      </div>
                    </div>
                    <div
                      id="place-a-bid-btn"
                      className="place-bid"
                      // onmouseLeaves={() => this.onmouseLeaves()}
                    >
                      <Button
                        id="place-btn"
                        className="place-bid-btn"
                        onClick={() => this.handleModal()}
                      >
                        <img className="placebidico" src={placebid} alt="" />{" "}
                        Place Bid
                      </Button>
                      <Button id="claim-btn" className="place-bid-btn">
                        Claim Bid
                      </Button>
                    </div>
                  </div>
                </div>
              </div> */}
          </div>
        </div>
        <footer>
          <div className="container">
            <div className="row">
              <div className="col-sm-7">
                <ul className="footer-links">
                  <li className="footer-single">
                    <a
                      className="footer-links"
                      href="https://www.lilfrens.xyz/"
                      target="_blank"
                    >
                      About Lilfrens
                    </a>
                  </li>
                  <li className="footer-single">
                    <a className="footer-links" href="#">
                      ADVERTISING
                    </a>
                  </li>
                  <li className="footer-single">
                    <a className="footer-links" href="#">
                      Help/Faq
                    </a>
                  </li>
                  <li className="footer-single">
                    <a className="footer-links" href="mailto:info@LilFrens.xyz">
                      Info@LilFrens.xyz
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col-sm-5">
                <div className="footer-social-wrap">
                  <div className="social-wrap">
                    <img className="social-imgs" src={foot1} alt="" />
                    <img className="social-imgs" src={foot2} alt="" />
                    <img className="social-imgs" src={foot3} alt="" />
                    <a href="https://twitter.com/thelilfrens" target="_blank">
                      <img className="social-imgs" src={foot4} alt="" />
                    </a>
                    <img className="social-imgs" src={foot5} alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </section>
    </div>
  );
};

export default Home;
