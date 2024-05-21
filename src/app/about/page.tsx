import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About UpVoteMe",
};

type AboutData = {
  createdAt: string;
  text: string;
  id: number;
};

export default async function Page() {
  const url = `${process.env.API_ROUTE}/api/about`;
  const aboutData: AboutData[] = await fetch(url).then((res) => res.json());

  return (
    <>
      <p className="text-center text-5xl my-12">About UpVoteMe</p>

      <div className="flex flex-col items-center gap-10">
        {aboutData?.map((item) => {
          return (
            <p key={item.id} className="max-w-4xl text-center">
              {item.text}
            </p>
          );
        })}
      </div>
    </>
  );
}
