import React from "react";
import Delay from "../components/Delay";
import { LazyLoadImage } from "react-lazy-load-image-component";

const Travels = () => {
  return (
    <section id="services" className="py-5 pt-3 section services">
      <div className="container">
        <div className="mb-4 px-md-5">
          <h2 className="h2 heading mb-4 slideUp">Explore The World With Us</h2>
          <Delay delay={300}>
            <p className="slideUp">
              At The Visits Travels, we believe leisure is essential for healthy
              living. Whether you’re seeking adventure or relaxation, we offer a
              wide range of affordable and luxurious travel packages. From
              safaris and cruises to sightseeing and creative trips, our
              expeditions cater to solo travelers, families, and business
              professionals alike.
            </p>
            <div className="mb-3 ">
              <LazyLoadImage
                className="img-fluid shadow"
                effect="opacity"
                placeholderSrc="/images/default.png"
                src={"/Media/explore.jpg"}
                alt=""
              />
            </div>
          </Delay>
          <Delay delay={500}>
            <h4 className="h4 heading mb-4 slideUp">Discover America</h4>
          </Delay>
          <Delay delay={600}>
            <p className="slideUp">
              America attracts a vast number of immigrants drawn to its diverse
              opportunities. Our packages include visits, work, and study
              options in some of the most appealing cities, partnered with
              prestigious universities such as Harvard University, Stanford
              University, and the University of California. Enhance your
              American journey with visits to iconic locations like Niagara
              Falls, Banff National Park, and the Bay of Fundy in Canada, as
              well as the Frida Kahlo Museum and Chapultepec in Mexico.
            </p>
          </Delay>
          <Delay delay={800}>
            <h4 className="h4 heading mb-4 slideUp">Journey Through Asia</h4>
          </Delay>
          <Delay delay={900}>
            <p className="slideUp">
              Our tours in Asia promise unforgettable experiences. Explore the
              majestic Amber Palace and Mehrangarh Fort in India, the vibrant
              streets of Pattaya, the Grand Palace, and the serene Karon Beach
              in Thailand. These destinations showcase the rich cultural
              heritage and natural beauty of the continent.
            </p>
          </Delay>
          <Delay delay={800}>
            <h4 className="h4 heading mb-4 slideUp">Unveil Africa's Beauty</h4>
          </Delay>
          <Delay delay={900}>
            <p className="slideUp">
              Africa’s enchanting landscapes offer a blend of history, culture,
              and nature. Visit Nigeria’s Iyake Lake, one of the only two
              suspended lakes in the world, the Erin Ijesha Waterfall, Ikogosi
              Warm Springs, and the iconic Olumo Rock Tourist Centre. In Rwanda,
              marvel at Mount Karisimbi and Lake Ihema, while Tunisia boasts the
              stunning Plage Mahdia and Baths of Antoninus
            </p>
          </Delay>
          <Delay delay={800}>
            <h4 className="h4 heading mb-4 slideUp">Experience Europe</h4>
          </Delay>
          <Delay delay={900}>
            <p className="slideUp">
              Europe is a treasure trove of opportunities for tourists,
              students, and professionals. We are affiliated with top
              universities like the University of the West of England, Regent
              College London, London Metropolitan University, and Ulster
              University. Our European tours include visits to world-renowned
              landmarks such as the Colosseum, Eiffel Tower, Louvre Museum,
              Pantheon, Praia da Rocha, Cliffs of Moher, and the Casino de
              Monte-Carlo.
            </p>
          </Delay>
          <Delay delay={800}>
            <h4 className="h4 heading mb-4 slideUp">
              Why Choose The Visits Travels?
            </h4>
          </Delay>
          <Delay delay={900}>
            <ul>
              <Delay delay={100}>
                <li className="slideRight mb-1">
                  <strong>Affordable and Luxurious Packages:</strong> Tailored
                  to fit your budget and preferences.
                </li>
              </Delay>
              <Delay delay={200}>
                <li className="slideRight mb-1">
                  <strong>Diverse Destinations:</strong> From America to Asia,
                  Africa, and Europe.
                </li>
              </Delay>
              <Delay delay={300}>
                <li className="slideRight mb-1">
                  <strong>Educational Opportunities:</strong> Partnered with top
                  universities.
                </li>
              </Delay>
              <Delay delay={400}>
                <li className="slideRight mb-1">
                  <strong>Unforgettable Experiences:</strong> Iconic landmarks
                  and cultural treasures.
                </li>
              </Delay>
            </ul>
          </Delay>
          <Delay delay={800}>
            <h4 className="h4 heading mb-4 slideUp">Contact Us</h4>
          </Delay>
          <Delay delay={900}>
            <p className="slideUp">
              Embark on a journey of a lifetime with The Visits Travels. We are
              always available, accessible, and affordable. Let us help you
              explore the globe with ease and make lasting memories.
              <br />
              <br />
              Explore the World. Live Your Dream. Travel with laho.
            </p>
          </Delay>
        </div>
      </div>
    </section>
  );
};

export default Travels;
