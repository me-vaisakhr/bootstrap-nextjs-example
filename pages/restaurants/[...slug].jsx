import Head from "next/head";
import { Container, Row, Card, Button, Media, Col, ListGroup, ListGroupItem } from "react-bootstrap";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/router";
import api from "@/api/apiClient";
import useSWR from "swr";
import {useState} from 'react';

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
  const [showMenuItemIndex,setMenuItemIndex]=useState(0);
  const router = useRouter();
  const { slug } = router.query;
  if (slug) {
    console.log(slug[1]);
    const initialData = props.data;
    console.log({ initialData });
    let { data } = useSWR("/restaurants/" + slug[1], api.get, {
      initialData,
    });
  } else {
    return null;
  }
  const {data} = props.data
  console.log(data)

  const getIncredients = (data) =>{
    let result=[];
    for(var key in data){
      result.push({key:key,value:data[key]});
    }
    return result;
  }

  return (
    <>
      <Navbar />
      <Container className="md-container ">
        <Head>
          <title>Restaurants</title>
          <link rel="icon" href="/favicon-32x32.png" />
        </Head>
        { data && 
          <Container>
              <Row>
                <Col>
                  <img  className="w-100" src={data.image} height={250}/>
                </Col>
              </Row>
              <Row>
                <Col xs lg="6" className="pt-2">
                  <h2>{data.name}</h2>
                </Col>
              </Row>
              <Row>
                <Col xs lg="12">
                  <h5>{data.address}</h5>
                </Col>
              </Row>
              <Row>
                <Col xs lg="12" className="">
                  <p className="text-justify">{data.description}</p>
                </Col>
              </Row>
              <hr/>
              <Row className="d-flex justify-content-center pt-10">
                <Col md="auto"><h3>Menu Items</h3></Col>
              </Row>
              {data['menu_categories'] && data['menu_categories'].length>0 ?
              <div>
                <Row className="justify-content-center pt-10">
                  <Col md="auto">
                    <ListGroup horizontal className="mb-10">
                      {data['menu_categories'].map((item,index)=>(
                          <ListGroup.Item key={index} action onClick={()=>{setMenuItemIndex(index)}} key={item.id}>{item.name}</ListGroup.Item>
                      ))
                      }
                    </ListGroup>
                  </Col>
                </Row>
                <Row className="justify-content-center pt-10">
                  {data['menu_categories'][showMenuItemIndex]['items'] && 
                    data['menu_categories'][showMenuItemIndex]['items'].map((item,index)=>(
                      <Col
                        key={item.id}
                        xs={6}
                        md={4}
                      >
                      <Card style={{ width: '18rem',marginTop:10,marginBottom:10 }}>
                        <Card.Img variant="top" src={item.image} />
                        <Card.Body>
                          <Card.Title>{item.name}</Card.Title>
                          <Card.Text> {item.description}</Card.Text>
                        </Card.Body>
                        <ListGroup className="list-group-flush">
                          {
                            item.ingredients && getIncredients(item.ingredients).map((incredient,index)=>(
                              <ListGroupItem key={index}>{`${incredient.key} - ${incredient.value}`}</ListGroupItem>
                            ))
                          }
                        </ListGroup>
                        <Card.Body>
                          <Card.Link href="#">Add to cart</Card.Link>
                        </Card.Body>
                      </Card>
                      </Col>
                    ))

                  }
                </Row>
              </div>
              :
              <Row className="d-flex justify-content-center pt-10">
                  <Col md="auto"><p>Menu Items Available</p></Col>
                </Row>
              }
          </Container>
        }
      </Container>
    </>
  );
}
