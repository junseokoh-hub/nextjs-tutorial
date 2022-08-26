import Link from "next/link";
import { useRouter } from "next/router";
import Seo from "../components/Seo";

export default function Home({ data }) {
  const router = useRouter();
  const onClick = (id, title) => {
    router.push(`/item/${title}/${id}`);
  };
  return (
    <div className="container">
      <Seo title={"Home"} />
      {data?.map((item) => {
        return (
          <div
            onClick={() => onClick(item.id, item.title)}
            key={item.id}
            className="content"
          >
            <img src={item.image} alt={item.description} />
            <Link href={`/item/${item.title}/${item.id}`}>
              <a>
                <h4>{item.title}</h4>
              </a>
            </Link>
          </div>
        );
      })}
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
