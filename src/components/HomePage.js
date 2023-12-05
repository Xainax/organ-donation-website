import React from 'react';

const HomePage = () => {
  return (
    <div className="page-background">
      <header>
        <h1>Organ Donation Website</h1>
      </header>
      <main>
        <p>We are an organ dontation management website that will manage organ donation
        requests and the availability of the organs. Each request will be assigned a priority
        number based on the medical urgency and other criterias such as immunological
        factors, location, and age. Direct donations will be allowed, and we will assign those
        separate codes in order to distinguish them from regular priority based donations</p>
        <img src="https://www.rush.edu/sites/default/files/media-images/Organ-Donation-Facts-OG.jpg" alt="Placeholder" class="center"/>
      </main>
    </div>
  );
}

export default HomePage;