import React from 'react'

function About() {
    return (
        <div className='Lgin' style={{marginTop:'2vh'}}>

            <h1>About this project: </h1>

            <div className="about" >
                Hello everyone, I am Shashank Tripathi, i  want to be a Freelancer Wev-developer, well i have just started web development so ya i still have got a long way to go..
                This is a my first full stack project with backend and frontend.. i have used the following libraries,modules and servces while making this project..
                <ul>
                    <li>React js - for frontend</li>
                    <li>Express and Mongoose - for backend</li>
                    <li>Mongodb atlas - for database</li>
                    <li> Backend Hosting on Render(free service)</li>
                    <li> Frontend Hosting on GH-Pages(free service)</li>
                    <li>
                            <li>Many Other Miscellaneous concepts</li>
                        <ol>
                            <li>JWT-Webtoken Provider</li>
                            <li>Express-Validator - for validating requests</li>
                            <li>bcrypt-for encrypting and securing passwords</li>
                        </ol>

                    </li>
                </ul>
                It was Fun making this project so ya i hope you guys like it..<br/>
                <strong>Student at IIITN</strong><br/>
                <strong>2nd yr</strong>
            </div>
        </div>
    )
}

export default About