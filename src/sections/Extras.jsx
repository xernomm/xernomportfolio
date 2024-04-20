import { Container, Row } from "react-bootstrap"
import ml from '../img/mobilejen2.png'
import music from '../img/music.png'
import ps from '../img/photo.png'

export const Extras = () => {
    return (
        <>
        <Container>
            <Row>
                <div className="pt-5">
                    <h1 className="primary display-3 fw-bold">
                        Extras
                    </h1>
                    <hr />
                    <p className="lead text-white mt-4">
                        Besides of coding, i have several hobbies that helps me enhance my critical thinking skills and creativity.
                    </p>
                    <div className="d-lg-flex justify-content-center align-items-center mt-5">
                        <div className="col-lg-6 col-sm-12 smNone">
                            <img src={ml} alt="" className="col-10 aboutMeImg" />
                        </div>
                        <div className="col-lg-6 col-sm-12 ">
                            <h1 className="display-5 primary">
                                Games
                            </h1>
                            <br />
                            <p className="text-white lead">As a hardworking learner, I have several hobbies and interests myself. As I mentioned earlier, I am an active gaming content creator, passionate about making entertaining videos and images for my viewers.</p>
                            <p className="lead text-white">Gaming has always been a significant part of my life, particularly the game "Mobile Legends," which has captured my interest and fueled my creativity.</p>
                        </div>
                    </div>
                    <br />
                    <div className="d-lg-flex justify-content-center align-items-center mt-5">
                        <div className="col-lg-6 col-sm-12 pe-5">
                            <h1 className="display-5 primary">
                                Music
                            </h1>
                            <br />
                            <p className="text-white lead">In addition to gaming, I have a love for music. I enjoy playing the piano and guitar, and I often find myself singing along. Although I have composed a few songs of my own, I must admit that I never quite memorized them.</p>
                            <p className="text-white lead">Nonetheless, music remains an important outlet for me to express myself and find inspiration. Through my hobbies and interests, I strive to bring joy and entertainment to others while continuously exploring new avenues for creativity.</p>
                        </div>
                        <div className="col-lg-6 col-sm-12 smNone">
                            <img src={music} alt="" className="col-10 aboutMeImg" />
                        </div>
                    </div>
                    <br />
                    <div className="d-lg-flex justify-content-center align-items-center mt-5">
                        <div className="col-lg-6 col-sm-12 smNone">
                            <img src={ps} alt="" className="col-10 aboutMeImg" />
                        </div>
                        <div className="col-lg-6 col-sm-12 ">
                            <h1 className="display-5 primary">
                                Photo Editing
                            </h1>
                            <br />
                            <p className="text-white lead">Aside from that, I have a strong passion for editing photos and videos. It allows me to unleash my creativity, transforming ordinary moments into extraordinary visual experiences. I love experimenting with various techniques, enhancing colors, adjusting compositions, and adding captivating effects to create stunning visuals.</p>
                            <p className="lead text-white">Editing photos and videos is my artistic outlet, where I continuously strive to improve and captivate viewers with engaging storytelling through visuals. And for the record, I design this portfolio myself.</p>
                        </div>
                    </div>
                </div>
            </Row>
        </Container>
        </>
    )
}