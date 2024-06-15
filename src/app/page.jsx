
import Hero from "@/components/layout/Hero";
import HomeMenu from "@/components/layout/HomeMenu";
import SectionHeaders from "@/components/layout/SectionHeaders";

export default function Home() {
  return (
    <>
      <Hero />
      <HomeMenu />
      <section className="text-center my-16" id="about">
        <SectionHeaders subHeader={'Our story'} mainHeader={'About us'} />
        <div className="text-gray-500 max-w-md mx-auto mt-4 flex flex-col gap-4">
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. A illum iure perferendis ipsum excepturi, tenetur repellendus placeat provident nam adipisci facilis asperiores. Ex eos numquam nobis ipsam cumque? Minus, consequuntur</p>
          <p>iure perferendis ipsum excepturi, tenetur repellendus placeat provident nam adipisci facilis asperiores. Ex eos numquam nobis ipsam cumque Minus, consequuntur</p>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsa iusto doloremque cumque adipisci quasi placeat doloribus!</p>
        </div>
      </section>
      <section className="text-center my-8" id="contact">
        <SectionHeaders
          subHeader={'Don\'t hesitate'} mainHeader={'Contact'}
        />
        <div className="mt-8">
          <a href="tel:+45738123123" className="text-4xl underline text-gray-500">
            +46 738 123 123
          </a>
        </div>
      </section>
    </>
  );
}
