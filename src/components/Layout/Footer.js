"use client";

const Footer = () => {
  return (
    <>
      <div className="flex-grow-1"></div>

      <footer className="footer-area bg-white text-center rounded-top-7">
        <p className="fs-14">
          © <span className="text-primary-div">ALUCARD SHOP</span> is Proudly Owned by{" "}
          <a
            href="https://jahid-hasan-rimel.netlify.app/"
            target="_blank"
            className="text-decoration-none text-primary"
          >
            Jahid Hasan Rimel
          </a>
        </p>
      </footer>
    </>
  );
};

export default Footer;
