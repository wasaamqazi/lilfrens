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
import { Button, Modal } from "react-bootstrap";
import Countdown from 'react-countdown';
import { useEffect, useState, useRef } from "react";
import { connectWallet, getCurrentWalletConnected } from "../utils/interact.js";
import Web3 from "web3";
import { ToastContainer, toast } from 'react-toastify';
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

  window.scrollTo(0, 0);

  const contractAuctionAddress = "0xB7123e97618a136ba140a5ec1B26737DbBAc6dc9";
  const tokenContract = "0x2EDD7A51D82220Bb878980ff892380720442D892";


  function timeout(delay) {
    return new Promise(res => setTimeout(res, delay));
  }

  useEffect(async () => {
    const { address, status } = await getCurrentWalletConnected();
    setWallet(address);

    getData();
    getDataS();

    addWalletListener();
  }, []);

  const getData = async () => {
    const web3 = new Web3(window.ethereum);
    const contractAuctionABI = require('../abi/lilfrens_auction_abi.json');

    try {
      window.contract = await new web3.eth.Contract(contractAuctionABI, contractAuctionAddress);
      const all_bundle = await window.contract.methods.getBundleAllList().call();

      var auctionData = [];

      for (var i = 0; i < all_bundle.length; i++) {
        const contractNftABI = require('../abi/lilfrens_nft_abi.json');
        const contractNftAddress = all_bundle[i].addressNFTCollection;
        window.contract = await new web3.eth.Contract(contractNftABI, contractNftAddress);

        var images_data = [];

        for (var j = 0; j < all_bundle[i].nftId.length; j++) {
          const nUrl = await window.contract.methods.tokenURI(all_bundle[i].nftId[j]).call();
          const response = await fetch(nUrl);
          if (!response.ok) {
            throw new Error('Something went wrong');
          }
          const nft_data = await response.json();
          images_data.push(nft_data);
        }

        const auc_data = {
          "addressNFTCollection": all_bundle[i].addressNFTCollection,
          "addressPaymentToken": all_bundle[i].addressPaymentToken,
          "bidCount": all_bundle[i].bidCount,
          "creator": all_bundle[i].creator,
          "currentBidOwner": all_bundle[i].currentBidOwner,
          "currentBidPrice": all_bundle[i].currentBidPrice,
          "endAuction": all_bundle[i].endAuction,
          "index": all_bundle[i].index,
          "nftId": all_bundle[i].nftId,
          "attributes": images_data[0].attributes,
          "description": images_data[0].description,
          "edition": images_data[0].edition,
          "image": images_data,
          "name": "Bundle NFTs"
        }

        auctionData.push(auc_data);
      }

      setAuctionDetails(auctionData);
      // console.log(auctionDetails);
    } catch (err) {
      console.log(err);
    }
  };

  const getDataS = async () => {

    const web3 = new Web3(window.ethereum);
    const contractAuctionABI = require('../abi/lilfrens_auction_abi.json');

    try {
      window.contract = await new web3.eth.Contract(contractAuctionABI, contractAuctionAddress);
      const all_single = await window.contract.methods.getAllList().call();

      var auctionData = [];

      for (var i = 0; i < all_single.length; i++) {

        const contractNftABI = require('../abi/lilfrens_nft_abi.json');
        const contractNftAddress = all_single[i].addressNFTCollection;
        window.contract = await new web3.eth.Contract(contractNftABI, contractNftAddress);
        const nUrl = await window.contract.methods.tokenURI(all_single[i].nftId).call();
        const response = await fetch(nUrl);
        if (!response.ok) {
          throw new Error('Something went wrong');
        }
        const nft_data = await response.json();
        const auc_data = {
          "addressNFTCollection": all_single[i].addressNFTCollection,
          "addressPaymentToken": all_single[i].addressPaymentToken,
          "bidCount": all_single[i].bidCount,
          "creator": all_single[i].creator,
          "currentBidOwner": all_single[i].currentBidOwner,
          "currentBidPrice": all_single[i].currentBidPrice,
          "endAuction": all_single[i].endAuction,
          "index": all_single[i].index,
          "nftId": all_single[i].nftId,
          "attributes": nft_data.attributes,
          "description": nft_data.description,
          "edition": nft_data.edition,
          "image": "https://ipfs.infura.io/ipfs/" + nft_data.image.substring(7),
          "name": nft_data.name
        }

        auctionData.push(auc_data);
      }

      setAuctionDetailsS(auctionData);
      // console.log(auctionDetailsS);

    } catch (err) {
      console.log(err);
    }
  };

  const handleModal = async (myArray) => {
    setCurrBid(parseInt(ethers.utils.formatEther(myArray.currentBidPrice)));
    setCurrBidder(myArray.currentBidOwner.substring(0, 5) + "........" + myArray.currentBidOwner.substring(35));
    setMinBid(parseInt(ethers.utils.formatEther(myArray.currentBidPrice)) + ((5 * parseInt(ethers.utils.formatEther(myArray.currentBidPrice))) / 100));
    setBid(parseInt(ethers.utils.formatEther(myArray.currentBidPrice)) + ((5 * parseInt(ethers.utils.formatEther(myArray.currentBidPrice))) / 100));
    setshowPopup(!showPopup);
  }

  const handleModalHide = async () => {
    setCurrBid("");
    setCurrBidder("");
    setMinBid("");
    setBid("");
    setshowPopup(!showPopup);
  }

  const handleModalS = async (myArray) => {
    setCurrBidS(parseInt(ethers.utils.formatEther(myArray.currentBidPrice)));
    setCurrBidderS(myArray.currentBidOwner.substring(0, 5) + "........" + myArray.currentBidOwner.substring(35));
    setMinBidS(parseInt(ethers.utils.formatEther(myArray.currentBidPrice)) + ((5 * parseInt(ethers.utils.formatEther(myArray.currentBidPrice))) / 100));
    setBidS(parseInt(ethers.utils.formatEther(myArray.currentBidPrice)) + ((5 * parseInt(ethers.utils.formatEther(myArray.currentBidPrice))) / 100));
    setIndexS(myArray.index);
    setshowPopupS(!showPopupS);
  }

  const handleModalHideS = async () => {
    setCurrBidS("");
    setCurrBidderS("");
    setMinBidS("");
    setBidS("");
    setIndexS("");
    setshowPopupS(!showPopupS);
  }

  const placeBid = async (index, finalBid) => {

    //Contract Interaction
    const web3 = new Web3(window.ethereum);
    const contractABI = require('../abi/lilfrens_token_abi.json');
    const auction_contractABI = require('../abi/lilfrens_auction_abi.json');
    const allow_price = ethers.utils.parseEther(finalBid.toString());

    try {

      //Approve Token
      window.contract = await new web3.eth.Contract(contractABI, tokenContract);
      //set up your Ethereum transaction
      const transactionParameters = {
        to: tokenContract, // Required except during contract publications.
        from: window.ethereum.selectedAddress, // must match user's active address.
        'data': window.contract.methods.approve(contractAuctionAddress, allow_price).encodeABI()//make call to NFT smart contract
      };
      //sign the transaction via Metamask
      const txHash = await window.ethereum
        .request({
          method: 'eth_sendTransaction',
          params: [transactionParameters],
        });
      await timeout(5000);

      //Place Bid
      window.contract = await new web3.eth.Contract(auction_contractABI, contractAuctionAddress);
      //set up your Ethereum transaction
      const transactionParametersBid = {
        to: contractAuctionAddress, // Required except during contract publications.
        from: window.ethereum.selectedAddress, // must match user's active address.
        'data': window.contract.methods.bundlebid(index, allow_price).encodeABI()//make call to NFT smart contract
      };
      //sign the transaction via Metamask
      const txHashBid = await window.ethereum
        .request({
          method: 'eth_sendTransaction',
          params: [transactionParametersBid],
        });

      await timeout(5000);
      toast("✅ Bid Placed Successfully");
      await timeout(1000);
      window.location.reload(false);

    } catch (err) {
      console.log(err);
    }
  }

  const placeBidS = async (index, finalBid) => {

    //Contract Interaction
    const web3 = new Web3(window.ethereum);
    const contractABI = require('../abi/lilfrens_token_abi.json');
    const auction_contractABI = require('../abi/lilfrens_auction_abi.json');
    const allow_price = ethers.utils.parseEther(finalBid.toString());

    try {

      //Approve Token
      window.contract = await new web3.eth.Contract(contractABI, tokenContract);
      //set up your Ethereum transaction
      const transactionParameters = {
        to: tokenContract, // Required except during contract publications.
        from: window.ethereum.selectedAddress, // must match user's active address.
        'data': window.contract.methods.approve(contractAuctionAddress, allow_price).encodeABI()//make call to NFT smart contract
      };
      //sign the transaction via Metamask
      const txHash = await window.ethereum
        .request({
          method: 'eth_sendTransaction',
          params: [transactionParameters],
        });
      await timeout(5000);

      //Place Bid
      window.contract = await new web3.eth.Contract(auction_contractABI, contractAuctionAddress);
      //set up your Ethereum transaction
      const transactionParametersBid = {
        to: contractAuctionAddress, // Required except during contract publications.
        from: window.ethereum.selectedAddress, // must match user's active address.
        'data': window.contract.methods.bid(index, allow_price).encodeABI()//make call to NFT smart contract
      };
      //sign the transaction via Metamask
      const txHashBid = await window.ethereum
        .request({
          method: 'eth_sendTransaction',
          params: [transactionParametersBid],
        });

      await timeout(5000);
      toast("✅ Bid Placed Successfully");
      await timeout(1000);
      window.location.reload(false);
    } catch (err) {
      console.log(err);
    }
  }

  const handleRange = async (e) => {
    setBid(parseInt(currBid) + ((parseInt(e) * parseInt(currBid)) / 100));
  }

  const handleRangeS = async (e) => {
    setBidS(parseInt(currBidS) + ((parseInt(e) * parseInt(currBidS)) / 100));
  }

  const onmouseEnters = async () => {
    // document.getElementById("place-a-bid-btn").style.visibility = "visible";
    var placebid = document.getElementsByClassName("place-bid")
    placebid[0].style.visibility = "visible"
    // console.log(placebid);
    // console.log("Mouse Enters");
  }

  const onmouseLeaves = async () => {
    // document.getElementById("place-a-bid-btn").style.visibility = "hidden";
    var placebid = document.getElementsByClassName("place-bid");
    placebid[0].style.visibility = "hidden"
    // console.log("On mouse leaves");
  }

  const countdownCompleted = async () => {
    // console.log("incompleted function");
    // var btn = document.getElementById("place-btn");
    // btn.style.display = "none";
    // var claimbtn = document.getElementById("claim-btn");
    // claimbtn.style.display = "block"
  }

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
      toast("🦊  You must install Metamask, a virtual Ethereum wallet, in your browser.");
    }
  }

  const connectWalletPressed = async () => {
    const walletResponse = await connectWallet();
    setWallet(walletResponse.address);
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
    < div >
      <Modal show={showPopupS} onHide={() => handleModalHideS()}>
        <Modal.Header closeButton>
          <h3 className="placeabid-tit">Place a bid</h3>
        </Modal.Header>
        <Modal.Body>
          <p className="must-bid"><strong>You must bid a minimum of 5%</strong></p>
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
            <span
              style={{
                fontWeight: "600",
                fontFamily: "Montserrat Alternates",
              }}
            >
              {currBidderS}
            </span>
          </div>
          <div className="for-flexing-must">
            <p className="must-bid">Current Bid:</p>
            <span
              style={{
                fontWeight: "600",
                fontFamily: "Montserrat Alternates",
              }}
            >
              {currBidS} FRENS
            </span>
          </div>
          <div className="for-flexing-must">
            <p className="must-bid">You must bid at least:</p>
            <span
              style={{
                fontWeight: "600",
                fontFamily: "Montserrat Alternates",
              }}
            >
              {minBidS} FRENS
            </span>
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
          <p className="must-bid"><strong>You must bid a minimum of 5%</strong></p>
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
            <span
              style={{
                fontWeight: "600",
                fontFamily: "Montserrat Alternates",
              }}
            >
              {currBidder}
            </span>
          </div>
          <div className="for-flexing-must">
            <p className="must-bid">Current Bid:</p>
            <span
              style={{
                fontWeight: "600",
                fontFamily: "Montserrat Alternates",
              }}
            >
              {currBid} FRENS
            </span>
          </div>
          <div className="for-flexing-must">
            <p className="must-bid">You must bid at least:</p>
            <span
              style={{
                fontWeight: "600",
                fontFamily: "Montserrat Alternates",
              }}
            >
              {minBid} FRENS
            </span>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="place-bid-end"
            onClick={() => placeBid(0, bid)}
          >
            Place a bid
          </Button>
        </Modal.Footer>
      </Modal>
      {/* <img className="banner" src={banner} alt="" /> */}
      <header>
        <div className="container">
          <div className="row">
            <div className="col-sm-5">
              <img className="logo" src={logo} alt="" />
            </div>
            <div className="col-sm-7">
              <ul className="navigation">
                <li>
                  <a className="nav-links" href="#">
                    Home
                  </a>
                </li>

                <li>
                  <a className="nav-links" href="#">
                    My NFT's
                  </a>
                </li>

                <li>
                  <button id="walletButton" style={{ marginTop: '-12px' }} className="nav-links connect-wallet" onClick={connectWalletPressed}>
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
                    Join The Mega Auction
                    <br />
                    <span className="sellauction">Bundles of NFTs</span>
                    <br />
                    <span className="lilfrens">Lil Deployer NFTs</span>
                  </h1>
                  <p>
                    <strong>Auction Page For Lil Deployer Collections Non
                      Fungible Token NFTs</strong>
                  </p>
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

        <div className="container">
          <div className="row">
            <div className="col-sm-4">
              <div
                className="full-card-active"
              // onMouseEnter={() => this.onmouseEnters()}
              // onMouseLeave={() => this.onmouseLeaves()}
              >
                {auctionDetails.length > 0 ?
                  <><div className="for-overlay">
                    <div className="for-flexing">
                      <div className="first-coloum">
                        <img src={first} alt="" />
                      </div>
                      <div className="second-coloum">
                        <h3 className="creative">
                          Lil Deployer
                          <br /> {auctionDetails[0].name}
                        </h3>
                        <p className="createdby">
                          Created By: <br />
                          {auctionDetails[0].creator.substring(0, 6)} .........{auctionDetails[0].creator.substring(35)}
                        </p>
                      </div>
                      <div className="third-coloum">
                        <p className="heart">
                          <img className="heart" src={heart} alt="" />
                          {auctionDetails[0].bidCount}
                        </p>

                        <p className="current-bid">Current Bid</p>
                        <p className="frens">{parseInt(ethers.utils.formatEther(auctionDetails[0].currentBidPrice))} FRENS</p>
                      </div>
                    </div>

                    <div className="for-flexing five-image">

                      <img className="fren1 first-img" src={"https://ipfs.infura.io/ipfs/" + auctionDetails[0].image[0].image.substring(7)} alt="" />

                      {/* <img className="fren1 first-img" src={imgBundles.map[0]} alt="" /> */}
                      <div className="fourwrap">
                        <div>
                          <img className="fren1 second-img" src={"https://ipfs.infura.io/ipfs/" + auctionDetails[0].image[1].image.substring(7)} alt="" />
                          <img className="fren1 third-img" src={"https://ipfs.infura.io/ipfs/" + auctionDetails[0].image[2].image.substring(7)} alt="" />
                          {/* {person.firstName} */}
                        </div>
                        <div>
                          <img className="fren1 fourth-img" src={"https://ipfs.infura.io/ipfs/" + auctionDetails[0].image[3].image.substring(7)} alt="" />
                          <img className="fren1 fifth-img" src={"https://ipfs.infura.io/ipfs/" + auctionDetails[0].image[4].image.substring(7)} alt="" />
                        </div>
                      </div>
                    </div>
                    <div className="timer">
                      <img className="time-icon" src={timeicon} alt="" />
                      {(new Date()) > (new Date(parseInt(auctionDetails[0].endAuction) * 1000))
                        ?
                        <span className="auction_closed">Auction Closed</span>
                        :
                        <Countdown
                          onComplete={() => window.location.reload(false)}
                          date={new Date(parseInt(auctionDetails[0].endAuction) * 1000)} />}
                    </div>
                  </div><div
                    id="place-a-bid-btn"
                    className="place-bid"
                  >
                      {(new Date()) > (new Date(parseInt(auctionDetails[0].endAuction) * 1000))
                        ?
                        <Button
                          id="place-btn"
                          className="place-bid-btn"
                          disabled
                        >
                          Claim - Coming Soon
                        </Button>
                        :
                        <Button
                          id="place-btn"
                          className="place-bid-btn"
                          onClick={() => handleModal(auctionDetails[0])}
                        >
                          <img className="placebidico" src={placebid} alt="" /> Place
                          Bid
                        </Button>}

                      {/* <Button
      id="claim-btn"
      className="place-bid-btn"

    >
      Claim Bid
    </Button> */}
                    </div></>
                  :

                  <div></div>
                }


              </div>
            </div>
            <div className="col-sm-4">
              <div className="disabled">
                <div className="coming-soon">
                  <a className="coming-soon">Coming Soon</a>
                </div>
              </div>
            </div>
            <div className="col-sm-4">
              <div className="disabled">
                <div className="coming-soon">
                  <a className="coming-soon">Coming Soon</a>
                </div>
              </div>
            </div>
            <div className="row">
              <h3 style={{ paddingTop: "80px" }} className="liveaction">
                Live Auctions
              </h3>
            </div>
            <div className="row">

              {auctionDetailsS.length > 0
                ? auctionDetailsS.map((item, index) => {
                  return (
                    <div className="col-sm-3">
                      <div>
                        <div className="full-card s secondcard"
                        // onMouseEnter={() => onmouseEnters()}
                        // onMouseLeave={() => onmouseLeaves()}
                        >
                          <img className="fren" src={item.image} alt="" />
                          <div className="timers">
                            <img className="time-icon" src={timeicon} alt="" />
                            {(new Date()) > (new Date(parseInt(item.endAuction) * 1000))
                              ?
                              <span className="auction_closed">Auction Closed</span>
                              :
                              <Countdown
                                onComplete={() => window.location.reload(false)}
                                date={new Date(parseInt(item.endAuction) * 1000)} />}
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
                              <div className="bsc">ETH</div>
                            </div>
                          </div>

                          <div className="for-flexing second-flexing">
                            <div className="img-two-text">
                              <div className="for-flexing">
                                <div>
                                  <img className="prof-img" src={item.image} alt="" />
                                </div>
                                <div className="creator-details">
                                  <p className="current-bid">Creator</p>
                                  <p className="frens">{item.creator.substring(0, 3)}........{item.creator.substring(37)}</p>
                                </div>
                              </div>
                            </div>
                            <div>
                              <div className="second-details">
                                <p className="current-bid">Current bid</p>
                                <p className="frens">{parseInt(ethers.utils.formatEther(item.currentBidPrice))} FRENS</p>
                              </div>
                            </div>
                          </div>
                          <div
                            id="place-a-bid-btn"
                            className="place-bid"
                          // onmouseLeaves={() => this.onmouseLeaves()}
                          >

                            {(new Date()) > (new Date(parseInt(item.endAuction) * 1000))
                              ?
                              <Button
                                id="place-btn"
                                className="place-bid-btn"
                                disabled
                              >
                                Claim - Coming Soon
                              </Button>
                              :
                              <Button
                                id="place-btn"
                                className="place-bid-btn"
                                onClick={() => handleModalS(item)}
                              >
                                <img className="placebidico" src={placebid} alt="" /> Place
                                Bid
                              </Button>}

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
                  )
                })
                :
                <div className="col-sm-3"></div>
              }

              {/* <div className="col-sm-3">
                <div>
                  <div className="full-card s secondcard"
                    onMouseEnter={() => this.onmouseEnters()}
                    onMouseLeave={() => this.onmouseLeaves()}
                  >
                    <img className="fren" src={live1} alt="" />
                    <div className="timers">
                      <img className="time-icon" src={timeicon} alt="" />

                      <Countdown
                        onComplete={() =>
                          this.countdownCompleted()
                        }
                        date={
                          new Date(parseInt(1656758888

                          ) * 1000)
                        }

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
                        onClick={() => this.handleModal()}
                      >
                        <img className="placebidico" src={placebid} alt="" /> Place
                        Bid
                      </Button>
                      <Button
                        id="claim-btn"
                        className="place-bid-btn"

                      >
                        Claim Bid
                      </Button>
                    </div>
                  </div>
                </div>
              </div> */}
              {/* <div className="col-sm-3">
                <div>
                  <div className="full-card secondcard">
                    <img className="fren" src={live2} alt="" />
                    <div className="timers">
                      <img className="time-icon" src={timeicon} alt="" />

                      <Countdown
                        onComplete={() =>
                          this.countdownCompleted()
                        }
                        date={
                          new Date(parseInt(1656758888

                          ) * 1000)
                        }

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
                        <img className="placebidico" src={placebid} alt="" /> Place
                        Bid
                      </Button>
                      <Button
                        id="claim-btn"
                        className="place-bid-btn"

                      >
                        Claim Bid
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-3">
                <div>
                  <div className="full-card secondcard">
                    <img className="fren" src={live3} alt="" />
                    <div className="timers">
                      <img className="time-icon" src={timeicon} alt="" />

                      <Countdown
                        onComplete={() =>
                          this.countdownCompleted()
                        }
                        date={
                          new Date(parseInt(1656758888

                          ) * 1000)
                        }

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
                        <img className="placebidico" src={placebid} alt="" /> Place
                        Bid
                      </Button>
                      <Button
                        id="claim-btn"
                        className="place-bid-btn"

                      >
                        Claim Bid
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-sm-3">
                <div>
                  <div className="full-card secondcard">
                    <img className="fren" src={live4} alt="" />
                    <div className="timers">
                      <img className="time-icon" src={timeicon} alt="" />

                      <Countdown
                        onComplete={() =>
                          this.countdownCompleted()
                        }
                        date={
                          new Date(parseInt(1656758888

                          ) * 1000)
                        }

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
                        <img className="placebidico" src={placebid} alt="" /> Place
                        Bid
                      </Button>
                      <Button
                        id="claim-btn"
                        className="place-bid-btn"

                      >
                        Claim Bid
                      </Button>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
        <footer>
          <div className="container">
            <div className="row">
              <div className="col-sm-7">
                <ul className="footer-links">
                  <li className="footer-single"><a className="footer-links" href="https://www.lilfrens.xyz/" target="_blank">About Lilfrens</a></li>
                  <li className="footer-single"><a className="footer-links" href="#">ADVERTISING</a></li>
                  <li className="footer-single"><a className="footer-links" href="#">Help/Faq</a></li>
                  <li className="footer-single"><a className="footer-links" href="mailto:info@LilFrens.xyz">Info@LilFrens.xyz</a></li>
                </ul>
              </div>
              <div className="col-sm-5">
                <div className="footer-social-wrap">
                  <div className="social-wrap">
                    <img className="social-imgs" src={foot1} alt="" />
                    <img className="social-imgs" src={foot2} alt="" />
                    <img className="social-imgs" src={foot3} alt="" />
                    <a href="https://twitter.com/thelilfrens" target="_blank"><img className="social-imgs" src={foot4} alt="" /></a>
                    <img className="social-imgs" src={foot5} alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </section >

    </div >
  );
};

export default Home;
