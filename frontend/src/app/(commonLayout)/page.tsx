import { Hero } from "@/src/components/modules/Home/Hero";
import Specialities from "@/src/components/modules/Home/Specialties";
import Steps from "@/src/components/modules/Home/Steps";
import Testimonials from "@/src/components/modules/Home/Testimonials";
import TopRatedDoctors from "@/src/components/modules/Home/TopRatedDoctors";

export default function Home() {
  return (
    <>
      <Hero />
      <Specialities />
      <TopRatedDoctors />
      <Steps />
      <Testimonials />
    </>
  );
}
