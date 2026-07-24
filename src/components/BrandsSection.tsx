import Image from "next/image";
import hondaImage from "@/assets/img/honda.png";
import itauImage from "@/assets/img/itau.png";

type BrandsCopy = {
  eyebrow: string;
  title: string;
  items: readonly {
    name: string;
    description: string;
  }[];
};

const brandImages = {
  Honda: hondaImage,
  Itau: itauImage,
};

export function BrandsSection({ copy }: { copy: BrandsCopy }) {
  return (
    <section className="brands" aria-labelledby="brands-title">
      <div className="brands__inner">
        <div className="brands__header">
          <p className="brands__eyebrow">{copy.eyebrow}</p>
          <h2 className="brands__title" id="brands-title">
            {copy.title}
          </h2>
        </div>
        <div className="brands__list">
          {copy.items.map((item) => (
            <article className="brands__item" key={item.name}>
              <div className="brands__media">
                <Image
                  className="brands__image"
                  src={brandImages[item.name as keyof typeof brandImages]}
                  alt={`${item.name} visual work preview`}
                  width={brandImages[item.name as keyof typeof brandImages].width}
                  height={brandImages[item.name as keyof typeof brandImages].height}
                  sizes="(max-width: 640px) 100vw, 24vw"
                />
              </div>
              <h3 className="brands__name">{item.name}</h3>
              <p className="brands__description">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
