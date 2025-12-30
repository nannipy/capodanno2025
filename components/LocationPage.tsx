import React from 'react';

const LocationPage: React.FC = () => {
  return (
    <div className="animate-in fade-in duration-500">
      <div className="bg-white/50 backdrop-blur-sm rounded-3xl p-6 md:p-8 mb-8 border border-stone-200/50 shadow-sm">
        <h2 className="text-2xl font-serif font-bold text-gourmet-dark mb-6 flex items-center gap-2">
          <i className="fas fa-map-marked-alt text-gourmet-gold"></i>
          Indicazioni
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Map Section */}
          <div className="space-y-4">
             <div className="w-full h-64 md:h-80 rounded-2xl overflow-hidden shadow-md border border-stone-200">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!4v1767048546029!6m8!1m7!1sTx7CzuN4a48Cy8Gw20UKkw!2m2!1d42.54294773455496!2d12.44154221290082!3f122.09704407497263!4f-2.1691477801954306!5f0.4000000000000002" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Mappa Posizione"
              ></iframe>
            </div>
            <a 
              href="https://maps.app.goo.gl/YGxaH63hhgnWRS8e8" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block w-full text-center py-3 bg-gourmet-gold/10 text-gourmet-gold font-medium rounded-xl hover:bg-gourmet-gold/20 transition-colors"
            >
              Apri in Google Maps
            </a>
          </div>

          {/* Info Section */}
          <div className="space-y-8">
            {/* Directions */}
            <div>
              <h3 className="text-lg font-serif font-bold text-gourmet-dark mb-3 flex items-center gap-2">
                <i className="fas fa-location-arrow text-gourmet-gold/80"></i>
                Indirizzo
              </h3>
              <p className="text-gourmet-text/80 leading-relaxed">
                Fornole (TR)
              </p>
              <p className="text-gourmet-text/80 leading-relaxed">
                Strada di Cecanibbio 50 
              </p>
            </div>

            {/* Parking */}
            <div>
              <h3 className="text-lg font-serif font-bold text-gourmet-dark mb-3 flex items-center gap-2">
                <i className="fas fa-parking text-gourmet-gold/80"></i>
                Parcheggio
              </h3>
              <div className="bg-gourmet-base p-4 rounded-xl border border-stone-200/50">
                <p className="text-gourmet-text/80 mb-2">
                  È importante ottimizzare il parcheggio per dare spazio a tutti, quindi :
                  <ul>
                    <li> - ci saranno due parcheggi indicati con dei cartelli oltre quello principale </li>
                    <li> - organizzati per riempire piu possibile la macchina </li>
                    <li> - non lasciare spazio inutilizzato appena arrivi</li>
                  </ul>
                </p>
              </div>
            </div>
            {/* Dormire */}
            <div>
              <h3 className="text-lg font-serif font-bold text-gourmet-dark mb-3 flex items-center gap-2">
                <i className="fas fa-bed text-gourmet-gold/80"></i>
                Dormire
              </h3>
              <div className="bg-gourmet-base p-4 rounded-xl border border-stone-200/50">
                <p className="text-gourmet-text/80 mb-2">
                  Ricordati di portare un sacco a pelo, un asciugamano e se ce l'hai un materassino gonfiabile 
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationPage;
