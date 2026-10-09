
import { useState } from 'react';
import axios from 'axios';
import logo from '../../images/iteration-1-images/logo.svg';

const malzemeListesi = [
  'Pepperoni',
  'Domates',
  'Biber',
  'Sosis',
  'Mısır',
  'Sucuk',
  'Kanada Jambonu',
  'Tavuk Izgara',
  'Jalepeno',
  'Kabak',
  'Soğan',
  'Sarımsak',
  'Ananas',
];

function OrderPizza({ onOrderSuccess }) {
  const [formData, setFormData] = useState({
    isim: '',
    boyut: '',
    hamur: '',
    malzemeler: [],
    ozel: '',
    adet: 1,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleMalzemeChange = (event) => {
    const { value, checked } = event.target;

    setFormData((prev) => ({
      ...prev,
      malzemeler: checked
        ? prev.malzemeler.length < 10
          ? [...prev.malzemeler, value]
          : prev.malzemeler
        : prev.malzemeler.filter((item) => item !== value),
    }));
  };

  const handleAdetChange = (miktar) => {
    setFormData((prev) => ({
      ...prev,
      adet: Math.max(1, prev.adet + miktar),
    }));
  };

  const malzemeUcreti = formData.malzemeler.length * 5;
  const toplam = (85.5 + malzemeUcreti) * formData.adet;

  const isFormValid =
    formData.isim.trim().length >= 3 &&
    formData.boyut !== '' &&
    formData.hamur !== '' &&
    formData.malzemeler.length >= 4 &&
    formData.malzemeler.length <= 10 &&
    formData.adet >= 1;

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!isFormValid || isSubmitting) return;

    setIsSubmitting(true);
    setSubmitError('');

    const siparis = {
      ...formData,
      malzemeUcreti,
      toplam,
    };

    try {
      const response = await axios.post(
        'https://reqres.in/api/pizza',
        siparis,
        {
          headers: {
            'x-api-key': 'reqres-free-v1',
          },
        }
      );

      console.log('Sipariş yanıtı:', response.data);
      console.log('Sipariş özeti:', siparis);
      console.log('HTTP durum kodu:', response.status);

      onOrderSuccess(siparis);
    } catch (error) {
      console.error('Sipariş hatası:', error);
      console.log('API hata detayı:', error.response?.data);

      setSubmitError(
        'Sipariş gönderilemedi. Lütfen tekrar deneyin.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <header className="order-header">
        <img
          src={logo}
          alt="Teknolojik Yemekler"
          className="order-logo"
        />

        <p>Anasayfa - Seçenekler - Sipariş Oluştur</p>
      </header>

      <main className="order-container">
        <h2>Position Absolute Acı Pizza</h2>

        <div className="pizza-price">
          <strong>85.50₺</strong>
          <span>4.9 (200)</span>
        </div>

        <p className="pizza-description">
          Frontend Dev olarak hala position absolute kullanıyorsan
          bu çok acı pizza tam sana göre. Pizza, domates, peynir
          ve genellikle çeşitli diğer malzemelerle kaplanmış,
          daha sonra geleneksel olarak odun ateşinde pişirilen
          yuvarlak şekilde hazırlanır.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="selection-row">
            <fieldset>
              <legend>Boyut Seç *</legend>

              {['Küçük', 'Orta', 'Büyük'].map((boyut) => (
                <label key={boyut}>
                  <input
                    type="radio"
                    name="boyut"
                    value={boyut}
                    checked={formData.boyut === boyut}
                    onChange={handleChange}
                    required
                  />
                  {boyut}
                </label>
              ))}
            </fieldset>

            <div>
              <label htmlFor="hamur">Hamur Seç *</label>

              <select
                id="hamur"
                name="hamur"
                value={formData.hamur}
                onChange={handleChange}
                required
              >
                <option value="">Hamur Kalınlığı Seç</option>
                <option value="İnce">İnce</option>
                <option value="Normal">Normal</option>
                <option value="Kalın">Kalın</option>
              </select>
            </div>
          </div>

          <section className="extras-section">
            <h3>Ek Malzemeler *</h3>

            <p>
              En az 4, en fazla 10 malzeme seçebilirsiniz.
              Her biri 5₺.
            </p>

            <div className="extras-grid">
              {malzemeListesi.map((malzeme) => (
                <label key={malzeme}>
                  <input
                    type="checkbox"
                    value={malzeme}
                    checked={formData.malzemeler.includes(malzeme)}
                    onChange={handleMalzemeChange}
                    disabled={
                      formData.malzemeler.length >= 10 &&
                      !formData.malzemeler.includes(malzeme)
                    }
                  />
                  {malzeme}
                </label>
              ))}
            </div>
          </section>

          <div className="form-field">
            <label htmlFor="isim">İsim *</label>

            <input
              id="isim"
              type="text"
              name="isim"
              value={formData.isim}
              onChange={handleChange}
              placeholder="Adınızı giriniz"
              minLength={3}
              required
            />

            {formData.isim.length > 0 &&
              formData.isim.trim().length < 3 && (
                <small style={{ color: '#ce2829' }}>
                  İsim en az 3 karakter olmalıdır.
                </small>
              )}
          </div>

          <div className="form-field">
            <label htmlFor="ozel">Sipariş Notu</label>

            <textarea
              id="ozel"
              name="ozel"
              value={formData.ozel}
              onChange={handleChange}
              placeholder="Siparişine eklemek istediğin bir not var mı?"
            />
          </div>

          <div className="order-bottom">
            <div className="quantity-control">
              <button
                type="button"
                onClick={() => handleAdetChange(-1)}
                aria-label="Adedi azalt"
              >
                -
              </button>

              <span>{formData.adet}</span>

              <button
                type="button"
                onClick={() => handleAdetChange(1)}
                aria-label="Adedi artır"
              >
                +
              </button>
            </div>

            <div className="order-summary">
              <h3>Sipariş Toplamı</h3>

              <p>
                Seçimler: {malzemeUcreti.toFixed(2)}₺
              </p>

              <strong>
                Toplam: {toplam.toFixed(2)}₺
              </strong>

              <button
                type="submit"
                disabled={!isFormValid || isSubmitting}
              >
                {isSubmitting ? 'GÖNDERİLİYOR...' : 'SİPARİŞ VER'}
              </button>
            </div>
          </div>

          {submitError && (
            <p role="alert" style={{ color: '#ce2829' }}>
              {submitError}
            </p>
          )}
        </form>
      </main>
    </>
  );
}

export default OrderPizza;
