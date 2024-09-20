import { config } from "core/config";
import styled from "styled-components";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

function LoginPage() {
  return (
    <div
      className="w-screen h-screen flex justify-center items-center bg-cover bg-center bg-no-repeat"
      style={{
        fontFamily: "IBM Plex Sans Thai, sans-serif",
        backgroundImage: "url('/imgs/AngkaewBG.svg')",
      }}
    >
      {/* PDF Viewer Section */}
      <div
        className="w-full lg:w-3/5 h-[90vh] mx-4 lg:mx-8 flex flex-col rounded-2xl overflow-auto border-4 border-gray-200 shadow-lg"
        style={{
          scrollbarWidth: "none", // Firefox
          msOverflowStyle: "none", // IE and Edge
        }}
      >
        <style>{`
          /* Hide scrollbar for Chrome, Safari, and Opera */
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>

        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
          <Viewer fileUrl="/imgs/LongPlan_Poster.pdf" />
        </Worker>
      </div>

      {/* Login Section */}
      <Container>
        <div className="flex flex-col items-center">
          <a
            className="flex relative justify-center items-center"
            href="https://sites.google.com/view/longplan/home?authuser=0"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Longplan Website"
          >
            <img
              src="/imgs/login_logo.png"
              alt="Longplan Logo"
              className="w-3/5 lg:w-full"
            />
          </a>
          <p className="mt-8 text-xl text-gray-700">ลงชื่อเข้าสู่ระบบ</p>

          <LoginBtn
            href={config.cmuOAuthUrl}
            target="_self"
            className="hover:scale-105 transition-all duration-300"
            aria-label="Login with CMU Account"
          >
            <img
              src="/imgs/login_sub_logo.png"
              alt="CMU emblem"
              className="object-scale-down w-8 flex-[1] mx-4"
              loading="lazy"
            />
            <div className="flex justify-center items-center border-l border-[#6869AC] h-full w-16 flex-[2] mr-4">
              <p className="font-normal text-2xl text-white">CMU Account</p>
            </div>
          </LoginBtn>
        </div>
      </Container>
    </div>
  );
}

export default LoginPage;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url("/imgs/login_book.svg");
  background-size: cover;
  background-position: center;
  padding: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 1rem;
  }
`;

const LoginBtn = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  margin-top: 1.5rem;
  padding: 0.5rem 0;
  max-width: 15em;
  height: 3.4em;
  width: 14em;
  font-size: 1.3em;
  border-radius: 10px;
  background: linear-gradient(90deg, #b1b1e7 0.83%, #6974d6 76.08%),
    var(--purple-5-purple, #6974d6);
  color: white;
  text-align: center;
  transition: background-color 0.3s ease-in-out, transform 0.3s ease-in-out;
  &:hover {
    transform: scale(1.05);
  }
  &:focus {
    outline: 2px solid #b1b1e7;
  }
`;
