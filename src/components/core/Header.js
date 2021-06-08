const Header = () => {
  return (
    <div className="position-relative" style={{ zIndex: -1 }}>
      <section
        className="section section-lg section-shaped"
        style={{ paddingBottom: "15rem" }}
      >
        <div className="shape shape-style-1 shape-dark">
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>

        <div className="separator separator-bottom separator-skew">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0"
          >
            <polygon
              className="fill-white"
              points="2560 0 2560 100 0 100"
              fill="white"
            />
          </svg>
        </div>
      </section>
    </div>
  );
};

export default Header;
