import React, { useState } from "react";
import { Button, Form, Row } from "react-bootstrap";
import {
  STORYBOT_SERVER_URL,
  StoryResponse,
  StoryPage,
} from "../LandingPage/component";
import "./styles.css";

interface PublicProps {
  username: string;
  isActivated: boolean;
  setUsername: (arg0: string) => void;
  setActivated: (arg0: boolean) => void;
  setStory: (arg0: StoryResponse) => void;
}

function ActivatePanel(props: PublicProps) {
  const [hasNoUsernameError, setNoUsernameError] = useState(false);

  const { username, isActivated, setUsername, setActivated, setStory } = props;

  if (!isActivated) {
    return (
      <>
        <Row style={{ justifyContent: "center" }}>
          <Form.Group style={{ marginBottom: 0 }}>
            <Form.Control
              isInvalid={hasNoUsernameError}
              placeholder={"Twitch username..."}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </Form.Group>
          <Button
            className={`button`}
            style={{
              marginLeft: "1rem",
            }}
            onClick={() => {
              if (username.length === 0) {
                setNoUsernameError(true);
                return;
              } else {
                setNoUsernameError(false);
              }
              activate(username);
              setActivated(true);
            }}
          >
            Activate
          </Button>
        </Row>
        {isActivated && <div>We're rollin!</div>}
      </>
    );
  } else {
    return (
      <div>
        Storybot is recording a story from {username}'s chat!
        <div style={{ marginTop: "0.5rem" }}>
          <Button
            className={`button`}
            onClick={() => {
              deactivate(username, setStory);
              setActivated(false);
            }}
          >
            Stop Recording
          </Button>
        </div>
      </div>
    );
  }
}

async function activate(username: string) {
  const resp = await fetch(
    `${STORYBOT_SERVER_URL}/story/start/${escape(username)}`
  );
  console.log(resp);
}

async function deactivate(
  username: string,
  setStory: (arg0: StoryResponse) => void
) {
  let storyResponse: StoryResponse;
  try {
    const resp = await fetch(
      `${STORYBOT_SERVER_URL}/story/stop/${escape(username)}`
    );
    storyResponse = (await resp.json()) as StoryResponse;
  } catch (err) {
    throw new Error(`Deactivating storybot failed! err=${err.message}`);
  }

  console.log(storyResponse);

  if (!storyResponse.story || !storyResponse.username) {
    return null;
  }
  setStory(storyResponse);

  return null;
}

export default ActivatePanel;
