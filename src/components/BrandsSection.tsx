type BrandsCopy = {
  eyebrow: string;
  title: string;
  items: readonly {
    name: string;
    description: string;
  }[];
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
              <h3 className="brands__name">{item.name}</h3>
              <p className="brands__description">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
