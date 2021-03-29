import React from 'react'
import Link from 'next/link'

var year = new Date().getFullYear()

const OurFooter = () => (
    <>
        <div id="FooterContent">
            <div id="CompanyInfo">
                <h5>Orange Jacket</h5>
                <ul>
                    <li>
                        <Link href="/about">
                            <a>About</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/etc">
                            <a>ETC</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/somelink">
                            <a>Somelink</a>
                        </Link>
                    </li>
                </ul>
            </div>
            
            <div id="SupportInfo">
                <h5>Help &amp; Support</h5>
                <ul>
                    <li>
                        <Link href="/help">
                            <a>Help</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/faq">
                            <a>FAQ</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/refunds">
                            <a>Refunds</a>
                        </Link>
                    </li>
                </ul>
            </div>
            
            <div id="SocialMedia">
                <h5>Social Media</h5>
                <ul>
                    <li>
                        <Link href="companytwitterlink">
                            <a>Twitter</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="companyfacebooklink">
                            <a>Facebook</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="companyinstagramlink">
                            <a>Instagram</a>
                        </Link>
                    </li>
                </ul>
            </div>
            <div id="legal">
                <small>&copy; {year}, Orange Jacket Inc. All Rights Reserved</small>
            </div>
        </div>
        <style jsx>{`
            #FooterContent {
                padding-top: 10px;
                padding-bottom: 10px;
                bottom: 0;
                width: 100%;
                display: flex;               
                justify-content: center;
                align-items: center;
                flex-wrap: wrap;
                background-color: #63D8F2;
            }

            #FooterContent #CompanyInfo, #SupportInfo, #SocialMedia {
                margin: 10px;
                padding: 10px;
                width: 200px;
            }

            #legal {
                width: 250px;
            }

            div div ul {
                list-style-type: none;
                margin: 0;
                padding: 0;
            }

            div div ul li {
                margin: 3px;
            }

            a:link {
                text-decoration: none;
                color: black;
            }

            a:hover {
                color: orange;
            }
        `}</style>
    </>
)

export default OurFooter