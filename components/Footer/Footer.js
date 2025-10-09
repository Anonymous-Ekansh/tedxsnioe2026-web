import Link from 'next/link'
import './Footer.scss'
import { usePathname } from "next/navigation";
import Image from 'next/image';

export default function Footer() {
  const pathName = usePathname();
  const scrollTo = async (id) => {
    if (pathName !== '/') {
        await router.push('/');
        const element = document.getElementById(id);
        element.scrollIntoView({
            behavior: "smooth",
            block: "start",
            inline: "nearest",
        });
    } else {
        const element = document.getElementById(id);
        element.scrollIntoView({
            behavior: "smooth",
            block: "start",
            inline: "nearest",
        });
    }

};
  return (
    <div className="Footer">
      <div className="Footer__header">
        <p className="Footer__header--text">WANNA ATTEND ?</p>
        <p className="Footer__header--desc">Register or contact us</p>
        <div className="Footer__header--buttons">
        <Link href='/register'>
          <button className="Footer__header--buttons__register">Register</button>
          </Link>
          <Link href='/contact'>
            <button className="Footer__header--buttons__contact">Contact Us</button>
          </Link>
        </div>
      </div>
      <div className="Footer__below">
        <div className="Footer__below--sections">
          <Link href='/'><p className="Footer__below--sections__item">Home</p></Link>
          <Image className="Footer__below--sections__divider" src="/Images/Footer/circle.png" alt="Divider" width={20} height={20} />
          <p onClick={() => scrollTo("about")} className="Footer__below--sections__item">About Us</p>
          <Image className="Footer__below--sections__divider" src="/Images/Footer/circle.png" alt="Divider" width={20} height={20} />
          <Link href='/'><Image className="Footer__below--sections__logo" src="/Images/Assets/image 2.png" alt="Logo" width={50} height={50} /></Link>
          <Image className="Footer__below--sections__divider" src="/Images/Footer/circle.png" alt="Divider" width={20} height={20} />
          <Link href='/pastConferences'><p className="Footer__below--sections__item">Past Conferences</p></Link>
          <Image className="Footer__below--sections__divider" src="/Images/Footer/circle.png" alt="Divider" width={20} height={20} />
          <p onClick={() => scrollTo("sponsors")} className="Footer__below--sections__item">Sponsors</p>
        </div>
        <div className="Footer__below--logo">
          <Image 
            src="/Images/TEDx logo - Black.png" 
            alt="TEDx Logo" 
            width={200} 
            height={100} 
            quality={95}
            priority
            style={{
              objectFit: 'contain',
              objectPosition: 'center'
            }}
          />
        </div>
        <div className="Footer__below--social">
            <a href={"https://www.linkedin.com/company/tedx-snioe/"}>
                <Image src="/Images/Footer/linkedin.png" alt="LinkedIn" width={30} height={30} />
            </a>
            <a href={"https://www.instagram.com/tedxshivnadaruniversity/"}>
                <Image src="/Images/Footer/insta.png" alt="Instagram" width={30} height={30} />
            </a>
            <a href={"https://facebook.com/tedxshivnadaruniversity"}>
                <Image src="/Images/Footer/fb.png" alt="Facebook" width={30} height={30} />
            </a>
        </div>
      </div>
    </div>
  )
}