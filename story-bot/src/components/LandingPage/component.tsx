import React, { useState } from "react";
import { Button } from "react-bootstrap";
import ActivatePanel from "../ActivatePanel/component";
import StoryPanel from "../StoryPanel/component";

export const STORYBOT_SERVER_URL = "http://localhost:5000";

export interface StoryResponse {
  username?: string;
  story?: StoryPage[];
}

export interface StoryPage {
  text?: string;
  image?: string;
}

function LandingPage() {
  const [username, setUsername] = useState("");
  const [isActivated, setActivated] = useState(false);
  const [story, setStory] = useState({} as StoryResponse);

  return (
    <div
      style={{
        marginLeft: "20%",
        marginRight: "20%",
        textAlign: "center",
        paddingTop: "3rem",
      }}
    >
      <h2>Welcome to Storybot!</h2>
      <div style={{ marginTop: "1rem" }}>
        Engage your chat and build an interactive storybook while you stream!
        Just type your Twitch Username into the text box below and click the
        <strong>"Activate"</strong> button to get started!
      </div>
      <div style={{ marginTop: "1rem" }}>
        <ActivatePanel
          username={username}
          setUsername={setUsername}
          isActivated={isActivated}
          setActivated={setActivated}
          setStory={setStory}
        />
      </div>
      <div style={{ marginTop: "1rem", textAlign: "center" }}>
        <StoryPanel pages={story.story || []} username={story.username || ""} />
      </div>
    </div>
  );
}

export default LandingPage;
