import SignupButton from "../components/buttons/SignupButton";
import LoginButton from "../components/buttons/LoginButton";
import Footer from "../components/Footer";

const Home = () => (
  <>

    <div className="container mx-auto pt-20 min-h-screen flex flex-col justify-between">

      <div>
        <div className="flex flex-col w-full justify-center">
          <h1 className="my-4 text-3xl md:text-5xl text-white-600 font-bold leading-tight text-center md:text-left slide-in-bottom-h1">¿Quieres organizar las actividades de tus docentes?</h1>
          <p className="leading-normal text-base md:text-2xl mb-8 text-center md:text-left slide-in-bottom-subtitle">Asigna funciones sustantivas y cursos a los docentes de tu Programa Académico</p>


          <div className="flex gap-10 items-center justify-center mb-10">
            <LoginButton />
            <SignupButton />
          </div>

        </div>
      </div>

      <Footer />

    </div>

  </>
);

export default Home;
