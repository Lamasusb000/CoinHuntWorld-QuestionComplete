import React, { useEffect } from "react"
import "../components/CSS/Footer.css"
import Theme from "../../site/settings/Theme.json"
import Links from "../../site/settings/HeaderLinks.json"

import "../components/CSS/SpecialFormats.css"

function Footer() {
    
    React.useEffect(() => {
		
        window.addEventListener(
            "resize",
            () => {
                var ismobile = window.innerWidth < 900
                if (ismobile !== isMobile) setIsMobile(ismobile)
            },
            false
        )
    }, [isMobile])
    return (
        <div
            className="Footer-Container"
            style={{
                backgroundColor: `${Theme.FooterColor}`,
                color: `${Theme.TextColor}`,
                fontFamily: `${Theme.Font}`,
            }}
        >
            <div className="Left-Column">
                <h4>Social Medias</h4>
                <div className="d-flex flex-row justify-content-between">
                    <a
                        className="text-white SocialMediaTwitter d-flex flex-row justify-content-center"
                        href={Links.LinkSet[0].LinkURL}
                    >
                        <svg
                            aria-hidden="true"
                            focusable="false"
                            data-prefix="fab"
                            data-icon="twitter"
                            className="svg-inline--fa fa-twitter SocialsIcon"
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                        >
                            <path
                                fill="currentColor"
                                d="M459.4 151.7c.325 4.548 .325 9.097 .325 13.65 0 138.7-105.6 298.6-298.6 298.6-59.45 0-114.7-17.22-161.1-47.11 8.447 .974 16.57 1.299 25.34 1.299 49.06 0 94.21-16.57 130.3-44.83-46.13-.975-84.79-31.19-98.11-72.77 6.498 .974 12.99 1.624 19.82 1.624 9.421 0 18.84-1.3 27.61-3.573-48.08-9.747-84.14-51.98-84.14-102.1v-1.299c13.97 7.797 30.21 12.67 47.43 13.32-28.26-18.84-46.78-51.01-46.78-87.39 0-19.49 5.197-37.36 14.29-52.95 51.65 63.67 129.3 105.3 216.4 109.8-1.624-7.797-2.599-15.92-2.599-24.04 0-57.83 46.78-104.9 104.9-104.9 30.21 0 57.5 12.67 76.67 33.14 23.72-4.548 46.46-13.32 66.6-25.34-7.798 24.37-24.37 44.83-46.13 57.83 21.12-2.273 41.58-8.122 60.43-16.24-14.29 20.79-32.16 39.31-52.63 54.25z"
                            ></path>
                        </svg>
                    </a>
                    <a
                        className="text-white SocialMediaDiscord d-flex flex-row justify-content-center"
                        href={Links.LinkSet[1].LinkURL}
                    >
                        <svg
                            aria-hidden="true"
                            focusable="false"
                            data-prefix="fab"
                            data-icon="discord"
                            className="svg-inline--fa fa-discord SocialsIcon"
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 640 512"
                        >
                            <path
                                fill="currentColor"
                                d="M524.5 69.84a1.5 1.5 0 0 0 -.764-.7A485.1 485.1 0 0 0 404.1 32.03a1.816 1.816 0 0 0 -1.923 .91 337.5 337.5 0 0 0 -14.9 30.6 447.8 447.8 0 0 0 -134.4 0 309.5 309.5 0 0 0 -15.14-30.6 1.89 1.89 0 0 0 -1.924-.91A483.7 483.7 0 0 0 116.1 69.14a1.712 1.712 0 0 0 -.788 .676C39.07 183.7 18.19 294.7 28.43 404.4a2.016 2.016 0 0 0 .765 1.375A487.7 487.7 0 0 0 176 479.9a1.9 1.9 0 0 0 2.063-.676A348.2 348.2 0 0 0 208.1 430.4a1.86 1.86 0 0 0 -1.019-2.588 321.2 321.2 0 0 1 -45.87-21.85 1.885 1.885 0 0 1 -.185-3.126c3.082-2.309 6.166-4.711 9.109-7.137a1.819 1.819 0 0 1 1.9-.256c96.23 43.92 200.4 43.92 295.5 0a1.812 1.812 0 0 1 1.924 .233c2.944 2.426 6.027 4.851 9.132 7.16a1.884 1.884 0 0 1 -.162 3.126 301.4 301.4 0 0 1 -45.89 21.83 1.875 1.875 0 0 0 -1 2.611 391.1 391.1 0 0 0 30.01 48.81 1.864 1.864 0 0 0 2.063 .7A486 486 0 0 0 610.7 405.7a1.882 1.882 0 0 0 .765-1.352C623.7 277.6 590.9 167.5 524.5 69.84zM222.5 337.6c-28.97 0-52.84-26.59-52.84-59.24S193.1 219.1 222.5 219.1c29.67 0 53.31 26.82 52.84 59.24C275.3 310.1 251.9 337.6 222.5 337.6zm195.4 0c-28.97 0-52.84-26.59-52.84-59.24S388.4 219.1 417.9 219.1c29.67 0 53.31 26.82 52.84 59.24C470.7 310.1 447.5 337.6 417.9 337.6z"
                            ></path>
                        </svg>
                    </a>
                    <a
                        className="text-white SocialMediaEmail d-flex flex-row justify-content-center"
                        href={Links.LinkSet[2].LinkURL}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                            focusable="false"
                            data-prefix="far"
                            data-icon="envelope"
                            class="svg-inline--fa fa-envelope fa-w-16 SocialsIcon"
                            role="img"
                            viewBox="0 0 512 512"
                        >
                            <path
                                fill="currentColor"
                                d="M464 64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V112c0-26.51-21.49-48-48-48zm0 48v40.805c-22.422 18.259-58.168 46.651-134.587 106.49-16.841 13.247-50.201 45.072-73.413 44.701-23.208.375-56.579-31.459-73.413-44.701C106.18 199.465 70.425 171.067 48 152.805V112h416zM48 400V214.398c22.914 18.251 55.409 43.862 104.938 82.646 21.857 17.205 60.134 55.186 103.062 54.955 42.717.231 80.509-37.199 103.053-54.947 49.528-38.783 82.032-64.401 104.947-82.653V400H48z"
                            />
                        </svg>
                    </a>
                </div>
            </div>
            <hr className="HiddenByWidth" />
            <div className="Right-Column">
                <h3>Disclaimer</h3>
                <p className="">
                    This is a Community project. There is no offical association
                    between the Game developers and this site. All questions are
                    submitted via the community and are not guarenteed 100%
                    correct. Any Issues please reach out via social media to
                    express your concerns
                </p>
            </div>
        </div>
    )
}

export default Footer
