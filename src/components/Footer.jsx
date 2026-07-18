import './Footer.css';

function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="footer__inner">
        <hr className="footer__divider" />
        <p className="footer__text">
          <strong>MLR Institute of Technology</strong>
          <br />
          Dundigal, Hyderabad, Telangana 500043
        </p>
        <p className="footer__legal">
          This form is administered by the MLRIT Administration.
          All data collected is confidential and used solely for institutional records.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
