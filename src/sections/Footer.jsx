import xernom from '../img/xernomm.png'
import * as I from 'react-bootstrap-icons'
import Tooltip from '@mui/material/Tooltip';

export const Footer = () => {
    return (
        <>
        <div className="bg-dark col-12 footer p-5">
            <div className="d-lg-flex align-items-center justify-content-center">
                <div className="col-lg-3 col-sm-12 px-4">
                    <img src={xernom} alt="" className="col-6" />
                    <hr />
                    <p className="text-white">
                        Sutera Elok 1 No. 2A, Alam Sutera <br />
                        Tangerang Selatan, Banten, Indonesia
                    </p>
                </div>

                <div className="col-lg-3 col-sm-12 px-4">
                    <div className="">
                        <p className="lead primary fw-bold sitemap">Sitemap</p>
                        <div className="d-flex flex-wrap">
                            <ul className="col-6 list-unstyled">
                                <li><a href="#home" className="text-white sitemap">Home</a></li>
                                <li><a href="#educations" className="text-white sitemap">Education</a></li>
                                <li><a href="#experiences" className="text-white sitemap">Experiences</a></li>
                                <li><a href="#skills" className="text-white sitemap">Skills</a></li>
                            </ul>
                            <ul className="col-6 list-unstyled">
                                <li><a href="#projects" className="text-white sitemap">Projects</a></li>
                                <li><a href="#certifications" className="text-white sitemap">Certificates</a></li>
                                <li><a href="#about" className="text-white sitemap">Ask Me</a></li>
                                <li><a href="#connect" className="text-white sitemap">Connect Me</a></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="col-lg-5 col-sm-12 px-4 justify-content-center d-flex align-items-center">
                    <div>
                        <div className="d-flex align-items-center mb-3">
                              <Tooltip title="Rafael's LinkedIn">
                                  <a className=" mx-1 primary" href="https://www.linkedin.com/in/rafael-richie-502360250/" target="_blank" rel="noreferrer">
                                      <I.Linkedin className="lead" />
                                  </a>
                              </Tooltip>

                              <Tooltip title="Rafael's Instagram">
                                  <a className=" mx-1 primary" href="https://www.instagram.com/rfl_rchiee/" target="_blank" rel="noreferrer">
                                      <I.Instagram className="lead" />
                                  </a>
                              </Tooltip>

                              <Tooltip title="Rafael's TikTok">
                                  <a className=" mx-1 primary" href="https://www.tiktok.com/@raf_rchiee?is_from_webapp=1&sender_device=pc" target="_blank" rel="noreferrer">
                                      <I.Tiktok className="lead" />
                                  </a>
                              </Tooltip>

                              <Tooltip title="Rafael's WhatsApp">
                                  <a className=" mx-1 primary" href="https://wa.me/6281284300979" target="_blank" rel="noreferrer">
                                      <I.Whatsapp className="lead" />
                                  </a>
                              </Tooltip>

                              <Tooltip title="Rafael's GitHub">
                                  <a className=" mx-1 primary" href="https://github.com/xernomm" target="_blank" rel="noreferrer">
                                      <I.Github className="lead" />
                                  </a>
                              </Tooltip>
                        </div>
                        <p className="text-white mb-0">
                            &copy; Copyright <strong><span>Xernomm</span></strong>. All Rights Reserved
                        </p>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
