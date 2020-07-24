import Head from "next/head";
import { Container, Row, Card, Button } from "react-bootstrap";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/router";
import api from "@/api/apiClient";
import useSWR from "swr";

export async function getServerSideProps(ctx) {
  console.log(ctx);
  const { slug } = ctx.query;
  if (slug) {
    console.log(slug[1]);
    const data = await api.get("/restaurants/" + slug[1]);
    return { props: { data } };
  }
}

export default function Home(props) {
  const router = useRouter();
  const { slug } = router.query;
  if (slug) {
    console.log(slug[1]);
    const initialData = props.data;
    console.log({ initialData });
    const { data } = useSWR("/restaurants/" + slug[1], api.get, {
      initialData,
    });
  } else {
    return null;
  }
  return (
    <>
      <Navbar />
      <Container className="md-container">
        <Head>
          <title>Restaurants</title>
          <link rel="icon" href="/favicon-32x32.png" />
        </Head>
        <Container>
          <h1>Restaurants number</h1>
        </Container>
      </Container>
    </>
  );
}
