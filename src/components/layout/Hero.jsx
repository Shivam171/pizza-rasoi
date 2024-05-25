import Image from "next/image"
import Right from "../icons/Right"

export default function Hero() {
  return (
    <section className="hero mt-4">
      <div className="py-12">
        <h1 className="text-4xl font-semibold">Where Tradition Meets <span className="text-primary">Pizza</span></h1>
        <p className="my-6 text-gray-500 text-sm">Experience the perfect fusion of Indian traditions and Italian flavors at Pizza Rasoi, where every slice delights</p>
        <div className="flex gap-4 text-sm">
          <button className="bg-primary uppercase flex items-center gap-2 text-white px-4 py-2 rounded-full  justify-center">Order Now <Right /></button>
          <button className="justify-start flex items-center gap-2 text-gray-600 font-semibold border-0">Learn More <Right /></button>
        </div>
      </div>
      <div className="relative">
        <Image src={'/pizza.png'} layout="fill" objectFit={'contain'} alt={'pizza'} className="animate-slow-spin" />
      </div>
    </section>
  )
}
