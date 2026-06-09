import { usePathname } from "next/navigation";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import "./Navbar.scss";
import { useRouter } from "next/router";


function Navbar({ isSmall = false }) {
    const [navState, setNavState] = useState(false);
    const pathName = usePathname();
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const router = useRouter();
    useEffect(() => {
        setNavState(false);
    }, [pathName]);

    useEffect(() => {
        if (window.innerWidth <= 960) {
            setIsSmallScreen(true);
        } else {
            setIsSmallScreen(false);
        }

        window.addEventListener("hashchange", () => {
            setHash(window.location.hash);
        });
        return () => {
            window.removeEventListener("hashchange", () => { });
        };
    });

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
        <nav
            className={`NavbarWrapper ${isSmallScreen ? "NavbarWrapper--small" : ""}`}
        >
            <div className="NavbarContainer">
                <div className="NavbarContainer__AlwaysOnTop">
                    <div className="NavbarContainer__Logo">
                        <Link href="/" aria-label="Go to Home Page">
                            <Image
                                src='/Images/TEDx logo - White.png'
                                alt="TEDx Logo"
                                width={isSmall ? 80 : 300}
                                height={isSmall ? 40 : 60}
                                priority
                                quality={95}
                                style={{
                                    objectFit: 'contain',
                                    objectPosition: 'center'
                                }}
                            />
                        </Link>
                    </div>
                    {isSmallScreen && (
                        <button
                            className="NavbarContainer__Hamburger"
                            aria-controls="Primary Navigation Menu"
                            aria-expanded={navState}
                            onClick={() => setNavState(!navState)}
                        >
                            <svg
                                stroke="red"
                                fill="none"
                                className="NavbarContainer__Hamburger--svg"
                                viewBox="-10 -10 120 120"
                                width="40"
                            >
                                <path
                                    className="NavbarContainer__Hamburger--line"
                                    style={{
                                        strokeWidth: "10",
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round",
                                    }}
                                    d="m 20 40 h 60 a 1 1 0 0 1 0 20 h -60 a 1 1 0 0 1 0 -40 h 30 v 70"
                                ></path>
                            </svg>
                        </button>
                    )}
                </div>
                <div className="NavbarContainer__Menu">
                    <ul
                        className={`NavbarContainer__Menu--list ${navState ? "NavbarContainer__Menu--list-open" : ""
                            }`}
                    >
                        <li
                            className={`${pathName === "/"
                                ? "NavbarContainer__Menu--list-activeItem"
                                : "NavbarContainer__Menu--list-item"
                                }`}
                        >
                            <p style={{ color: "white" }}>
                                <Link style={{ color: "white" }} href="/">Home</Link>
                            </p>
                        </li>
                        <li
                            className={`${pathName === "/events"
                                ? "NavbarContainer__Menu--list-activeItem"
                                : "NavbarContainer__Menu--list-item"
                                }`}
                        >
                            <p style={{ color: "white" }}
                                onClick={() => scrollTo("about")}
                            >About Us</p>
                        </li>
                        <li
                            className={`${pathName === "/gallery"
                                ? "NavbarContainer__Menu--list-activeItem"
                                : "NavbarContainer__Menu--list-item"
                                }`}
                        >
                            <p style={{ color: "white" }}
                                onClick={() => scrollTo("sponsors")}
                            >Sponsors</p>
                        </li>
                        <li
                            className={`${pathName === "/pastConferences"
                                ? "NavbarContainer__Menu--list-activeItem"
                                : "NavbarContainer__Menu--list-item"
                                }`}
                        >
                            <p style={{ color: "white" }}>
                                <Link style={{ color: "white" }} href="/pastConferences">Past Conferences</Link>
                            </p>
                        </li>

                        <li
                            className={`${pathName === "/aboutqissa"
                                ? "NavbarContainer__Menu--list-activeItem"
                                : "NavbarContainer__Menu--list-item"
                                }`}
                        >
                            <p style={{ color: "white" }}>
                                <Link style={{ color: "white" }} href="/aboutqissa">About Qissa</Link>
                            </p>
                        </li>

                        <li
                            className={`${pathName === "/contact"
                                ? "NavbarContainer__Menu--list-activeItem"
                                : "NavbarContainer__Menu--list-item"
                                }`}
                        >
                            <p style={{ color: "white" }}>
                                <Link style={{ color: "white" }} href="/contact">Contact Us</Link>
                            </p>
                        </li>

                        <li
                            className={`${pathName === "/register"
                                ? "NavbarContainer__Menu--list-activeItem"
                                : "NavbarContainer__Menu--list-item"
                                }`}
                        >
                            <p style={{ color: "white" }}>
                                <Link style={{ color: "red", fontWeight: "medium" }} href="/register">Register</Link>
                            </p>
                        </li>
                    </ul>
                </div>
                <div className="NavbarContainer__topRightLogo">
                    <Link href="/" aria-label="Go to Home Page">
                        <Image
                            src='/Images/Assets/mosaic-logo.svg'
                            alt="Mosaic Logo"
                            width={isSmall ? 20 : 40}
                            height={isSmall ? 20 : 40}
                            priority
                        />
                    </Link>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
