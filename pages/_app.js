import Navbar from "../components/NavBar";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
      <style jsx global>
        {`
          * {
            padding: 0;
            margin: 0;
            list-style: none;
            box-sizing: border-box;
          }
          body {
            background-color: teal;
          }
          a {
            color: white;
          }
        `}
      </style>
    </>
  );
}
