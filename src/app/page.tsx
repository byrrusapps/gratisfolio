import { Fragment } from "react";
import Home from "./(home)/main";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gratisfolio – Free Resume Builder",
  description:
    "Design your resume in minutes using Gratisfolio’s free, modern templates. ATS-friendly and fully customizable.",
  openGraph: {
    title: "Gratisfolio – Free Resume Builder",
    description:
      "Create resumes that get noticed. 100% free and open source.",
    url: "https://gratisfolio.web.app",
    images: ["/og-image.png"],
  },
};


const Page = () => {

return(
<Fragment>
<Home
/>
</Fragment>
);

}

export default Page;