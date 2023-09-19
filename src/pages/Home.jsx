import imgUrl from '../assets/imgs/emailLogo.jpg'

export function Home() {
    return <section className="home">
        <h1>Welcome to my emails App</h1>
        <img src={imgUrl} alt="" />
    </section>
}
