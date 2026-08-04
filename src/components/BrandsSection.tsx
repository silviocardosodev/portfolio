import Image from "next/image";
import hondaImage from "@/assets/img/honda.png";
import itauImage from "@/assets/img/itau.png";
import jussiLogo from "@/assets/img/jussi-logo.png";
import kitchenaidLogo from "@/assets/img/kitchenaid-logo.png";
import m7a7Logo from "@/assets/img/m7a7-logo.svg";
import origoLogo from "@/assets/img/origo-logo.webp";

type BrandsCopy = {
  eyebrow: string;
  title: string;
  imageAlt: string;
  items: readonly {
    name: string;
    description: string;
  }[];
};

const brandImages = {
  Honda: hondaImage,
  Itau: itauImage,
  Itaú: itauImage,
  Jussi: jussiLogo,
  Jüssi: jussiLogo,
  "KitchenAid Brasil": kitchenaidLogo,
  M7A7: m7a7Logo,
  "Órigo Energia": origoLogo,
};

const logoBrands = ["KitchenAid Brasil", "Jussi", "Jüssi", "M7A7", "Órigo Energia"];

export function BrandsSection({ copy }: { copy: BrandsCopy }) {
  return (
    <section className="brands" aria-labelledby="brands-title">
      <div className="brands__inner">
        <div className="brands__header">
          <p className="brands__eyebrow">{copy.eyebrow}</p>
          <h2 className="section__title" id="brands-title">
            {copy.title}
          </h2>
        </div>
        <div className="brands__list">
          {copy.items.map((item) => {
            const image = brandImages[item.name as keyof typeof brandImages] ?? kitchenaidLogo;
            const isLogo = logoBrands.includes(item.name);
            const mediaModifier = item.name === "Órigo Energia" ? "green" : item.name === "Jüssi" || item.name === "Jussi" ? "dark" : "light";

            return (
              <article className="brands__item" key={item.name}>
                <div className={`brands__media${isLogo ? ` brands__media--${mediaModifier}` : ""}`}>
                  <Image
                    className={`brands__image${isLogo ? " brands__image--logo" : ""}`}
                    src={image}
                    alt={`${item.name} ${copy.imageAlt}`}
                    width={image.width}
                    height={image.height}
                    sizes="(max-width: 640px) 100vw, 24vw"
                  />
                </div>
                <h3 className="brands__name">{item.name}</h3>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

