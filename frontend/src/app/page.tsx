import { redirect } from "next/navigation";
// import DarkModeHome from "./DarkModeHome";
// import { IntroAnimation } from "./home/components/Intro-animation";

export default function Home() {
  return redirect("/home");
  // <>
  //   <DarkModeHome />
  //   <IntroAnimation onDone={() => { }} />
  // </>
}
