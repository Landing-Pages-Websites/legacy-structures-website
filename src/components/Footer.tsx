import Image from "next/image";
import { siteAssets } from "@/lib/site-assets";

const socialLinks = [
  { href: "https://www.facebook.com/BackyardOutfittersEnterprisesLLC/", img: siteAssets.footer.facebook, alt: "Facebook" },
  { href: "https://www.instagram.com/backyardoutfittersusa", img: siteAssets.footer.instagram, alt: "Instagram" },
  { href: "mailto:legacystructures25@gmail.com", img: siteAssets.footer.email, alt: "Email" },
];

const hours = [
  ["Monday", "By Appointment"],
  ["Tuesday", "9:00 to 5:00"],
  ["Wednesday", "By Appointment"],
  ["Thursday", "By Appointment"],
  ["Friday", "By Appointment"],
  ["Saturday", "By Appointment"],
  ["Sunday", "Closed"],
];

export default function Footer() {
  return (
    <footer className="legacy-footer">
      <div className="footer-call">
        <a href="tel:518-544-2889">
          Speak With a Shed Expert Today! <span>518-544-2889</span>
        </a>
      </div>

      <div className="footer-main">
        <div className="footer-col contact">
          <strong>Legacy Structures</strong>
          <div>3570 US 4</div>
          <div>Hudson Falls, NY 12839</div>
          <div>Main: <a href="tel:518-544-2889">518-544-2889</a></div>
          <div>Email: <a href="mailto:legacystructures25@gmail.com">legacystructures25@gmail.com</a></div>
          <div className="footer-socials">
            {socialLinks.map((s) => (
              <a key={s.alt} href={s.href} target={s.href.startsWith("http") ? "_blank" : undefined} rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}>
                <Image src={s.img.src} alt={s.alt} width={s.img.width} height={s.img.height} />
              </a>
            ))}
          </div>
        </div>

        <div className="footer-logo">
          <Image
            src={siteAssets.footer.dealerLogo.src}
            alt="Backyard Outfitters Authorized Dealer"
            width={siteAssets.footer.dealerLogo.width}
            height={siteAssets.footer.dealerLogo.height}
          />
        </div>

        <div className="footer-col hours">
          <strong>Business Hours</strong>
          {hours.map(([day, time]) => (
            <div key={day}>{day}: {time}</div>
          ))}
        </div>
      </div>

      <div className="footer-copy">©2026 Legacy Structures All Rights Reserved.</div>

      <style>{`
        .legacy-footer {
          background: #e9e6e1;
          color: #006580;
          font-family: Arial, Helvetica, sans-serif;
        }
        .footer-call {
          background: #006580;
          padding: 24px 20px 29px;
          text-align: center;
        }
        .footer-call a {
          color: #fff !important;
          font-family: var(--font-oswald), Impact, sans-serif;
          font-size: clamp(26px, 2.5vw, 42px);
          font-weight: 700;
          line-height: 1.05;
          text-decoration: none;
          text-transform: uppercase;
        }
        .footer-call span {
          color: #ffc400;
        }
        .footer-main {
          max-width: 1500px;
          margin: 0 auto;
          padding: 38px 24px 20px;
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          align-items: start;
          gap: 44px;
        }
        .footer-col {
          font-size: 18px;
          line-height: 1.48;
        }
        .footer-col strong {
          display: block;
          font-size: 18px;
          line-height: 1.2;
        }
        .footer-col a {
          color: #006580 !important;
          text-decoration: none;
        }
        .footer-socials {
          display: flex;
          gap: 10px;
          margin-top: 12px;
        }
        .footer-socials img {
          width: 34px;
          height: 34px;
          display: block;
        }
        .footer-logo {
          display: flex;
          justify-content: center;
          align-items: center;
          padding-top: 18px;
        }
        .footer-logo img {
          width: min(300px, 100%);
          height: auto;
        }
        .hours {
          justify-self: end;
          min-width: 300px;
        }
        .hours strong {
          text-transform: uppercase;
          margin-bottom: 4px;
        }
        .footer-copy {
          text-align: center;
          font-size: 16px;
          padding: 5px 20px 26px;
        }
        @media (max-width: 900px) {
          .footer-main {
            grid-template-columns: 1fr;
            text-align: center;
          }
          .footer-socials {
            justify-content: center;
          }
          .hours {
            justify-self: center;
            min-width: 0;
          }
        }
      `}</style>
    </footer>
  );
}
