import logo from "../Assets/img/tftLogo.png";
import {
  FaFacebookSquare,
  FaInstagramSquare,
  FaTwitterSquare,
} from "react-icons/fa";
function Footer() {
  return (
    <footer className="footer">
      <div className="logo">
        <img src={logo} alt={"Logo"} />
        <h2>
          <span>C</span>rowd
          <span> F</span>unding
        </h2>
      </div>
      <hr />

      <div className="bottomFooter">
        <div className="team">
          <h2>Our Team</h2>
          <p> Tft web3 team</p>
        </div>
        <div className="social-icon">
          <h2>Social</h2>
          <div className="social">
            <a href={"https://www.facebook.com/TFTUS/"}>
              <icon>
                <FaFacebookSquare />
              </icon>
            </a>
            <a href={"https://www.instagram.com/tft_us/?hl=en"}>
              <icon>
                <FaInstagramSquare />
              </icon>
            </a>
            <a
              href={
                "https://twitter.com/ThinkFutureTech?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor"
              }
            >
              <icon>
                <FaTwitterSquare />
              </icon>
            </a>
          </div>
        </div>
      </div>
      <hr />
      <div className="logo">
        <h3>&copy; Copyrights All Rights Reserved </h3>
      </div>
    </footer>
  );
}

export default Footer;
