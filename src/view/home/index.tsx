import Title from '../../Components/reuseable/title/inex.js';
import HeroSection from './hero-section/index.js';


export default function HomePage() {

    return (
        <div>
            <Title title="Home Section" subTitle="Why Choose Travic" className="text-center" />
            <HeroSection />
        </div >
    );
}

