import { Link, Route, HashRouter as Router, Routes } from 'react-router-dom';

import { Home } from './pages/Home'
import { About } from './pages/About';

import { AppFooter } from './cmps/AppFooter'
import { AppHeader } from './cmps/AppHeader'
import { AboutVision } from './cmps/AboutVision';
import { AboutTeam } from './cmps/AboutTeam'
import { EmailDetails } from './pages/EmailDetails';
import { EmailIndex } from './pages/EmailIndex';
import { EmailCompose } from './pages/EmailCompose';
import { UserMsg } from './cmps/UserMsg';


export function App() {

    return (
        <Router>
            <section className='main-app'>
                <AppHeader />

                <main className='container-main-app'>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} >
                            <Route path="/about/team" element={<AboutTeam />} />
                            <Route path="/about/vision" element={<AboutVision />} />
                        </Route>

                        <Route path="/email" element={<EmailIndex />} >
                            <Route path="/email/compose/:emailId?" element={<EmailCompose />} />
                        </Route>
                        <Route path="/email/:emailId" element={<EmailDetails />} />
                        {/* <Route path="/email/compose" element={<EmailCompose />} /> */}
                    </Routes>
                </main>
                <UserMsg/>
                <AppFooter />
            </section>
        </Router>


    )
}
