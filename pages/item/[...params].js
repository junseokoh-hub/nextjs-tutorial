import Seo from "../../components/Seo";

export default function Detail({ params }) {
  const [title, id] = params || [];
  return (
    <div>
      <Seo title={title} />
      <h4>{title}</h4>
      <h5>{id}</h5>
    </div>
  );
}

export function getServerSideProps(ctx) {
  const {
    params: { params },
  } = ctx;
  console.log(params);
  return {
    props: {
      params,
    },
  };
}
