import Head from "next/head";
import { Container, Row, Card, Button } from "react-bootstrap";
import Navbar from "@/components/Navbar";

export default function Home() {
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
