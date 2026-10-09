
import logo from '../../images/iteration-1-images/logo.svg';

function Success({ siparis }) {
  return (
    <main className="success-page">
      <header className="success-header">
        <img
          src={logo}
          alt="Teknolojik Yemekler"
          className="success-logo"
        />
      </header>

      <div className="success-content">
        <h2>
          TEBRİKLER!
          <br />
          SİPARİŞİNİZ ALINDI!
        </h2>

        <div className="success-divider"></div>

        <h3>Position Absolute Acı Pizza</h3>

        <div className="success-details">
          <p>İsim: {siparis.isim}</p>
          <p>Boyut: {siparis.boyut}</p>
          <p>Hamur: {siparis.hamur}</p>
          <p>Ek Malzemeler: {siparis.malzemeler.join(', ')}</p>
          <p>Adet: {siparis.adet}</p>
          {siparis.ozel && <p>Sipariş Notu: {siparis.ozel}</p>}
        </div>

        <div className="success-summary">
          <h3>Sipariş Toplamı</h3>
          <p>Seçimler: {siparis.malzemeUcreti.toFixed(2)}₺</p>
          <strong>Toplam: {siparis.toplam.toFixed(2)}₺</strong>
        </div>
      </div>
    </main>
  );
}

export default Success;
