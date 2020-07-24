import Head from "next/head";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import Navbar from "@/components/Navbar";
import api from "@/api/apiClient";
import useSWR from "swr";
import Link from "next/link";
export default function Home() {
  const { data, error } = useSWR("/restaurants", api.get);
  console.log(data);
  return (
    <>
      <Navbar />
      <Container className="md-container">
        <Head>
          <title>Restaurants</title>
          <link rel="icon" href="/favicon-32x32.png" />
        </Head>
        <Container>
          <h1>Restaurants</h1>
          {data && data.data && (
            <Row>
              {data &&
                data.data.map((restaurant) => (
                  <Col
                    key={restaurant.id}
                    xs={6}
                    md={4}
                    style={{ marginBottom: "32px" }}
                  >
                    <Card style={{ width: "18rem" }}>
                      <Card.Img variant="top" src={`${restaurant.image}`} />
                      <Card.Body>
                        <Card.Title>{restaurant.name}</Card.Title>
                        <Card.Text>{restaurant.description}</Card.Text>
                        <Link
                          href={`restaurants/${restaurant.id}`}
                          as={`restaurants/${restaurant.slug}/${restaurant.id}`}
                        >
                          <Button variant="primary">Show Restaurant</Button>
                        </Link>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
            </Row>
          )}
        </Container>
      </Container>
    </>
  );
}
