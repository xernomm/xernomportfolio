import { CardFooter, Container, Row, Link } from "react-bootstrap"
import xernom from '../img/xernomm.png'
import * as I from 'react-bootstrap-icons'
export const Footer = () => {

    return (
        <>
        <div className="bg-dark col-12 footer p-5">
                <div >
                    <div className="d-lg-flex align-items-center justify-content-center">
                        <div className="col-lg-4 col-sm-12 px-4">
                            <img src={xernom} alt="" className="col-6" />
                            <hr />
                            <p className="text-white">
                                Sutera Elok 1 No. 2A, Alam Sutera <br />
                                Tangerang Selatan, Banten, Indonesia
                            </p>
                        </div>
                        <div className="col-lg-3 col-sm-12 px-4">
                            <div className="d-flex">
                            <ul className="col-6">
                                <li>
                                <p className="lead primary fw-bold sitemap ">
                                    Sitemap
                                 </p>
                                </li>
                                <li>
                                    <a href="#home" className=" text-white sitemap">Home</a>
                                </li>
                                <li>
                                    <a href="#intro" className=" text-white sitemap">Introduction</a>
                                </li>
                                <li>
                                    <a href="#about" className=" text-white sitemap">About</a>
                                </li>
                                <li>
                                    <a href="#experiences" className=" text-white sitemap">Experiences</a>
                                </li>
                                
                            </ul>
                            <ul className="col-6">
                                <li>
                                    <p className=" lead d-hidden">
                                        kosongan
                                    </p>
                                </li>
                                <li>
                                    <a href="#skills" className=" text-white sitemap">Skills</a>
                                </li>
                                <li>
                                    <a href="#projects" className=" text-white sitemap">Projects</a>
                                </li>
                                <li>
                                    <a href="#extras" className=" text-white sitemap">Extras</a>
                                </li>
                                <li>
                                    <a href="#connect" className=" text-white sitemap">Connect Me</a>
                                </li>
                            </ul>
                            </div>

                        </div>
                        <div className="col-lg-5 col-sm-12 px-4 justify-content-center d-flex align-items-center">
                        <div className="">
                            <div className="d-flex align-items-center mb-3">
                                <a className="mx-1 primary" href="https://www.linkedin.com/in/rafael-richie-502360250/" target="_blank"  rel="noreferrer"><I.Linkedin className="lead" /></a>
                                <a className="mx-1 primary" href="https://www.instagram.com/rfl_rchiee/" target="_blank"  rel="noreferrer"><I.Instagram className="lead" /></a>
                                <a className="mx-1 primary" href="https://www.tiktok.com/@raf_rchiee?is_from_webapp=1&sender_device=pc" target="_blank"  rel="noreferrer"><I.Tiktok className="lead" /></a>
                                <a className="mx-1 primary" href="https://github.com/xernomm" target="_blank"  rel="noreferrer"><I.Github className="lead" /></a>
                            </div>
                            <p className="text-white">
                                 &copy; Copyright <strong><span>Xernomm</span></strong>. All Rights Reserved
                            </p>
                        </div>
                        </div>
                    </div>
                </div>
        </div>

        </>
    )
}