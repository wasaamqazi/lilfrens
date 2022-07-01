import React, { Component } from "react";
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

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      show: false,
    };
  }

  handleModal() {
    this.setState({ show: !this.state.show });

  }
  // onmouseEnters() {
  //   // document.getElementById("place-a-bid-btn").style.visibility = "visible";
  //   var placebid = document.getElementsByClassName("place-bid")
  //   placebid[0].style.visibility = "visible"


  //   console.log(placebid);
  //   console.log("Mouse Enters");

  // }
  // onmouseLeaves() {
  //   // document.getElementById("place-a-bid-btn").style.visibility = "hidden";
  //   var placebid = document.getElementsByClassName("place-bid");
  //   placebid[0].style.visibility = "hidden"

  //   console.log("On mouse leaves");
  // }
  countdownCompleted() {
    console.log("incompleted function");
    var btn = document.getElementById("place-btn");
    btn.style.display = "none";
    var claimbtn = document.getElementById("claim-btn");
    claimbtn.style.display = "block"

  }

  render() {
    let imgBundles = [
      fren1,
      fren2,
      fren3,
      fren4,
      fren5
    ]

    const person = { firstName: "John", lastName: "Doe", age: 46 };

    console.log(imgBundles)
    return (

      < div >
        <Modal show={this.state.show} onHide={() => this.handleModal()}>
          <Modal.Header closeButton>
            <h3 className="placeabid-tit">Place a bid</h3>
          </Modal.Header>
          <Modal.Body>
            <p className="must-bid">You must bid lest 4.89FRENS</p>
            <input
              className="bid-input"
              placeholder="00.00 Frens"
              type="text"
            />
            <p style={{ paddingTop: "30px" }} className="must-bid ">
              Current Bid : <span style={{ fontWeight: "600" }}>7.89FRENS</span>
            </p>
            <input
              className="range-input"
              type="range"
              id="vol"
              name="vol"
              min="0"
              max="50"
              onChange={() => this.handleRange(this.value)}
            />

            <div style={{ paddingTop: "30px" }} className="for-flexing-must">
              <p className="must-bid">You must bid at least: </p>
              <span
                style={{
                  fontWeight: "600",
                  fontFamily: "Montserrat Alternates",
                }}
              >
                7.89FRENS
              </span>
            </div>
            <div className="for-flexing-must">
              <p className="must-bid">Service free:</p>
              <span
                style={{
                  fontWeight: "600",
                  fontFamily: "Montserrat Alternates",
                }}
              >
                7.89FRENS
              </span>
            </div>
            <div className="for-flexing-must">
              <p className="must-bid">Total Bid Amount:</p>
              <span
                style={{
                  fontWeight: "600",
                  fontFamily: "Montserrat Alternates",
                }}
              >
                4FRENS
              </span>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              className="place-bid-end"
              onClick={() => this.handleModal()}
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
                    <a className="nav-links connect-wallet" href="#">
                      Connect Wallet
                    </a>
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
                      Discover, Find!
                      <br />
                      <span className="sellauction">Sell & Auction</span>
                      <br />
                      <span className="lilfrens">Lil Frens NFTs</span>
                    </h1>
                    <p>
                      Marketplace For Lil Frens Character Collections Non
                      Fungible Token NFTs
                    </p>
                    <div className="btn-wrapper">
                      <a className="banner-btn" href="#">
                        <img src={bannerbtnicon} alt="" /> Explore
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="bbody">
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
                  <div className="for-overlay">
                    <div className="for-flexing">
                      <div className="first-coloum">
                        <img src={first} alt="" />
                      </div>
                      <div className="second-coloum">
                        <h3 className="creative">
                          Creative Art
                          <br /> Collection
                        </h3>
                        <p className="createdby">
                          Created By: <br />
                          Sara Williams
                        </p>
                      </div>
                      <div className="third-coloum">
                        <p className="heart">
                          <img className="heart" src={heart} alt="" />
                          100
                        </p>

                        <p className="current-bid">Current Bid</p>
                        <p className="frens">4.89 FRENS</p>
                      </div>
                    </div>

                    <div className="for-flexing five-image">

                      <img className="fren1 first-img" src={imgBundles[0]} alt="" />

                      {/* <img className="fren1 first-img" src={imgBundles.map[0]} alt="" /> */}
                      <div className="fourwrap">
                        <div>
                          <img className="fren1 second-img" src={imgBundles[1]} alt="" />
                          <img className="fren1 third-img" src={imgBundles[2]} alt="" />
                          {/* {person.firstName} */}
                        </div>
                        <div>
                          <img className="fren1 fourth-img" src={imgBundles[3]} alt="" />
                          <img className="fren1 fifth-img" src={imgBundles[4]} alt="" />
                        </div>
                      </div>
                    </div>
                    <div className="timer">
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
                <div className="col-sm-3">
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
                </div>
                <div className="col-sm-3">
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
                </div>
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
  }
}
