import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { useAudio } from '../../providers/AudioProvider';
import { GiSpeaker, GiSpeakerOff } from "react-icons/gi";
const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    height: calc(100svh - 61px);
    position: relative;
`;
const SpeakerIcon = styled.div`
    position: absolute;
    right: 10px;
    bottom: 10px;
    font-size: 32px;
    background-color: #59B54E;
    color: white;
    font-weight: 900;
    cursor: pointer;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
`;
export default function Layout() {
  const { isMuted, toggleMute } = useAudio();
  return (
    <>
      <NavBar></NavBar>
      <Container>
        <Outlet />
          {/* <SpeakerIcon onClick={toggleMute}>
            {isMuted ? <GiSpeakerOff /> : <GiSpeaker />}
          </SpeakerIcon> */}
      </Container>
    </>
  );
}
