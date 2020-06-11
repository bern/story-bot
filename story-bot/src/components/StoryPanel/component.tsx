import React from "react";
import { StoryPage } from "../LandingPage/component";
import FlipPage from "react-flip-page";

interface PublicProps {
  username: string;
  pages: StoryPage[];
}

function StoryPanel(props: PublicProps) {
  const { pages, username } = props;

  /*const pages = [
    {
      text: "this is a test story",
      image:
        "https://dogtime.com/assets/uploads/2011/03/puppy-development-1280x720.jpg",
    },
    {
      text: "i hope you like it",
      image:
        "https://s3.amazonaws.com/cdn-origin-etr.akc.org/wp-content/uploads/2017/11/12193133/German-Shepherd-Puppy-Fetch-500x500.jpg",
    },
    {
      text: "flip me!",
      image: "https://i.ytimg.com/vi/Vp7nW2SP6H8/maxresdefault.jpg",
    },
  ];*/

  if (pages.length === 0) {
    return null;
  }

  const renderedPages = pages.map((page, i) => {
    return (
      <div
        key={i}
        style={{ display: "flex", position: "absolute", top: "10%" }}
      >
        {page.text && (
          <div style={{ width: "50%", alignSelf: "center" }}>{page.text}</div>
        )}
        {page.image && (
          <div style={{ width: "50%" }}>
            <img src={page.image} height={200} width={"50%"} />
          </div>
        )}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "-20%",
            height: "400px",
            borderLeft: "3px solid gray",
          }}
        />
      </div>
    );
  });

  return (
    <div>
      <h3>{username}'s Story:</h3>
      <div
        style={{
          display: "inline-block",
          border: "gray",
          borderWidth: "thick",
          borderStyle: "solid",
          borderRadius: "3px",
        }}
      >
        <FlipPage width={500} height={300} orientation={"horizontal"}>
          {renderedPages}
        </FlipPage>
      </div>
    </div>
  );
}

export default StoryPanel;
