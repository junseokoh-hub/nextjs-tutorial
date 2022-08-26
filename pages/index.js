import Seo from "../components/Seo";

function Home({ data }) {
  return (
    <div className="container">
      <Seo title={"Home"} />
      {data?.map((item) => (
        <div key={item.id} className="content">
          <img src={item.image} alt={item.description} />
          <h4>{item.title}</h4>
        </div>
      ))}
      <style jsx>{`
        .container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          padding: 20px;
          gap: 20px;
        }
        .content img {
          max-width: 20vw;
          height: 30vh;
          display: block;
          margin: 0 auto;
          border-radius: 12px;
          transition: transform 0.2s ease-in-out;
          box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
        }
        .content:hover img {
          transform: scale(1.05) translateY(-10px);
        }
        .content h4 {
          font-size: 18px;
          text-align: center;
        }
      `}</style>
    </div>
  );
}

export async function getServerSideProps() {
  const data = await (await fetch(`http://localhost:3000/api/products`)).json();
  return {
    props: {
      data,
    },
  };
}

export default Home;
