
import homeBanner from '../../images/iteration-1-images/home-banner.png';
import logo from '../../images/iteration-1-images/logo.svg';

function Home({ onStartOrder }) {
  return (
    <main className="home-page">
      <header className="home-header">
        <img
          src={logo}
          alt="Teknolojik Yemekler"
          className="home-logo"
        />
      </header>

      <section className="home-content">
        <h2>
          KOD ACIKTIRIR
          <br />
          PİZZA, DOYURUR
        </h2>

        <button
          type="button"
          className="home-order-button"
          onClick={onStartOrder}
        >
          ACIKTIM
        </button>
      </section>

      <img
        src={homeBanner}
        alt="Lezzetli pizza ve malzemeler"
        className="home-banner"
      />
    </main>
  );
}

export default Home;
