import ConnectWallet from '@/components/ConnectWallet';
import React, { useState } from 'react';
import { useWallet, WalletStatus } from '@terra-money/wallet-provider';

// import PropTypes from 'prop-types';
function LandingPage() {
  const [displayPopUp, setDisplayPopUp] = useState(false);
  const [connectWalletOpen, setConnectWalletOpen] = useState(false);
  const { status, disconnect } = useWallet();

  const handleConnectWallet = () => {
    setConnectWalletOpen(!connectWalletOpen);
  };

  const displayMenu = () => {
    setDisplayPopUp(!displayPopUp);
  };

  const outSide = () => {
    setDisplayPopUp(false);
  };

  const openSocialLink = (type: string) => {
    if (type === 'telegram') {
      window.open('https://t.me/GraviDAO', '_blank');
    } else if (type === 'twitter') {
      window.open('https://twitter.com/GraviDAO_', '_blank');
    } else if (type === 'medium') {
      window.open('https://gravidao.medium.com/', '_blank');
    } else if (type === 'github') {
      window.open('https://github.com/GraviDAO', '_blank');
    } else if (type === 'logo') {
      window.open('https://lunarassistant.io/', '_blank');
    } else if (type === 'collection') {
      window.open(
        'https://talis.art/collection/61d7877c92794d4227b31043',
        '_blank',
      );
    } else if (type === 'read') {
      window.open(
        'https://gravidao.medium.com/lunar-assistant-the-giving-d799b5a7ffc',
        '_blank',
      );
    } else {
      window.open('https://discord.gg/nD6YFKQTRF', '_blank');
    }
  };
  return (
    <>
      <div>
        <section className="main-container">
          <article className="">
            <div className="d-flex row">
              <div className="d-flex col-4 col-xs-12 align-items-center">
                <div className="d-flex fixed-xs-top">
                  <div className="d-flex">
                    <img
                      src="/assets/svg/user-group-solid.svg"
                      alt="user-group"
                      className="icon"
                    />
                    <span className="pd-left-6 fn-14 ylw">76</span>
                  </div>
                  <div className="pd-left-16 d-flex">
                    <img
                      src="/assets/svg/server.svg"
                      alt="user-group"
                      className="icon"
                    />
                    <span className="pd-left-6 fn-14 ylw">8000</span>
                  </div>
                </div>

                <button
                  className="show-on-mobile burger-icon"
                  onClick={displayMenu}
                  type="button"
                >
                  {!displayPopUp ? (
                    <img
                      className="icon pointer"
                      src="/assets/svg/bars-solid.svg"
                    />
                  ) : (
                    <img className="icon pointer" src="/assets/svg/close.svg" />
                  )}
                </button>
              </div>
              <div className="col-4 text-center hide-on-small">
                {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
                <img
                  className="la-logo"
                  src="/assets/img/logo.png"
                  alt=""
                  onClick={() => openSocialLink('logo')}
                  onKeyDown={() => openSocialLink('logo')}
                />
              </div>

              <div className="col-4 d-flex justify-content-end hide-on-small">
                <div className="d-flex align-items-center">
                  <div
                    onClick={() => openSocialLink('twitter')}
                    onKeyDown={() => openSocialLink('twitter')}
                    role="button"
                    tabIndex={-1}
                  >
                    <img
                      className="icon i24 pointer"
                      src="/assets/svg/twitter-brands.svg"
                    />
                  </div>
                  <div
                    className="pd-left-20"
                    onClick={() => openSocialLink('discord')}
                    onKeyDown={() => openSocialLink('discord')}
                    role="button"
                    tabIndex={-1}
                  >
                    <img
                      className="icon i24 pointer"
                      src="/assets/svg/discord-brands.svg"
                    />
                  </div>
                  <div
                    className="pd-left-20"
                    onClick={() => openSocialLink('telegram')}
                    onKeyDown={() => openSocialLink('telegram')}
                    role="button"
                    tabIndex={-1}
                  >
                    <img
                      className="icon i24 pointer"
                      src="/assets/svg/telegram-brands.svg"
                    />
                  </div>
                  <div
                    className="pd-left-20"
                    onClick={() => openSocialLink('medium')}
                    onKeyDown={() => openSocialLink('medium')}
                    role="button"
                    tabIndex={-1}
                  >
                    <img
                      className="icon i24 pointer"
                      src="/assets/svg/medium-brands.svg"
                    />
                  </div>
                  <div
                    className="pd-left-20"
                    onClick={() => openSocialLink('github')}
                    onKeyDown={() => openSocialLink('github')}
                    role="button"
                    tabIndex={-1}
                  >
                    <img
                      className="icon i24 pointer"
                      src="/assets/svg/github-brands.svg"
                    />
                  </div>
                </div>
              </div>
            </div>
          </article>

          {displayPopUp && (
            <div
              className="col-12 flex-row-center outer-container"
              onClick={outSide}
              onKeyDown={outSide}
              role="button"
              tabIndex={-1}
            >
              <div className="pop-up-container">
                <div
                  className="social-link mr-top-32 mr-bottom-32"
                  onClick={() => openSocialLink('twitter')}
                  onKeyDown={() => openSocialLink('twitter')}
                  role="button"
                  tabIndex={-1}
                >
                  Twitter
                </div>
                <div
                  className="social-link mr-bottom-32"
                  onClick={() => openSocialLink('discord')}
                  onKeyDown={() => openSocialLink('discord')}
                  role="button"
                  tabIndex={-1}
                >
                  discord
                </div>
                <div
                  className="social-link mr-bottom-32"
                  onClick={() => openSocialLink('telegram')}
                  onKeyDown={() => openSocialLink('telegram')}
                  role="button"
                  tabIndex={-1}
                >
                  telegram
                </div>
                <div
                  className="social-link mr-bottom-32"
                  onClick={() => openSocialLink('medium')}
                  onKeyDown={() => openSocialLink('medium')}
                  role="button"
                  tabIndex={-1}
                >
                  medium
                </div>
                <div
                  className="social-link mr-bottom-32"
                  onClick={() => openSocialLink('github')}
                  onKeyDown={() => openSocialLink('github')}
                  role="button"
                  tabIndex={-1}
                >
                  github
                </div>
              </div>
            </div>
          )}

          <div className="show-on-mobile fixed-icon">
            {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
            <img
              className="la-logo"
              src="/assets/img/la-logo.png"
              alt=""
              onClick={() => openSocialLink('logo')}
              onKeyDown={() => openSocialLink('logo')}
            />
          </div>

          <article className="row main-wrapper">
            <div className="col-xs-12 col-sm-6 col-md-6 col-lg-4 flex-row-center mr-top--80">
              <div className="mr-top80">
                <div className="connect-wallet-wrapper flex-column">
                  <div className="pd-top-26">
                    <span className="post-lbl-title">1</span>
                  </div>
                  <div className="wallet-text-container pd-top-8">
                    <div className="pd-lr-12 text-start">
                      <span className="label ter">
                        Connect the wallet you want to link to your discord
                        account.
                      </span>
                    </div>
                  </div>
                  <div className="mr-left-10 mr-top-22">
                    <button
                      type="button"
                      className="btn-container main"
                      onClick={
                        status === WalletStatus.WALLET_CONNECTED
                          ? () => {
                              disconnect();
                            }
                          : () => {
                              handleConnectWallet();
                            }
                      }
                    >
                      {status === WalletStatus.WALLET_CONNECTED
                        ? 'Disconnect Wallet'
                        : 'Connect Wallet'}
                    </button>
                  </div>
                </div>

                <div className="mr-top-24 connect-wallet-wrapper post flex-column">
                  <div className="pd-top-26">
                    <span className="post-lbl-title">2</span>
                  </div>
                  <div className="wallet-text-container pd-top-8">
                    <div className="pd-lr-12 text-start">
                      <span className="label ter">
                        Post a transaction that will prove ownership of your
                        wallet. It will cost a small gas fee.
                      </span>
                    </div>
                  </div>
                  <div className="mr-left-10 mr-top-18">
                    <button type="button" className="btn-container cta-2">
                      post a transaction
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-sm-6 col-xs-12 col-md-6 col-lg-4 text-center min-height mr-top80 flex-col-center">
              <img className="mid-img" src="assets/img/LPimgframe-full.png" />
            </div>

            <div className="col-md-6 col-xs-12 col-sm-6 col-lg-4 mr-80 mr-top80">
              <div className="text-center">
                <div>
                  <img
                    className="giving-img"
                    src="assets/img/LP-TheGiving.png"
                  />
                </div>
                <div className="pd-top-40">
                  <div style={{ height: '60px' }}>
                    <button
                      type="button"
                      className="btn-container main"
                      onClick={() => openSocialLink('collection')}
                      onKeyDown={() => openSocialLink('collection')}
                    >
                      Collection
                    </button>
                  </div>
                  <div>
                    <button
                      type="button"
                      className="btn-container cta3"
                      onClick={() => openSocialLink('read')}
                      onKeyDown={() => openSocialLink('read')}
                    >
                      Read up
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </article>

          <div className="footer-container">
            <div>
              <img
                className="label1"
                src="/assets/img/LA-footer-label-1.png"
                alt=""
              />
              <img
                className="label2"
                src="/assets/img/LA-footer-label-2.png"
                alt=""
              />
            </div>
          </div>
        </section>
        <ConnectWallet open={connectWalletOpen} setOpen={handleConnectWallet} />
      </div>
    </>
  );
}

LandingPage.propTypes = {};

export default LandingPage;
