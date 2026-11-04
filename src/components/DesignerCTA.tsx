import Link from "next/link";

export default function DesignerCTA() {
  return (
    <div className="bg-[#b12029]">
      <div className="max-w-[1150px] mx-auto flex flex-col md:flex-row justify-evenly items-center py-[20px] px-[20px]">
        <Link data-mega-cta="3d-designer"
          href="https://orders.barnportal.com/myquote?dealerid=&dir=1&template=1"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white font-heading font-bold text-[30px] md:text-[50px] uppercase text-center leading-tight no-underline hover:opacity-90 transition-opacity"
        >
          BUILD YOUR DREAM SHED! &ndash;{" "}
          <span className="text-[#FABE08]">CHECK OUT OUR 3D DESIGNER</span>
        </Link>
      </div>
    </div>
  );
}
