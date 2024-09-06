import { useRef } from "react";
import { Transition, type TransitionStatus } from "react-transition-group";
import styled from "styled-components";

type Props = {
  isLoading: boolean;
};

function AppPageLoader({ isLoading }: Props) {
  const nodeRef = useRef<HTMLDivElement>(null);

  const defaultStyle = {
    transition: `opacity ${500}ms ease-in-out`,
    opacity: 0
  };

  const transitionStyles: Record<TransitionStatus, { opacity: number }> = {
    entering: { opacity: 1 },
    entered: { opacity: 1 },
    exiting: { opacity: 0 },
    exited: { opacity: 0 },
    unmounted: { opacity: 0 }
  };

  return (
    <Transition
      unmountOnExit={true}
      nodeRef={nodeRef}
      in={isLoading}
      timeout={500}
    >
      {(state) => (
        <Container
          ref={nodeRef}
          style={{
            ...defaultStyle,
            ...transitionStyles[state]
          }}
        >
          <img className="img" src="/images/app-loading.svg" alt="" />
        </Container>
      )}
    </Transition>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: fixed;
  width: 100%;
  height: 100%;
  padding: 4em;
  background-color: white;
  z-index: var(--z-sticky);
  pointer-events: none;

  .img {
    width: 100%;
    max-width: 420px;
  }
`;

export default AppPageLoader;
