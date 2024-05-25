
export default function SectionHeaders({ subHeader, mainHeader }) {
  return (
    <div>
      <h3 className="uppercase text-gray-500 font-semibold leading-4">{subHeader}</h3>
      <h3 className="text-primary text-4xl font-bold italic">{mainHeader}</h3>
    </div>
  )
}
