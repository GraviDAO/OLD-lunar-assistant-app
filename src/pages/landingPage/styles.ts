import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  mainContainer: {
    backgroundImage: 'url("/assets/img/bg-cover.png")',
    width: '100vw',
    height: '100vh',
    overflowY: 'scroll',
    backgroundPosition: 'top',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    padding: '30px',
  },
  minHeight: {
    height: '513px',
  },
  outerContainer: {
    height: '100vh',
    width: '100%',
    background: 'transparent',
    position: 'absolute',
    marginLeft: '-30px',
  },
  popUpContainer: {
    width: '100%',
    backgroundColor: '#231F20',
    position: 'absolute',
    top: '20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    zIndex: 99,

    socialLink: {
      height: '17px',
      textTransform: 'uppercase',
      color: '#C4C4C4',
      fontFamily: 'Jura, serif',
      fontSize: '14px',
      fontWeight: 'bold',
      letterSpacing: 0,
      lineHeight: '17px',
      textAlign: 'center',
      width: '100%',
    },
  },
  mrBtm40: {
    marginBottom: 40,
  },
  yellowCol: {
    background: '#FFFF40',
  },
  icon: {
    width: 17,
    height: 17,

    '& .i24': {
      width: 24,
      height: 24,
    },

    '& .pointer': {
      cursor: 'pointer',
    },
  },
  fn14: {
    fontSize: 14,
    fontSeight: 'bold',
    letterSpacing: 0,
    lineHeight: 17,
    fontFamily: 'Jura, serif',

    '& .ylw': {
      color: '#FFFF40',
    },
  },
  laLogo: {
    height: 36,
    width: 120,
  },
  footerContainer: {
    textAlign: 'center',

    label1: {
      height: 50,
      width: 134,
    },

    label2: {
      height: 50,
      width: 114,
    },
  },

  flexColCenter: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },

  flexRowCenter: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },

  connectWalletWrapper: {
    textAlign: 'center',
    height: 220,
    backgroundSize: 'contain',
    background: 'url("/assets/svg/LP-textframe-1.svg") no-repeat center',

    '& post': {
      height: 240,
      backgroundSize: 'contain',
      background: 'url("/assets/svg/LP-textframe-1-5.svg") no-repeat center',
      opacity: 0.5,
    },
  },

  postLblTitle: {
    height: 30,
    width: 12,
    color: '#00FFFF',
    fontFamily: 'Uniwars',
    fontSize: 25,
    fontWeight: 600,
    letterSpacing: 0.89,
    lineHeight: 30,
  },

  walletTextContainer: {
    maxWidth: 240,
    marginLeft: 'auto',
    marginRight: 'auto',
  },

  btnContainer: {
    height: 49,
    width: 243,
    backgroundColor: '#00FFFF',
    border: 'none',
    fontSize: 14,
    letterSpacing: 0.5,
    lineHeight: 17,
    textAlign: 'center',
    textTransform: 'uppercase',

    '& main': {
      '&:hover, &:focus': {
        transitionDuration: '0.5s',
        transitionProperty: 'transform',
        backgroundColor: '#FFFF54',
        letterSpacing: 0.9,
        width: 248,
        height: 51,
      },
    },
    '& cta2': {
      color: '#777578',
      border: '1px solid #777578',
      backgroundColor: '#0A0A16',
    },

    '& cta3': {
      color: '#00FFFF',
      backgroundColor: 'transparent',

      '&:hover': {
        color: '#FFFF54',
        textDecoration: 'underline',
        textUnderlineOffset: 5,
      },
    },
  },

  label: {
    fontFamily: 'Jura, serif',

    '& ter': {
      color: '#C4C4C4',
      fontSize: 16,
      letterSpacing: 0,
      lineHeight: 18,
    },
  },

  nftSlideContainer: {
    height: '36vw',
    width: '100%',
    textAlign: 'center',
    minHeight: 250,
    backgrounSize: 'contain',
    background: 'url(/assets/img/LP-imageframe-long.png) no-repeat top',
    backgroundSize: 'contain',
  },

  nftImages: {
    width: '28vw',
    height: 'auto',
    objectFit: 'cover',
  },

  nftLbl: {
    height: 15,
    width: 284,
    color: '#FFFF40',
    fontFamily: 'Jura, serif',
    fontSize: 12,
    letterSpacing: 0,
    lineHeight: 15,
    textAlign: 'center',
  },

  givingLbl: {
    color: '#E5E5E5',
    fontFamily: 'Uniwars, serif',
    fontSize: 25,
    fontWeight: 600,
    letterSpacing: 0.89,
    lineHeight: 30,
  },

  openLbl: {
    opacity: 0.8,
    color: '#C4C4C4',
    fontFamily: 'Lato, serif',
    fontSize: 14,
    letterSpacing: 0,
    lineHeight: 18,
  },

  givingImg: {
    width: 261,
    height: 400,
    objectFit: 'contain',
  },

  showOnMobile: {
    display: 'none',
  },

  mainWrapper: {
    height: '82vh',
    alignItems: 'center',
  },

  nftTxtContainer: {
    paddingTop: 140,
  },

  displayOnTab: {
    display: 'none',
  },
});

export default useStyles;
